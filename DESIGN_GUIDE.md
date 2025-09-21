# 🎨 Aglink デザイン開発ガイド

**初心者でも安心！** TailwindCSS と shadcn/ui を使ったデザイン開発の完全ガイドです。

---

## 📚 目次

1. [基本概念の理解](#1-基本概念の理解)
2. [実践：よく使うクラス集](#2-実践よく使うクラス集)
3. [shadcn/ui コンポーネントの使い方](#3-shadcnuiコンポーネントの使い方)
4. [Aglink プロジェクト専用カラーパレット](#4-aglinkプロジェクト専用カラーパレット)
5. [実践例：農地カードを作ってみよう](#5-実践例農地カードを作ってみよう)
6. [困ったときのチートシート](#6-困ったときのチートシート)

---

## 1. 基本概念の理解

### 🤔 **TailwindCSS とは？**

**「HTML に直接スタイルを書ける魔法の CSS」** だと思ってください！

```tsx
// 従来のCSS
<div className="my-button">ボタン</div>
/* CSS ファイルで */
.my-button {
  background-color: blue;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}

// TailwindCSS
<div className="bg-blue-500 text-white px-6 py-3 rounded-lg">ボタン</div>
```

### 💡 **shadcn/ui とは？**

**「すでに完成されたキレイなコンポーネント集」** です。

```tsx
// 自分でボタンを一から作る → 大変😰
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
  クリック
</button>

// shadcn/uiのButtonを使う → 簡単😊
<Button variant="default" size="lg">
  クリック
</Button>
```

---

## 2. 実践：よく使うクラス集

### 🎯 **最初に覚えるべき基本クラス**

#### **色（Color）**

```tsx
// 背景色
bg - white; // 白い背景
bg - green - 500; // 緑の背景
bg - blue - 500; // 青い背景
bg - red - 500; // 赤い背景

// 文字色
text - black; // 黒い文字
text - white; // 白い文字
text - green - 600; // 緑の文字
text - gray - 500; // グレーの文字
```

#### **サイズ（Size）**

```tsx
// 幅
w - full; // 親要素いっぱいの幅
w - 1 / 2; // 親要素の半分の幅
w - 64; // 固定の幅（256px）

// 高さ
h - screen; // 画面全体の高さ
h - 64; // 固定の高さ（256px）
h - auto; // 内容に合わせた高さ
```

#### **余白（Spacing）**

```tsx
// パディング（内側の余白）
p - 4; // 全方向に16px
px - 4; // 左右に16px
py - 2; // 上下に8px
pt - 6; // 上に24px

// マージン（外側の余白）
m - 4; // 全方向に16px
mx - auto; // 左右中央寄せ
mb - 8; // 下に32px
```

#### **レイアウト（Layout）**

```tsx
// Flexbox（要素を横並びにする）
flex; // フレックスボックス有効
flex - col; // 縦並び
justify - center; // 横方向中央
items - center; // 縦方向中央
space - x - 4; // 子要素間に横の余白

// グリッド（格子状レイアウト）
grid; // グリッド有効
grid - cols - 2; // 2列のグリッド
gap - 4; // グリッド間隔
```

### 🌟 **実用的な組み合わせ例**

```tsx
// 中央寄せのコンテナ
<div className="flex justify-center items-center h-screen">
  中央に表示される内容
</div>

// カード風のボックス
<div className="bg-white p-6 rounded-lg shadow-md">
  カードの内容
</div>

// ボタン風のリンク
<a className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
  リンクボタン
</a>
```

---

## 3. shadcn/ui コンポーネントの使い方

### 🔧 **基本的な使用パターン**

#### **Button（ボタン）**

```tsx
import { Button } from "@/components/ui/button";

// 基本的な使い方
<Button>クリック</Button>

// 見た目を変える
<Button variant="outline">枠線ボタン</Button>
<Button variant="destructive">削除ボタン</Button>

// サイズを変える
<Button size="sm">小さいボタン</Button>
<Button size="lg">大きいボタン</Button>

// カスタムクラスを追加
<Button className="bg-green-600 hover:bg-green-700">
  カスタムボタン
</Button>
```

#### **Card（カード）**

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>タイトル</CardTitle>
  </CardHeader>
  <CardContent>
    <p>カードの内容がここに入ります</p>
  </CardContent>
</Card>;
```

### 📋 **利用可能な variant（見た目のバリエーション）**

#### **Button の variant**

```tsx
<Button variant="default">    // メインボタン（緑色）
<Button variant="outline">    // 枠線のみ
<Button variant="secondary">  // グレー系
<Button variant="destructive">// 赤色（削除など）
<Button variant="ghost">      // 背景なし
<Button variant="link">       // リンク風
```

#### **Button の size**

```tsx
<Button size="sm">      // 小さい（高さ32px）
<Button size="default"> // 標準（高さ36px）
<Button size="lg">      // 大きい（高さ40px）
<Button size="icon">    // アイコン専用（正方形）
```

---

## 4. Aglink プロジェクト専用カラーパレット

### 🌿 **使用できる色の一覧**

Aglink プロジェクトでは、以下の色が`globals.css`で事前に定義されています：

```tsx
// メインカラー（優しい緑色）
bg - primary; // 背景を緑に
text - primary; // 文字を緑に
border - primary; // 枠線を緑に

// サブカラー（落ち着いた青色）
bg - secondary; // 背景を青に
text - secondary; // 文字を青に

// その他の定義済みカラー
bg - background; // アプリの基本背景色（薄いグレー）
text - foreground; // 基本の文字色（黒っぽい）
bg - card; // カードの背景色（白）
bg - destructive; // 警告色（赤）
```

### 🎨 **Aglink らしい色の組み合わせ例**

```tsx
// 農業らしいメインボタン
<Button className="bg-primary text-primary-foreground">
  診断を始める
</Button>

// 情報表示エリア
<div className="bg-secondary text-secondary-foreground p-4 rounded-lg">
  農地の詳細情報
</div>

// 成功メッセージ
<div className="bg-green-100 text-green-800 p-3 rounded">
  診断が完了しました！
</div>

// 注意メッセージ
<div className="bg-yellow-100 text-yellow-800 p-3 rounded">
  入力内容を確認してください
</div>
```

---

## 5. 実践例：農地カードを作ってみよう

### 🚜 **ステップ・バイ・ステップで農地カードを作成**

#### **Step 1: 基本的な枠を作る**

```tsx
export function FarmCard() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      農地の情報がここに入ります
    </div>
  );
}
```

#### **Step 2: 画像エリアを追加**

```tsx
export function FarmCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* 画像エリア */}
      <div className="h-48 bg-green-200 flex items-center justify-center">
        <span className="text-green-700">農地画像</span>
      </div>

      {/* 内容エリア */}
      <div className="p-4">農地の情報がここに入ります</div>
    </div>
  );
}
```

#### **Step 3: タイトルと説明を追加**

```tsx
export function FarmCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* 画像エリア */}
      <div className="h-48 bg-green-200 flex items-center justify-center">
        <span className="text-green-700">農地画像</span>
      </div>

      {/* 内容エリア */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          〇〇県の有機農地
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          初心者向けの農地です。野菜栽培に適しています。
        </p>

        {/* ボタンエリア */}
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            詳細を見る
          </Button>
          <Button variant="default" size="sm">
            ブックマーク
          </Button>
        </div>
      </div>
    </div>
  );
}
```

#### **Step 4: 完成版**

```tsx
import { Button } from "@/components/ui/button";

