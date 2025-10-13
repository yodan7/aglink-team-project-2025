import Link from 'next/link'; // Linkコンポーネントをインポート
import Image from 'next/image';
import { Instagram, Twitter, Mail } from "lucide-react";

// AG_LIGHT_GREEN の定義は削除またはコメントアウト (未使用のため)
// const AG_LIGHT_GREEN = "text-aglink-light-green"; 

export function Footer() {
  return (
    // Tailwindのカスタムクラス名はそのまま維持
    <footer className="bg-aglink-dark-green text-aglink-light-green py-12 md:py-16">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
        
        {/* 会社情報/ロゴ */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          {/* Linkコンポーネントを使用 */}
          <Link href="/" className="transition-opacity hover:opacity-80">
            {/* ロゴ画像を配置 */}
            <Image
              src="/images/aglink-logo.png" 
              alt="Aglink ロゴ"
              width={130} // ヘッダーより少し大きめに
              height={35}
              // 濃い背景色での視認性向上のためのCSSフィルター（必要に応じて調整）
              className="invert-0 filter hue-rotate-[180deg] saturate-50"
            />
          </Link>
          <p className="text-sm text-gray-300">
            あなたの農業ライフをサポート
          </p>
        </div>

        {/* ナビゲーションリンク */}
        <div className="flex flex-col items-center md:items-start space-y-2 text-sm">
          <span className="font-semibold text-white mb-1">サイトマップ</span>
          
          {/* <a>タグからLinkに置き換えることを推奨（ここでは簡潔さのため<a>を維持） */}
          <a href="/about" className="hover:text-white transition-colors">Aglinkについて</a>
          <a href="/faq" className="hover:text-white transition-colors">よくある質問</a>
          <a href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</a>
        </div>

        {/* ソーシャルメディアアイコン */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <span className="font-semibold text-white mb-1">SNSでつながる</span>
          <div className="flex space-x-4">
            <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-white transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-white transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Contact" className="text-gray-300 hover:text-white transition-colors">
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      
      {/* 著作権情報 */}
      <div className="container mx-auto mt-8 pt-4 border-t border-gray-700 text-center">
        <p className="text-xs text-gray-400">&copy; 2025 Aglink. All Rights Reserved.</p>
      </div>
    </footer>
  );
}