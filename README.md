# aglink-team-project-2025

3 年次に 1 年間を通して取り組むチーム実習のプロジェクトです。

# Aglink プロジェクトへようこそ！

このプロジェクトは、農業に興味を持つ若者と農地をつなぐ Web アプリケーション「Aglink」の開発リポジトリです。

## 🚀 開発を始めるには

docker-compose up -d --build

1. このリポジトリをクローンします。

2. `.env.example`をコピーして`.env.local`ファイルを作成し、必要な環境変数を設定します。

3. [VS Code 拡張機能「Docker」](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) をインストールします。

4. VS Code のエクスプローラーで `docker-compose.yaml` ファイルを右クリックし、「Compose Up」を選択してビルド＆起動します。

### <span style="color: red;">以下の 5, 6 の手順は Dockerfile の command に含まれているので不要になりました。</span>

5. ~~ターミナルを 2 つ開きます。~~

~~- 1 つ目のターミナルで以下を実行し、コンテナに入ります。~~

```bash
docker-compose exec app sh
```

- ~~このターミナルは `npm run dev` などアプリ実行用に使います。~~
- ~~もう 1 つのターミナルは、開発作業や git 操作用に使います。~~

6. ~~コンテナ内のターミナルで以下を実行し、Next.js アプリを起動します。~~

```bash
npm run dev
```

7. ブラウザで `http://localhost:3000` にアクセスします。

### 拡張機能「Docker」の使い方

VScode 上で Docker 拡張機能をインストールしておくと、docker-compose の起動や停止、コンテナへのアクセスが GUI で簡単に行えます。

1. VScode の左側のサイドバーにある Docker アイコンをクリックすると、Docker 拡張機能のパネルが表示されます。
2. CONTAINERS の中にある対象のコンテナを右クリックすると、起動・停止・再起動・ログの確認・コンテナ内ターミナルの起動などが行えます。

- Start：コンテナを起動します。
- Stop：コンテナを停止します。
- Restart：コンテナを再起動します。
- View Logs：コンテナのログを表示します。(console.log() の出力結果を確認できる)

> ### なお、VScode上でエラーが多発する場合は初回のみ`aglink` の直下で `npm install` を実行すると解消します。

## 🏛️ アーキテクチャ概要

このプロジェクトは**Next.js (App Router)をベースに構築されています。開発環境は Docker**によってコンテナ化されており、チーム全員が全く同じ環境で開発を進めることができます。

フォルダ構成は、ファイルの**役割**（`components`, `hooks`, `lib`など）に基づいてファイルを分類する、モダンなフロントエンド開発で広く採用されている構成です。これにより、コードの予測可能性と保守性を高めています。

## 📂 フォルダ構成

本リポジトリ（aglink-team-project-2025）の直下には、`aglink` ディレクトリ、`docker-compose.yaml`、`README.md` などの主要ファイルが配置されています。
プロジェクトの主要なフォルダ・ファイル構成は以下の通りです。

```
aglink-team-project-2025/    # Gitリポジトリのルート
├── .git/
├── aglink/                  # Next.jsアプリケーション本体
│   ├── public/              # 画像、フォントなどの静的ファイル
│   │   └── images/
│   ├── src/
│   │   ├── app/               # ① ページの本体 (Routes)
│   │   │   ├── globals.css      # 全体的なスタイル
│   │   │   ├── (auth)/        # 認証関連ページ
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── signup/
│   │   │   │       └── page.tsx
│   │   │   ├── (main)/        # メイン機能ページ
│   │   │   │   ├── bookmarks/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── diagnosis/
│   │   │   │   │   ├── result/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── farms/
│   │   │   │   │   ├── [id]/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── mypage/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── layout.tsx   # メイン機能共通のレイアウト
│   │   │   │   └── page.tsx     # トップページ (/)
│   │   │   └── layout.tsx       # 全体共通のルートレイアウト
│   │   │
│   │   ├── components/          # ② 再利用可能なコンポーネント
│   │   │   ├── ui/              # デザインシステムの最小単位 (shadcn/uiなど)
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Spinner.tsx
│   │   │   └── domain/          # ドメインごとのコンポーネント
│   │   │       ├── auth/
│   │   │       │   └── AuthForm.tsx
│   │   │       ├── diagnosis/
│   │   │       │   ├── DiagnosisForm.tsx
│   │   │       │   └── DiagnosisResult.tsx
│   │   │       └── farms/
│   │   │           ├── FarmDetail.tsx
│   │   │           ├── FarmList.tsx
│   │   │           └── BookmarkButton.tsx
│   │   │
│   │   ├── hooks/               # ③ 再利用可能なカスタムフック
│   │   │   ├── useAuth.ts      # (Supabase Auth Helpers for Next.js などで代替するかも)
│   │   │   ├── useBookmarks.ts # (Server Actions + SWR/React Query で代替するかも)
│   │   │   └── useDiagnosis.ts # (useState or Jotai/Zustand で代替するかも)(診断結果のみServer Actionsで保存する)
│   │   │
│   │   ├── lib/                 # ④ 外部サービス連携や共通ロジック
│   │   │   ├── supabase/
│   │   │   │   ├── client.ts
│   │   │   │   └── server.ts
│   │   │   ├── actions.ts       # Server Actions
│   │   │   └── utils.ts
│   │   │
│   │   ├── data/                # ⑤ モックデータ
│   │   │   └── mock-farms.json
│   │   │
│   │   └── types/               # ⑥ TypeScriptの型定義
│   │       └── index.ts         # (Farm, User, Diagnosisなど)
│   │
│   ├── .env.local             # SupabaseのAPIキーなどを保管
│   ├── .gitignore
│   ├── Dockerfile             # aglinkアプリをビルドするための設計図
│   ├── next.config.mjs
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── docker-compose.yaml      # Dockerサービス定義
└── README.md
```

