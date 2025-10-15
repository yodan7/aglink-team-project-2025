import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// ... (MOCKデータ、定数定義、getLeafImageSrc 関数は省略)

const MOCK_QUESTION = { id: 1, text: "育てる野菜は、ちょっと形が変わった個性的な品種に魅力を感じる", axis: 'A/S' };
const TOTAL_QUESTIONS = 20;
const MOCK_CURRENT_PROGRESS_PERCENT = 35;
const ANSWER_VALUES = [2, 1, 0, -1, -2];
const CURRENT_ANSWER_VALUE = 2; 
const IMAGE_PATHS = {
    GREEN: '/images/leaf.png',       
    BROWN: '/images/deadleaves.png', 
    HALF: '/images/halfleaves.png',  
    AGLINK_LOGO: '/images/aglink-icon.png', 
};
const getLeafImageSrc = (value: number) => {
    if (value > 0) {
      return IMAGE_PATHS.GREEN; 
    } else if (value < 0) {
      return IMAGE_PATHS.BROWN; 
    } else {
      return IMAGE_PATHS.HALF;  
    }
};

export default function DiagnosisPageUI() {
  return (
    // ★ 修正1: 垂直方向のパディングを大幅に削減 (p-4 md:p-6 に変更)
    <div className={`flex flex-col items-center p-4 md:p-6 min-h-screen bg-background`}>
      
      {/* 0. ロゴとタイトルエリア */}
      <div className="w-full max-w-5xl flex flex-col items-center justify-center mb-6 md:mb-8 pt-4">
        
        {/* ロゴ画像 */}
        <Image
          src={IMAGE_PATHS.AGLINK_LOGO}
          alt="Aglink ロゴ"
          width={80}
          height={20}
          className="mb-2 object-contain h-12 w-auto" // ロゴの高さを少し縮小
        />
        
        {/* タイトル */}
        <h1 className="text-xl md:text-2x1 font-bold text-center text-foreground">
          農業スタイル診断
        </h1>
      </div>
      

      {/* 1. 進行度バーエリア */}
      {/* ★ 修正2: 下部マージンを削減 (mb-6 に変更) */}
      <div className="w-full max-w-5xl mb-6 pt-2">
        <h2 className={`text-sm font-semibold text-gray-600 mb-1 text-foreground`}>
          質問 {MOCK_QUESTION.id} / {TOTAL_QUESTIONS}
        </h2>
        <div className="relative w-full h-2 rounded-full bg-muted overflow-hidden"> {/* Progress Bar の高さを h-2 に縮小 */}
          <div 
            className={`h-full rounded-full transition-all duration-500 ease-in-out bg-primary`}
            style={{ width: `${MOCK_CURRENT_PROGRESS_PERCENT}%` }}
          />
        </div>
      </div>

      {/* 2. 質問カード/コンテナ */}
      {/* ★ 修正3: カードの垂直パディングを削減 (py-6 md:py-8 に変更) */}
      <div className="w-full max-w-4xl bg-card px-8 py-6 md:px-12 md:py-8 rounded-xl shadow-xl border border-border flex-shrink-0">
        
        {/* 質問文 */}
        {/* ★ 修正4: 質問文の下部マージンを削減 (mb-8 に変更) */}
        <p className={`text-xl md:text-2xl font-semibold mb-8 text-center text-foreground`}>
          {MOCK_QUESTION.text}
        </p>

        {/* 3. 回答選択肢エリア */}
        <div className="flex items-center justify-center w-full">
          
          {/* 「そう思う」を左端に配置 */}
          <div className="w-20 text-center mr-2 text-base md:text-lg font-medium">
            <span className="text-primary">そう思う</span>
          </div>

          {/* 葉っぱの選択肢コンテナ */}
          <div className="flex justify-between items-end w-full max-w-2xl px-2 md:px-4">
            {ANSWER_VALUES.map((value, index) => {
              // サイズ調整ロジック (省略)
              const sizeFactor = Math.abs(value) + 1;
              const baseSize = 40; 
              const leafSize = baseSize + sizeFactor * 10; // 葉っぱサイズもわずかに縮小

              const isSelected = (value === CURRENT_ANSWER_VALUE);

              return (
                <button
                  key={value}
                  className={`
                    relative transition-all duration-200 ease-in-out cursor-pointer p-0.5
                    ${isSelected ? 'scale-[1.1] shadow-lg rounded-full' : 'hover:scale-[1.05]'}
                  `}
                  style={{ width: leafSize, height: leafSize, minWidth: leafSize }}
                  aria-label={`回答: ${value}`}
                >
                  <Image
                    src={getLeafImageSrc(value)}
                    alt={`回答: ${value}`}
                    fill 
                    className={`
                      object-contain transition-all duration-200 
                      ${isSelected 
                        ? 'filter saturate-[200%] drop-shadow-lg' 
                        : 'opacity-70 hover:opacity-100'
                      }
                    `}
                    style={{ 
                      filter: isSelected ? 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))' : 'none' 
                    }}
                  />
                </button>
              );
            })}
          </div>
          
          {/* 「そう思わない」を右端に配置 */}
          <div className="w-20 text-center ml-2 text-base md:text-lg font-medium">
            <span className="text-muted-foreground">そう思わない</span>
          </div>
        </div>
      </div>

      {/* 4. ナビゲーションボタン */}
      {/* ★ 修正5: 上部マージンを削減 (mt-6 に変更) */}
      <div className="w-full max-w-4xl flex justify-between mt-6">
        <Button 
          className={`px-6 py-2 rounded-md shadow-md text-white transition-all duration-200 bg-muted-foreground hover:bg-muted-foreground/90 hover:shadow-lg hover:scale-[1.02]`}
          asChild
        >
            <Link href="#"><ArrowLeft className="w-4 h-4 mr-2" /> 戻る</Link>
        </Button>

        <Button 
          className={`px-6 py-2 rounded-md shadow-md text-white transition-all duration-200 bg-primary hover:bg-primary/90 hover:shadow-lg hover:scale-[1.02]`}
          asChild
        >
            <Link href="#">次へ <ArrowRight className="w-4 h-4 ml-2" /></Link>
        </Button>
      </div>

    </div>
  );
}