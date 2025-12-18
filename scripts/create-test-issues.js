#!/usr/bin/env node

/**
 * Create GitHub Issues from failed E2E tests
 *
 * Usage:
 *   node scripts/create-test-issues.js [--dry-run] [--label "e2e-test"]
 *
 * Requires:
 *   - GitHub CLI (gh) installed and authenticated
 *   - tmp/test-results/results.json file exists
 */

const fs = require('fs');
const { execSync } = require('child_process');

const RESULTS_FILE = 'tmp/test-results/results.json';
const DRY_RUN = process.argv.includes('--dry-run');
const LABEL = process.argv.find(arg => arg.startsWith('--label='))?.split('=')[1] || 'e2e-test,bug';

/**
 * Extract failed tests from Playwright results
 */
function getFailedTests() {
  if (!fs.existsSync(RESULTS_FILE)) {
    console.error(`❌ Results file not found: ${RESULTS_FILE}`);
    console.error('Please run E2E tests first: npm run test:e2e');
    process.exit(1);
  }

  const results = JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8'));
  const failedTests = [];

  function processSuite(suite, suitePath = []) {
    const currentPath = [...suitePath, suite.title].filter(Boolean);

    if (suite.specs) {
      suite.specs.forEach(spec => {
        spec.tests.forEach(test => {
          // Check if test failed (not passed, not skipped)
          const failed = test.results.some(result =>
            result.status === 'failed' || result.status === 'timedOut'
          );

          if (failed) {
            const failedResult = test.results.find(r =>
              r.status === 'failed' || r.status === 'timedOut'
            );

            failedTests.push({
              suite: currentPath.join(' > '),
              title: spec.title,
              file: spec.file.replace(process.cwd() + '/', ''),
              line: spec.line,
              status: failedResult.status,
              error: failedResult.error?.message || 'No error message',
              duration: failedResult.duration,
              retry: failedResult.retry || 0,
            });
          }
        });
      });
    }

    if (suite.suites) {
      suite.suites.forEach(s => processSuite(s, currentPath));
    }
  }

  results.suites.forEach(suite => processSuite(suite));
  return failedTests;
}

/**
 * Generate issue title and body for a failed test
 */
function generateIssue(test) {
  const title = `[E2E] ${test.title}`;

  const body = `## 🐛 E2E Test Failure

**Test:** ${test.title}
**Suite:** ${test.suite}
**Status:** ${test.status === 'timedOut' ? '⏱️ Timeout' : '❌ Failed'}
**File:** \`${test.file}:${test.line}\`
**Duration:** ${Math.round(test.duration / 1000)}s

### Error

\`\`\`
${test.error}
\`\`\`

### Context

- **Retry Attempt:** ${test.retry}
- **Failed At:** ${new Date().toISOString()}

### 🔍 Investigation Steps

- [ ] Reproduce the failure locally
- [ ] Check if it's a flaky test
- [ ] Review recent code changes
- [ ] Check test logs and screenshots
- [ ] Identify root cause

### 🛠️ Potential Fixes

- [ ] Increase timeout
- [ ] Add explicit waits (networkidle, element visibility)
- [ ] Fix selector issues
- [ ] Stabilize test data
- [ ] Other (describe below)

### 📝 Notes

_Add investigation notes here_

---

**Auto-generated from test failure**
`;

  return { title, body };
}

/**
 * Create GitHub issue using gh CLI
 */
function createGitHubIssue(title, body, labels) {
  if (DRY_RUN) {
    console.log('\n📄 Would create issue:');
    console.log('Title:', title);
    console.log('Labels:', labels);
    console.log('Body preview:', body.substring(0, 200) + '...\n');
    return null;
  }

  try {
    const labelArgs = labels.split(',').map(l => `--label "${l.trim()}"`).join(' ');
    const command = `gh issue create --title "${title}" --body "${body.replace(/"/g, '\\"')}" ${labelArgs}`;

    const result = execSync(command, { encoding: 'utf8' });
    const issueUrl = result.trim();
    return issueUrl;
  } catch (error) {
    console.error('❌ Failed to create issue:', error.message);
    return null;
  }
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 Analyzing E2E test results...\n');

  const failedTests = getFailedTests();

  if (failedTests.length === 0) {
    console.log('✅ No failed tests found!');
    return;
  }

  console.log(`Found ${failedTests.length} failed test(s)\n`);

  if (DRY_RUN) {
    console.log('🏃 DRY RUN MODE - No issues will be created\n');
  }

  const createdIssues = [];

  failedTests.forEach((test, index) => {
    console.log(`[${index + 1}/${failedTests.length}] Processing: ${test.title}`);

    const { title, body } = generateIssue(test);
    const issueUrl = createGitHubIssue(title, body, LABEL);

    if (issueUrl) {
      console.log(`  ✅ Created: ${issueUrl}`);
      createdIssues.push(issueUrl);
    }
  });

  console.log('\n' + '='.repeat(60));
  if (DRY_RUN) {
    console.log(`\n📊 Summary: Would create ${failedTests.length} issue(s)`);
    console.log('\nTo actually create issues, run:');
    console.log('  node scripts/create-test-issues.js\n');
  } else {
    console.log(`\n📊 Summary: Created ${createdIssues.length} issue(s)`);
    if (createdIssues.length > 0) {
      console.log('\nCreated issues:');
      createdIssues.forEach(url => console.log(`  - ${url}`));
    }
  }
}

// Check if gh CLI is available
try {
  execSync('gh --version', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ GitHub CLI (gh) is not installed or not authenticated');
  console.error('Please install: https://cli.github.com/');
  console.error('Then authenticate: gh auth login');
  process.exit(1);
}

main();
