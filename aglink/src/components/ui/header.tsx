import Link from 'next/link';
import { MountainIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// 仮のカスタムカラー定義（tailwind.config.tsで設定されることを前提）
const AG_GREEN = "text-aglink-green";
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
        <MountainIcon className={`h-6 w-6 ${AG_GREEN}`} /> 
        <span className={`font-bold text-2xl ${AG_BROWN}`}>Aglink</span>
      </Link>

      {/* デスクトップ用ナビゲーション (モバイルでは非表示) */}
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
        {/* アカウントボタン */}
        <Button variant="ghost" className="rounded-full text-white bg-aglink-green hover:bg-aglink-dark-green transition-colors">
          ログイン
        </Button>
      </nav>

      {/* モバイル用ナビゲーション (Sheet) はこのコードから完全に削除されました。
        これにより、モバイル画面ではロゴの反対側に何も表示されません。
      */}

    </header>
  );
}