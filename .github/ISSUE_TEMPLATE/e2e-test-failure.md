---
name: E2E Test Failure
about: Report a failed E2E test from CI/CD pipeline
title: '[E2E] '
labels: e2e-test, bug
assignees: ''
---

## 🐛 E2E Test Failure

**Test:** <!-- Test name -->
**Suite:** <!-- Test suite name -->
**Status:** <!-- ❌ Failed / ⏱️ Timeout -->
**File:** `<!-- e2e/test-file.spec.ts:line -->`
**Duration:** <!-- e.g., 45s -->

### Error

```
<!-- Paste error message here -->
```

### Context

- **Retry Attempt:** <!-- 0, 1, 2 -->
- **Failed At:** <!-- Timestamp -->
- **Browser:** <!-- Chromium / Firefox / WebKit -->
- **CI Run:** <!-- Link to GitHub Actions run -->

### 🔍 Investigation Steps

- [ ] Reproduce the failure locally with `npm run test:e2e:headed`
- [ ] Check if it's a flaky test (run multiple times)
- [ ] Review recent code changes that might affect this test
- [ ] Check test logs and screenshots in CI artifacts
- [ ] Identify root cause

### 🛠️ Potential Fixes

- [ ] Increase timeout (current: 60s)
- [ ] Add explicit waits (networkidle, element visibility)
- [ ] Fix selector issues (element not found)
- [ ] Stabilize test data (prevent race conditions)
- [ ] Add retry logic for flaky assertions
- [ ] Other (describe below)

### 📸 Screenshots / Videos

<!-- Attach screenshots or trace files from test-results/ -->

### 📝 Investigation Notes

<!-- Add your investigation notes here -->

### ✅ Acceptance Criteria

- [ ] Test passes consistently (3+ runs without failure)
- [ ] No increase in test execution time
- [ ] Changes documented in TROUBLESHOOTING.md if needed
