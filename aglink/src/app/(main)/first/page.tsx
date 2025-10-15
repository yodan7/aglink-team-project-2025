import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
// import Image from 'next/image'; // イラストを使用する場合はインポート

// カスタムカラー（tailwind.config.tsに設定を推奨）
const AG_GREEN = '#4CAF50';
const AG_DARK_GREEN = '#388E3C';
const AG_BROWN = '#795548';
const AG_BG_LIGHT = '#F4F7F2'; // 画像の背景色に近いオフホワイト

export default function DiagnosisStartPage() {
  return (
    // PC画面全体に広がる背景と中央配置
    <div className={`flex flex-col items-center min-h-screen ${AG_BG_LIGHT}`} style={{ paddingTop: '80px' }}>
      
      {/* PC画面ではHeaderはlayout.tsxで表示されるため、ここでは省略します。
          ただし、この画面単体で表示する場合は、Headerをインポートして配置してください。
      */}
      
      {/* コンテンツを中央に配置するコンテナ (PCでの視認性を考慮し、最大幅を設定) */}
      <div className="flex flex-col items-center justify-center p-12 max-w-4xl w-full h-full my-auto">
        
        {/* ロゴとヘッダー要素 (デザインを再現するため、簡略化して配置) */}
        <div className="flex items-center space-x-2 mb-4">
          
          <h1 className="text-3xl font-bold" style={{ color: AG_BROWN }}>Aglink</h1>
        </div>

        {/* キャッチコピー */}
        <p className="text-3xl font-extrabold mb-2" style={{ color: AG_BROWN }}>
          #あなただけの農業スタイル
        </p>
        <p className="text-lg mb-8" style={{ color: AG_BROWN }}>
          20の質問で、ぴったりの農業スタイルを診断！
        </p>

        {/* イラストエリア（PC画面に合わせてサイズ調整） */}
        <div className="w-full h-80 mb-12 flex justify-center items-center overflow-hidden">
          {/* TODO: ここに実際のイラスト画像を配置します。 
            例: <Image src="/images/farm-scene.png" alt="Happy farmers" width={800} height={320} className="rounded-xl shadow-lg" />
          */}
          <div 
            className="w-[800px] h-[320px] bg-gray-200 flex items-center justify-center text-gray-600 rounded-xl"
            style={{ backgroundImage: `url('/path/to/your/illustration.png')`, backgroundSize: 'cover' }}
          >
            {/* プレースホルダー: ここに畑のイラストが入ります */}
          </div>
        </div>

        {/* 診断スタートボタン */}
        <Link href="/diagnosis" passHref>
          <Button
            className="w-80 text-white text-xl font-bold py-6 h-auto rounded-full shadow-lg transition-all duration-300"
            // グラデーションボタンのスタイル
            style={{
              background: `linear-gradient(to right, ${AG_GREEN} 0%, ${AG_DARK_GREEN} 100%)`,
            }}
          >
            はじめる
          </Button>
        </Link>

      </div>
    </div>
  );
}