import Link from 'next/link';
import Image from 'next/image'; // Imageコンポーネントはロゴ表示で使用
import { Button } from "@/components/ui/button";

// Sheet関連はモバイルナビゲーションを削除したため、インポート不要

// 仮のカスタムカラー定義（tailwind.config.tsに設定されることを前提）
// ※ ESLintのエラーを消すには、tailwind.config.tsにこのカラー設定が必要です。
const AG_BROWN = "text-aglink-brown";
const AG_HOVER_GREEN = "hover:text-aglink-green";

export function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm py-4 px-6 md:px-12 flex justify-between items-center fixed top-0 left-0 w-full z-50 border-b border-gray-100">
      
      {/* ロゴエリア - Linkを直接使用 */}
      <Link 
        href="/" 
        className="flex items-center space-x-2 transition-opacity hover:opacity-80"
      >
        {/* ロゴ画像を配置 (コメントアウトを解除) */}
        <Image
          src="/images/aglink-logo.pmg" 
          alt="Aglink ロゴ"
          width={110} 
          height={30} 
          priority 
          className="w-auto h-7"
        />
      </Link>

      {/* デスクトップ用ナビゲーション (変更なし) */}
      <nav className="hidden md:flex items-center space-x-8">
        <a href="#diagnosis" className={`${AG_BROWN} ${AG_HOVER_GREEN} font-medium transition-colors duration-200`}>
          診断を始める
        </a>
        <a href="#farms" className={`${AG_BROWN} ${AG_HOVER_GREEN} transition-colors duration-200`}>
          農園を探す
        </a>
        <a href="#mypage" className={`${AG_BROWN} ${AG_HOVER_GREEN} transition-colors duration-200`}>
          マイページ
        </a>
        <Button variant="ghost" className="rounded-full text-white bg-aglink-green hover:bg-aglink-dark-green transition-colors">
          ログイン
        </Button>
      </nav>

    </header>
  );
}