export function FarmCard({ farm }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      {/* 画像エリア */}
      <div className="h-48 bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center">
        <span className="text-green-800 font-medium">農地画像</span>
      </div>

      {/* 内容エリア */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{farm.name}</h3>
          <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
            おすすめ
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3">{farm.description}</p>

        <div className="text-sm text-gray-500 mb-4">
          📍 {farm.location} | 💰 {farm.price}
        </div>

        {/* ボタンエリア */}
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            詳細を見る
          </Button>
          <Button
            variant="default"
            size="sm"
            className="bg-green-600 hover:bg-green-700"
          >
            ⭐ ブックマーク
          </Button>
        </div>
      </div>
    </div>
  );
}
```

---

## 6. 困ったときのチートシート

### 🆘 **よくある問題と解決方法**

#### **Q1: ボタンの色が思った通りにならない**

```tsx
// ❌ こうではなく
<Button className="bg-red-500">削除</Button>

// ✅ こうする
<Button variant="destructive">削除</Button>
// または
<Button className="bg-red-500 hover:bg-red-700 text-white">削除</Button>
```

#### **Q2: 要素が中央に来ない**

```tsx
// ❌ こうではなく
<div className="text-center">
  <Button>ボタン</Button>
</div>

// ✅ こうする
<div className="flex justify-center">
  <Button>ボタン</Button>
</div>
```

#### **Q3: カードが横並びにならない**

```tsx
// ❌ こうではなく
<div>
  <FarmCard />
  <FarmCard />
</div>

// ✅ こうする
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <FarmCard />
  <FarmCard />
</div>
```

### 🔧 **デバッグのコツ**

1. **ブラウザの開発者ツールを使う**

   - `F12`キーを押して要素を確認
   - どのクラスが適用されているかチェック

2. **一つずつクラスを追加する**

   ```tsx
   // 最初はシンプルに
   <div className="bg-red-500">テスト</div>

   // 動いたら少しずつ追加
   <div className="bg-red-500 p-4">テスト</div>
   <div className="bg-red-500 p-4 rounded">テスト</div>
   ```

3. **公式ドキュメントを確認**
   - [Tailwind CSS 公式サイト](https://tailwindcss.com/)
   - [shadcn/ui 公式サイト](https://ui.shadcn.com/)

---

## 🎯 **まとめ：段階的な学習方法**

### **週 1: 基本クラスに慣れる**

- `bg-`, `text-`, `p-`, `m-` クラスを使ってみる
- 色や余白を自由に変更してみる

### **週 2: レイアウトを学ぶ**

- `flex`, `grid` を使って要素を並べる
- `justify-center`, `items-center` で中央寄せ

### **週 3: shadcn/ui コンポーネントを活用**

- `Button`, `Card` を使ってみる
- `variant` や `size` を変更してみる

### **週 4: Aglink らしいデザインを作る**

- プロジェクト専用カラーを使う
- 農地カードやフォームを作成

---

## 🌱 **最後に**

**完璧を求めず、まずは動くものを作ることから始めましょう！**

- コピー&ペーストから始めて OK
- 少しずつ理解を深めていく
- チームメンバーと助け合う
- 分からないことは遠慮なく質問する

Aglink プロジェクトを通じて、素敵なデザインスキルを身につけていきましょう！ 🚜✨
