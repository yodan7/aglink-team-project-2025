# Aglink MVP 開発 タスクリスト（TODO）

**3 名分担・最適化版**

このドキュメントは、Aglink の MVP 完成に向けた最新タスクリストです。  
フロントエンド 3 名・バックエンド 2 名のチーム構成に最適化しています。  
各フェーズでフロントエンド担当者には均等にタスクが割り振られています。

---

## ブランチ戦略

- `main` ブランチから、各自のタスク名のブランチを作成して作業を進めましょう。

---

## 🚀 フェーズ 1：基盤構築と部品準備（約 1 週間）

**目標:**  
各自が独立して作業できるよう、アプリの骨格・部品・バックエンドの準備を整える。

- [ ] **1-1: データベース設計・セットアップ**

  - **担当:** バックエンドリード兼 PM（あなた）
  - **やること:** Supabase プロジェクト作成、テーブル設計・作成、Next.js 接続設定、`.env.example`共有
  - **触るファイル:**
    - `aglink/src/lib/supabase/client.ts`
    - `aglink/src/lib/supabase/server.ts`
    - `aglink/.env.example`

- [ ] **1-2: 診断エンジン設計**

  - **担当:** データスペシャリスト
  - **やること:** 農業タイプ定義、質問項目作成、ポイントシステム設計、型定義、モックデータ作成
  - **触るファイル:**
    - `aglink/src/types/index.ts`
    - `aglink/src/data/mock-farms.json`

- [ ] **1-3: shadcn/ui 導入・基本 UI 部品準備**

  - **担当:** フロントエンド担当 1
  - **やること:** shadcn/ui セットアップ、基本 UI コンポーネント（button, card, input, label）導入・カスタマイズ
  - **触るファイル:**
    - `aglink/src/components/ui/Button.tsx`
    - `Card.tsx`
    - `Input.tsx`
    - `Label.tsx` など

- [ ] **1-4: 共通レイアウトコンポーネント作成**

  - **担当:** フロントエンド担当 2
  - **やること:** Figma 参考、ヘッダー・フッター作成、共通レイアウト配置
  - **触るファイル:**
    - `aglink/src/components/ui/Header.tsx`
    - `Footer.tsx`
    - `aglink/src/app/(main)/layout.tsx`

- [ ] **1-5: 認証フォーム静的実装**
  - **担当:** フロントエンド担当 3
  - **やること:** shadcn/ui 部品でログイン/サインアップ用`AuthForm.tsx`作成
  - **触るファイル:**
    - `aglink/src/components/domain/auth/AuthForm.tsx`

> **ポイント:**  
> 空の`page.tsx`作成タスクの代わりに、このタスクをフェーズ 1 に前倒し。  
> 3 人のフロントエンド担当が初日から並行して作業可能。

---

## 🎨 フェーズ 2：静的な画面の組み立て（約 1 週間）

**目標:**  
フェーズ 1 の部品・モックデータを使い、見た目が完璧な「動かないアプリ」を完成させる。

- [ ] **2-1: 認証ページ組み立て**

  - **担当:** フロントエンド担当 1
  - **やること:** フェーズ 1 の`AuthForm.tsx`をログイン・サインアップページに配置、レイアウト調整
  - **触るファイル:**
    - `aglink/src/app/(auth)/login/page.tsx`
    - `aglink/src/app/(auth)/signup/page.tsx`

- [ ] **2-2: 診断ページ静的実装**

  - **担当:** フロントエンド担当 2
  - **やること:** データスペシャリスト作成の質問リストを元に診断ページ（`DiagnosisForm.tsx`）作成・配置
  - **触るファイル:**
    - `aglink/src/app/diagnosis/page.tsx`
    - `aglink/src/components/domain/diagnosis/DiagnosisForm.tsx`

- [ ] **2-3: 診断結果・農地一覧ページ静的実装**

  - **担当:** フロントエンド担当 3
  - **やること:** モックデータを読み込み、`FarmList.tsx`で Card を繰り返し表示、診断結果ページに配置
  - **触るファイル:**
    - `aglink/src/app/diagnosis/result/page.tsx`
    - `aglink/src/components/domain/farms/FarmList.tsx`

- [ ] **2-4: 診断ロジック実装**
  - **担当:** データスペシャリスト
  - **やること:** ポイントシステムに基づき、ユーザー回答から診断結果タイプ算出関数実装
  - **触るファイル:**
    - `aglink/src/lib/utils.ts`

---

## ⚡ フェーズ 3：動的な機能の実装（約 1〜2 週間）

**目標:**  
静的な画面に命を吹き込み、ユーザーが操作できる「動くアプリ」にする。

- [ ] **3-1: 認証機能フロントエンド実装**

  - **担当:** フロントエンド担当 1
  - **やること:** `AuthForm.tsx`で入力を`useState`管理、フォーム送信時に Server Actions 呼び出し
  - **触るファイル:**
    - `aglink/src/components/domain/auth/AuthForm.tsx`

- [ ] **3-2: 農業スタイル診断機能実装**

  - **担当:** フロントエンド担当 2
  - **やること:** `DiagnosisForm.tsx`で回答を`useState`管理、質問進行ロジック実装、診断ロジック呼び出し
  - **触るファイル:**
    - `aglink/src/components/domain/diagnosis/DiagnosisForm.tsx`

- [ ] **3-3: 診断結果データ連携（フロントエンド）**

  - **担当:** フロントエンド担当 3
  - **やること:** 診断結果ページで Supabase から本物の診断結果・農地を表示
  - **触るファイル:**
    - `aglink/src/app/diagnosis/result/page.tsx`

- [ ] **3-4: 認証機能バックエンド実装**

  - **担当:** バックエンドリード兼 PM（あなた）
  - **やること:** Supabase Auth でサインアップ・ログインの Server Actions 実装
  - **触るファイル:**
    - `aglink/src/lib/actions.ts`

- [ ] **3-5: 診断結果保存・表示（バックエンド）**
  - **担当:** バックエンドリード兼 PM & データスペシャリスト
  - **やること:** 診断完了時に Supabase へ結果保存、結果ページ用データ取得関数実装
  - **触るファイル:**
    - `aglink/src/lib/actions.ts`
    - `aglink/src/lib/supabase/data.ts`（新規作成または追記）

---

## ✅ MVP 完成の定義

- [ ] ユーザーが新規登録・ログインできる
- [ ] ユーザーが農業スタイル診断を受けられる
- [ ] 診断結果がユーザーアカウントに紐づいて保存される
- [ ] 診断結果ページで保存された診断結果と、それに基づいた（モックの）農地一覧が表示される
