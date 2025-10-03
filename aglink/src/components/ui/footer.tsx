import { MountainIcon, Instagram, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-aglink-dark-green text-aglink-light-green py-12 md:py-16">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
        
        {/* 会社情報/ロゴ */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <div className="flex items-center space-x-2">
            <MountainIcon className="h-6 w-6" />
            <span className="font-bold text-xl text-white">Aglink</span>
          </div>
          <p className="text-sm text-gray-300">
            あなたの農業ライフをサポート
          </p>
        </div>

        {/* ナビゲーションリンク */}
        <div className="flex flex-col items-center md:items-start space-y-2 text-sm">
          <span className="font-semibold text-white mb-1">サイトマップ</span>
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