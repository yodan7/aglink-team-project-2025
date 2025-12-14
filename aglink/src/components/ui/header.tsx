import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Header() {
  // ナビゲーションの共通データ（ログインも含めて配列化し、統一的に扱います）
  const navItems = [
    { href: "/diagnosis", label: "診断を始める" },
    { href: "/types", label: "農業スタイル一覧" },
    { href: "/mypage", label: "マイページ" },
    { href: "/signin", label: "ログイン" },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm py-4 px-6 md:px-12 flex justify-between items-center fixed top-0 left-0 w-full z-50 border-b border-gray-100">
      {/* ロゴエリア */}
      <Link href="/" className="hover:opacity-80 transition-opacity">
        <Image
          src="/images/logo-icon/aglink-logo.png"
          alt="Aglink ロゴ - 成長と繋がり"
          width={180}
          height={50}
          priority
          className="h-10 w-auto object-contain"
        />
      </Link>

      {/* デスクトップ用ナビゲーション (md以上で表示) */}
      <nav className="hidden md:flex items-center space-x-4">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost" // 背景透明・ホバー時背景ありのスタイル
            asChild // 子要素のLinkをボタンとして振る舞わせる
            className="text-base font-medium text-[#4A3931] hover:text-green-700 hover:bg-green-50 px-5 py-2 transition-all duration-200"
          >
            <Link href={item.href}>
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
    </header>
  );
}