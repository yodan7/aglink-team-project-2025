import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// HeaderとFooterをインポート
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aglink",
  description: "農業と人をつなぐアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header /> {/* ヘッダーを配置 */}
        {/*
          メインコンテンツエリア
          'flex-grow'でフッターを画面下部に固定し、
          'pt-[80px]'でHeaderの高さ分のスペースを確保します。
          （Headerの高さが約80pxと仮定）
        */}
        <main className="flex-grow pt-[80px]">{children}</main>
        <Footer /> {/* フッターを配置 */}
      </body>
    </html>
  );
}