## 🛠️ 各ファイル・フォルダの解説

### `src/`

アプリケーションのソースコード全体を格納する中心的なディレクトリです。開発作業は主にこの中で行います。

---

### `src/app/`

Next.js の **App Router** に基づいて、アプリケーションの URL（ルーティング）と各ページの内容を定義します。

- **`(auth)` / `(main)`**: ルートグループです。URL のパスに影響を与えずに、特定のセクション（例：認証ページ、メイン機能ページ）のレイアウトを共通化するために使用します。
- **`layout.tsx`**: 全ページで共通の骨格となるルートレイアウトです。HTML の`<html>`や`<body>`タグを定義します。
- **`page.tsx`**: アプリケーションのトップページ（`/`）です。
- **`**/page.tsx`\*\*: 各 URL に対応するページの UI を定義するファイルです。
- **`[id]/`**: 動的ルートです。例えば、`farms/[id]/page.tsx` は `/farms/1`, `/farms/2` のような個別の農地詳細ページに対応します。

---

### `src/components/`

複数のページで再利用する React コンポーネントを格納します。

- **`ui/`**: **デザインシステムの最小単位**となる汎用的なコンポーネントを配置します。特定の機能やドメイン知識に依存しません。
  - (例) `Button.tsx`, `Card.tsx`, `Header.tsx`
- **`domain/`**: **特定の機能（ドメイン）** に関連するコンポーネントを配置します。
  - **`auth/`**: ユーザー認証（ログイン、新規登録）に関連するコンポーネント。
  - **`diagnosis/`**: 農業スタイル診断に関連するコンポーネント。
  - **`farms/`**: 農地情報（一覧、詳細、ブックマーク）に関連するコンポーネント。

---

### `src/hooks/`

UI からロジックを分離し、再利用可能にするためのカスタムフックを格納します。

- **`useAuth.ts`**: ユーザー認証状態の管理や、ログイン・ログアウト処理などを行います。
- **`useBookmarks.ts`**: ブックマークの追加・削除・一覧取得などのロジックをカプセル化します。
- **`useDiagnosis.ts`**: 診断の質問への回答や、診断結果の計算・保持などのロジックを管理します。

---

### `src/lib/`

外部サービスとの連携や、プロジェクト全体で使われる共通ロジック・便利関数を格納します。

- **`supabase/`**: データベース・認証サービスである Supabase と連携するためのクライアントを定義します。
- **`actions.ts`**: 主にフォームの送信など、クライアントからの操作をトリガーにサーバー側で実行される処理（**Server Actions**）を定義します。
- **`utils.ts`**: 日付のフォーマットや、テキストの加工など、特定の機能に依存しない便利関数を配置します。

---

### `src/data/`

開発初期段階で、バックエンド API の代わりとなる**モックデータ（ダミーデータ）** を格納します。

- **`mock-farms.json`**: 農地一覧のダミーデータなど、JSON 形式で定義します。

---

### `src/types/`

TypeScript の**型定義**を格納します。

- **`index.ts`**: `Farm`（農地）、`User`（ユーザー）、`Diagnosis`（診断結果）など、アプリケーション全体で使われるデータ構造の型を定義します。

---

### `public/`

画像、フォント、`favicon.ico`など、ビルド時に加工されずにそのままのパスで公開される静的ファイルを格納します。

---

### 主要な設定ファイル

- **`package.json`**: プロジェクト名、バージョン、依存ライブラリ（`dependencies`）、スクリプト（`scripts`）などを定義する、Node.js プロジェクトの最も重要な管理ファイルです。
- **`next.config.mjs`**: Next.js の動作をカスタマイズするための設定ファイルです。
- **`tailwind.config.ts`**: CSS フレームワークである Tailwind CSS のテーマ（色、フォントサイズなど）や設定をカスタマイズします。
- **`tsconfig.json`**: TypeScript コンパイラの設定ファイルです。コードのチェックルールや、どのファイルをコンパイル対象とするかを定義します。
- **`.env.local`**: Supabase の API キーなど、**公開してはいけない**環境変数を定義します。`.gitignore`に含まれており、Git リポジトリには共有されません。
- **`Dockerfile` / `docker-compose.yaml`**: 開発環境をコンテナ化するための Docker 関連ファイルです。

---

### その他のファイル

プロジェクトの動作を支える、その他の設定ファイルです。通常、頻繁に編集する必要はありません。

- **`.gitignore`**: Git のバージョン管理から除外するファイルやフォルダ（`node_modules`、`.env.local`など）を指定します。
- **`next-env.d.ts`**: Next.js が自動生成する TypeScript の型定義ファイルです。直接編集はしません。
- **`postcss.config.mjs`**: Tailwind CSS などの PostCSS プラグインを動作させるための設定ファイルです。
- **`eslint.config.mjs`**: コードの品質とスタイルをチェックする ESLint の設定ファイルです。
- **`.github/`**: GitHub Actions による CI/CD（継続的インテグレーション/継続的デリバリー）のワークフロー定義を格納します。
