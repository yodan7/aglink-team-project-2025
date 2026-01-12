"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  // /diagnosis の直下は無効化するが、/diagnosis/result は有効にする
  const isDiagnosisDisabled =
    pathname?.startsWith("/diagnosis") &&
    !pathname?.startsWith("/diagnosis/result");
  // ナビゲーションの共通データ
  const navItems = [
    { href: "/diagnosis", label: "診断を始める" },
    { href: "/aglitypes", label: "農業スタイル一覧" },
    { href: "/mypage", label: "マイページ" },
    { href: "/signin", label: "ログイン" },
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
      <nav className="hidden md:flex items-center space-x-4">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost" // 背景透明・ホバー時背景ありのスタイル
            asChild // 子要素のLinkをボタンとして振る舞わせる
            className="text-base font-medium text-[#4A3931] hover:text-green-700 hover:bg-green-50 px-5 py-2 transition-all duration-200"
          >
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ))}
      </nav>
    </header>
  );
}
