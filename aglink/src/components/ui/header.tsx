"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

// Sheet, Menu, LogIn などのモバイルナビゲーション関連のインポートは削除

// 仮のカスタムカラー定義（tailwind.config.tsに設定されることを前提）
const AG_BROWN = "text-aglink-brown";
const AG_HOVER_GREEN = "hover:text-aglink-green";

export function Header() {
  const pathname = usePathname();
  // /diagnosis の直下は無効化するが、/diagnosis/result は有効にする
  const isDiagnosisDisabled =
    pathname?.startsWith("/diagnosis") && !pathname?.startsWith("/diagnosis/result");
  // ナビゲーションの共通データ
  const navItems = [
    { href: "/diagnosis", label: "診断を始める" },
    { href: "/farms", label: "農園を探す" },
    { href: "/mypage", label: "マイページ" },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm py-4 px-6 md:px-12 flex justify-between items-center fixed top-0 left-0 w-full z-50 border-b border-gray-100">
      {/* ロゴエリア */}
      {/** /diagnosis 配下だが /diagnosis/result は許可する */}
      {!isDiagnosisDisabled ? (
        <Link href="/" aria-label="ホームに戻る" className="inline-block">
          <Image
            src="/images/logo-icon/aglink-logo.png"
            alt="Aglink ロゴ - 成長と繋がり"
            width={180}
            height={50}
            priority
            className="h-10 w-auto object-contain"
          />
        </Link>
      ) : (
        <div className="inline-block cursor-not-allowed opacity-80" aria-hidden>
          <Image
            src="/images/logo-icon/aglink-logo.png"
            alt="Aglink ロゴ - 成長と繋がり"
            width={180}
            height={50}
            priority
            className="h-10 w-auto object-contain"
          />
        </div>
      )}

      {/* デスクトップ用ナビゲーション (md以上で表示) */}
      {/* モバイル画面ではこのナビゲーションは非表示になります。 */}
      <nav className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${AG_BROWN} ${AG_HOVER_GREEN} font-medium transition-colors duration-200`}
          >
            {item.label}
          </Link>
        ))}

        {/* ログインボタン */}
        <Button
          variant="link"
          className={`px-0 ${AG_BROWN} ${AG_HOVER_GREEN} transition-colors duration-200`}
          asChild
        >
          <Link href="/login">ログイン</Link>
        </Button>
      </nav>
    </header>
  );
}
