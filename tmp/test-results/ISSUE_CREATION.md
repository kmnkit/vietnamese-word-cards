# E2E テスト失敗時の Issue 作成ガイド

E2Eテストが失敗した場合、GitHub Issueを自動生成して個別に対応できるシステムです。

## 🚀 使い方

### 1. テスト結果からIssueを自動生成

```bash
# まずテストを実行（失敗したテスト結果が必要）
npm run test:e2e

# Dry run（実際にはissueを作成せず、プレビューのみ）
npm run test:e2e:issues:dry

# 実際にIssueを作成
npm run test:e2e:issues
```

### 2. 必要な環境設定

#### GitHub CLI のインストール

```bash
# macOS
brew install gh

# Windows
winget install --id GitHub.cli

# Linux
# https://github.com/cli/cli/blob/trunk/docs/install_linux.md
```

#### 認証

```bash
gh auth login
```

対話式で以下を選択:
- GitHub.com
- HTTPS
- Login with a web browser

### 3. 作成されるIssue

各失敗したテストに対して、以下の情報を含むIssueが作成されます:

- ✅ テスト名とファイル位置
- ✅ エラーメッセージ
- ✅ 実行時間と再試行回数
- ✅ 調査手順のチェックリスト
- ✅ 修正候補のチェックリスト
- ✅ ラベル: `e2e-test`, `bug`

## 📋 ワークフロー例

### CI でテストが失敗した場合

1. **GitHub Actions の Artifacts をダウンロード**
   ```bash
   # Actions > E2E Tests > test-summary をダウンロード
   # tmp/test-results/ に配置
   ```

2. **Issue を自動生成（Dry run で確認）**
   ```bash
   npm run test:e2e:issues:dry
   ```

   出力例:
   ```
   🔍 Analyzing E2E test results...

   Found 3 failed test(s)

   📄 Would create issue:
   Title: [E2E] should navigate to listening quiz
   Labels: e2e-test,bug
   ...
   ```

3. **実際に Issue を作成**
   ```bash
   npm run test:e2e:issues
   ```

4. **作成された Issue を確認**
   ```
   ✅ Created: https://github.com/user/repo/issues/123
   ✅ Created: https://github.com/user/repo/issues/124
   ✅ Created: https://github.com/user/repo/issues/125

   📊 Summary: Created 3 issue(s)
   ```

### ローカルでテストが失敗した場合

1. **テストを実行**
   ```bash
   npm run test:e2e
   ```

2. **Issue を作成**
   ```bash
   npm run test:e2e:issues
   ```

## 🔧 カスタマイズ

### ラベルをカスタマイズ

```bash
node scripts/create-test-issues.js --label="e2e-test,critical,needs-investigation"
```

### スクリプトの編集

`scripts/create-test-issues.js` を編集して:
- Issue のタイトル・本文フォーマット変更
- 追加の情報を含める
- マイルストーンの設定
- アサインの自動化

## 📝 手動で Issue を作成

自動生成ではなく、手動でIssueを作成する場合:

1. GitHub で New Issue
2. テンプレート「E2E Test Failure」を選択
3. フォームに記入して作成

## 🎯 Issue 対応のベストプラクティス

### 1. 優先順位付け

- **Critical**: 全てのテストをブロックする失敗
- **High**: 主要機能のテスト失敗
- **Medium**: 補助機能のテスト失敗
- **Low**: Flaky なテスト

### 2. 調査の流れ

```bash
# 1. ローカルで再現
npm run test:e2e:headed -- quiz-flow.spec.ts

# 2. デバッグモードで実行
npm run test:e2e:debug -- quiz-flow.spec.ts

# 3. UI モードで詳細確認
npm run test:e2e:ui
```

### 3. 修正後の確認

```bash
# 複数回実行して安定性を確認
for i in {1..5}; do npm run test:e2e -- quiz-flow.spec.ts; done
```

## 🚨 トラブルシューティング

### `gh` コマンドが見つからない

```bash
# インストール確認
gh --version

# 認証確認
gh auth status
```

### Issue作成権限がない

```bash
# リポジトリへのアクセス権限を確認
gh auth refresh -s write:org
```

### results.json が見つからない

```bash
# テストを実行してresults.jsonを生成
npm run test:e2e

# ファイル確認
ls -la tmp/test-results/results.json
```

## 📚 関連ドキュメント

- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - テスト修正ガイド
- [README.md](./README.md) - テスト結果トラッキング
- [GitHub CLI Documentation](https://cli.github.com/manual/)
