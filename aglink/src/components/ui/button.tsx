// React の基本的なインポート
import * as React from "react";
// Radix UI の Slot コンポーネント（asChild プロパティで使用）
import { Slot } from "@radix-ui/react-slot";
// CVA（Class Variance Authority）- 条件に応じてCSSクラスを切り替えるライブラリ
import { cva, type VariantProps } from "class-variance-authority";

// ユーティリティ関数（CSSクラスをマージする関数）
import { cn } from "@/lib/utils";

/**
 * ボタンのスタイルバリエーションを定義
 * CVAを使用して、variant（見た目）とsize（サイズ）の組み合わせでクラスを管理
 *
 * CVAの動作例:
 * buttonVariants({ variant: "destructive", size: "lg" })
 * → "inline-flex items-center ... bg-destructive text-white ... h-10 rounded-md px-6"
 *
 * CVAは以下の順序でクラスを結合します:
 * 1. ベースクラス（常に適用）
 * 2. variant で指定されたクラス
 * 3. size で指定されたクラス
 * 4. className で追加されたクラス（cnの中で処理）
 */
const buttonVariants = cva(
  // ベースとなる共通のスタイル
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      // ボタンの見た目バリエーション
      variant: {
        //-----以下はクラスの塊を宣言-----
        // デフォルト: プライマリカラー（メインアクション用）
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // 危険な操作用（削除など）
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        // アウトライン: 枠線のみ（セカンダリアクション用）
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        // セカンダリ: グレー系背景（補助的なボタン用）
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // ゴースト: 背景なし、ホバー時のみ背景表示
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        // リンク風: アンダーライン付きテキスト
        link: "text-primary underline-offset-4 hover:underline",
      },
      // ボタンのサイズバリエーション
      size: {
        // デフォルトサイズ: 高さ36px
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        // 小サイズ: 高さ32px
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        // 大サイズ: 高さ40px
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        // アイコンボタン: 正方形（36px x 36px）
        icon: "size-9",
      },
    },
    // デフォルトで使用するバリエーション
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * Buttonコンポーネント
 *
 * Aglinkアプリで使用する統一されたボタンコンポーネント
 * shadcn/uiベースで、アクセシビリティとデザインシステムに準拠
 *
 * @param className - 追加のCSSクラス
 * @param variant - ボタンの見た目バリエーション
 * @param size - ボタンのサイズ
 * @param asChild - trueの場合、子要素をボタンとしてレンダリング（例: Link要素）
 * @param props - その他のbutton要素のプロパティ
 */

// React.ComponentProps<"button">は通常のbuttonタグで使える全属性
// VariantProps<typeof buttonVariants>はcvaで定義したバリエーションの型
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  // asChildがtrueの場合はSlotを使用、falseの場合は通常のbutton要素を使用
  // Slotは子要素にボタンのプロパティを渡すRadix UIの機能
  // 例えばButtonの子要素がLinkならLink要素を持ったButtonとなる
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      // アクセシビリティ用のdata属性
      data-slot="button"
      // CVAで生成されたクラスと追加のクラスをマージ
      // 指定した引数に対応するclassをbuttonVariantsから集めて結合し、cn関数により洗練されてclassNameに設定
      className={cn(buttonVariants({ variant, size }), className)}
      // その他のプロパティ（onClick, disabled等）をそのまま渡す
      {...props}
    />
  );
}
// cnは以下の機能を提供します:
// 1. 複数のクラス文字列を結合
// 2. 重複するクラスを削除
// 3. 条件付きクラスの適用
// 4. Tailwind CSSのクラス衝突を解決

// Button コンポーネントとバリエーション定義をエクスポート
// buttonVariants もエクスポートすることで、他のコンポーネントでスタイルを再利用可能
export { Button, buttonVariants };
