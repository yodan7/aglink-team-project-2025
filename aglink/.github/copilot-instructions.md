# ⚠️ 必ず日本語でレビューしてください ⚠️
**All code reviews must be written in Japanese.**

このプロジェクトのコードレビュー・コメントは、例外なく**日本語で記載**してください。  
Copilot へのプロンプトや Pull Request のレビューも「日本語」でお願いします。

---

## コメント例
[must] 変数名はより具体的にしましょう  
[imo] この部分はもう少し簡潔に書けると思います  
[nits] インデントがずれています

---

<!-- 英語併記でさらに強調 -->
**If you are an English speaker, please use Japanese in all code review comments for this repository.**

# レビューに関して

レビューする際には、以下の prefix(接頭辞)を付けましょう。

[must] → かならず変更してね  
[imo] → 自分の意見だとこうだけど修正必須ではないよ(in my opinion)  
[nits] → ささいな指摘(nitpick)
[ask] → 質問  
[fyi] → 参考情報

# このアプリの概要

このプロジェクトは農業に興味を持つ若者と農地をつなぐ Web アプリケーション「Aglink」です。
詳細な仕様、アーキテクチャ、フォルダ構成については、リポジトリルートの `README.md` ファイルを参照してください。

レビューや回答の際は、README.md に記載された技術スタック（Next.js、TypeScript、Supabase、Tailwind CSS）を考慮してください。

## アーキテクチャ指針

- Next.js App Router の規約に従い、ページは `src/app/` 以下に配置
- Route Groups `(auth)` と `(main)` を活用した適切なレイアウト分離
- Server Components を優先し、Client Components は `"use client"` で明示
- データベース操作は Supabase 経由で行い、`src/lib/supabase/` のクライアントを使用
- Server Actions は `src/lib/actions.ts` に集約

## コーディング規約

### TypeScript

- 型定義は `src/types/index.ts` に集約し、`any` 型は避ける
- インターフェースは `Farm`, `User`, `Diagnosis` などドメインモデルを明確に定義

### コンポーネント設計

- `src/components/ui/` : 汎用的なデザインシステム (shadcn/ui 準拠)
- `src/components/domain/` : 機能別コンポーネント (auth, diagnosis, farms)
- 1 つのコンポーネントファイルには 1 つのエクスポートのみ

### スタイリング

- Tailwind CSS のユーティリティクラスを優先
- カスタム CSS は最小限に抑制
- レスポンシブデザインは mobile-first で実装

### データ管理

- モックデータは `src/data/` に JSON 形式で配置
- カスタムフックは `src/hooks/` で状態管理ロジックを分離

## Aglink プロジェクト固有の指針

### 主要機能

- **認証**: Supabase Auth を使用したログイン/サインアップ
- **診断機能**: 農業スタイルの適性診断とその結果表示
- **農地情報**: 農地の一覧、詳細、ブックマーク機能
- **マイページ**: ユーザー情報とブックマーク管理

### データベース設計考慮事項

- Supabase の Row Level Security (RLS) を適切に設定
- ユーザーのプライバシーを考慮したアクセス制御
- 診断結果の永続化とユーザー紐付け

### 開発環境

- Docker を使用した統一開発環境
- VS Code + Docker 拡張機能での開発推奨
- `npm run dev` でローカル開発サーバー起動

## レビュー時の重点チェック項目

### 機能別チェックポイント

- **認証機能**: セキュアなパスワード処理、適切な認証状態管理
- **診断機能**: UX を考慮した段階的な質問フロー、結果の分かりやすい表示
- **農地機能**: 検索・フィルタリング機能、地図連携の考慮
- **ブックマーク**: リアルタイムな状態更新、楽観的 UI 更新

### パフォーマンス

- 画像最適化 (Next.js Image コンポーネント使用)
- 不要な Client Component 化の回避
- 適切なキャッシング戦略

### アクセシビリティ

- 農業に詳しくない若者でも使いやすい UI
- スクリーンリーダー対応
- キーボード操作への配慮

## モック・テストデータの方針

- `src/data/mock-farms.json` に現実的な農地データを配置
- 診断結果は複数パターンを想定したモックデータを用意
- ユーザー情報は個人情報に配慮したダミーデータを使用
- 開発段階では地域性を考慮した日本の農地データを使用
