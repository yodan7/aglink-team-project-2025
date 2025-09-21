import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="p-8 space-y-4">
      <div className="text-2xl font-bold text-green-600">
        Aglinkへようこそ！
      </div>

      {/* デバッグ用: 直接Tailwindクラスを使用 */}
      <div className="space-y-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          通常のTailwindボタン（テスト用）
        </button>

        <Button variant="outline" size="sm" className="border-green-500">
          お気に入り
        </Button>
        <Button
          variant="default"
          size="lg"
          className="bg-green-600 hover:bg-green-700"
        >
          診断を始める
        </Button>
        <Button variant="destructive" size="default">
          アカウントを削除
        </Button>
        <Button className="bg-primary text-primary-foreground">
          診断を始める
        </Button>

        <div className="bg-secondary text-secondary-foreground">農地情報</div>

        <Button variant="destructive">削除</Button>
      </div>
    </div>
  );
}
