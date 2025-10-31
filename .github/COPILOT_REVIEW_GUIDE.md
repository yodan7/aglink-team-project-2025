# GitHub Copilot レビュー設定ガイド

このドキュメントでは、GitHub Copilot を使用したプルリクエストの自動コードレビューの設定方法と使用方法について説明します。

## 📋 目次
1. [前提条件](#前提条件)
2. [リポジトリでの有効化](#リポジトリでの有効化)
3. [使用方法](#使用方法)
4. [設定ファイル](#設定ファイル)

## 前提条件

GitHub Copilot のコードレビュー機能を使用するには、以下が必要です:

- GitHub Enterprise Cloud または GitHub Enterprise Server
- GitHub Copilot Business または GitHub Copilot Enterprise のライセンス
- リポジトリの管理者権限

## リポジトリでの有効化

### 1. リポジトリ設定での有効化

1. リポジトリページに移動
2. 「Settings」タブをクリック
3. 左側のサイドバーで「Code security and analysis」をクリック
4. 「GitHub Copilot」セクションを見つける
5. 「Enable」ボタンをクリックして Copilot レビューを有効化

### 2. 組織レベルでの設定（オプション）

組織の管理者の場合:

1. 組織の設定ページに移動
2. 「Copilot」タブをクリック
3. 「Policies」で必要な設定を行う

## 使用方法

### プルリクエストでレビューをリクエストする

1. **プルリクエストを作成または開く**
   - 通常通りプルリクエストを作成

2. **Copilot をレビュアーとして追加**
   - PRページの右側の「Reviewers」セクションを開く
   - 検索ボックスに「copilot」と入力
   - 「copilot」を選択

3. **レビューの待機**
   - Copilot が自動的にコードを分析
   - 数分以内にレビューコメントが投稿される

4. **レビュー結果の確認**
   - Copilot からのコメントを確認
   - 提案された変更を検討
   - 必要に応じてコードを修正

### 自動レビューの設定

このリポジトリには以下のファイルが含まれており、Copilot レビューを促進します:

- **`.github/CODEOWNERS`**: 自動レビュアー割り当て
- **`.github/workflows/copilot-review.yaml`**: レビューリマインダー
- **`.github/copilot-instructions.md`**: Copilot への指示（日本語でレビュー）

## 設定ファイル

### CODEOWNERS

`.github/CODEOWNERS` ファイルは、コードの所有者を定義し、自動的にレビュアーを割り当てます。

### Copilot 指示ファイル

`.github/copilot-instructions.md` には、Copilot がレビューを行う際の指示が含まれています:

- すべてのレビューコメントは日本語で記載
- プレフィックスの使用: `[must]`, `[imo]`, `[nits]`, `[ask]`, `[fyi]`
- プロジェクト固有のコーディング規約の遵守

### ワークフロー

`.github/workflows/copilot-review.yaml` は、PRが作成されたときにCopilotレビューのリマインダーを自動投稿します。

## トラブルシューティング

### Copilot がレビュアーリストに表示されない

- リポジトリで Copilot が有効になっているか確認
- 組織の Copilot ライセンスが有効か確認
- リポジトリの権限設定を確認

### レビューが投稿されない

- PRのサイズが大きすぎる可能性（Copilotには制限あり）
- ネットワークの問題
- GitHub のステータスページで障害がないか確認

## 参考リンク

- [GitHub Copilot Pull Request Reviews 公式ドキュメント](https://docs.github.com/en/copilot/using-github-copilot/code-review/using-copilot-code-review)
- [GitHub Copilot Business](https://docs.github.com/en/copilot/about-github-copilot/subscription-plans-for-github-copilot)
- [CODEOWNERS ファイル](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)

## サポート

問題が発生した場合は、リポジトリのIssueを作成するか、GitHub サポートにお問い合わせください。
