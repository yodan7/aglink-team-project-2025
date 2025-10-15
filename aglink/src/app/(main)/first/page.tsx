'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// --- カスタム定義 ---
const TEXT_COLOR = 'text-[#4A3931]'; 
const LEAF_BUTTON_GREEN = 'bg-[#98D882] hover:bg-[#85C46E]'; 

// 一文字ずつ浮かび上がらせるテキスト
const TITLE_TEXT = "あなただけの農業スタイル"; // 10文字

// アニメーション設定
const INITIAL_DELAY_MS = 800; 
const STAGGER_DELAY_MS = 150; 
const BUTTON_APPEAR_DELAY_MS = 4000; 

export default function DiagnosisStartPage() {
    // ... (useState, useEffect の部分は変更なし)
    const [isTextVisible, setIsTextVisible] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(false);

    useEffect(() => {
        const textTimer = setTimeout(() => setIsTextVisible(true), INITIAL_DELAY_MS);
        const buttonTimer = setTimeout(() => setIsButtonVisible(true), BUTTON_APPEAR_DELAY_MS); 
        return () => {
            clearTimeout(textTimer);
            clearTimeout(buttonTimer);
        };
    }, []);

    // ★ 画面幅に合わせてテキストを縮小するロジック (カスタムフックとして分離する方が理想的ですが、ここでは直接実装)
    const [scale, setScale] = useState(1);
    
    useEffect(() => {
        const handleResize = () => {
            const containerWidth = window.innerWidth * 0.9; // 画面幅の90%をコンテナと見なす
            const desiredTextWidth = (window.innerWidth >= 768) ? 750 : 500; // PCで約750px、モバイルで約500pxの幅を想定
            
            // 画面幅が想定サイズより小さい場合にスケールを計算
            const newScale = Math.min(1, containerWidth / desiredTextWidth);
            setScale(newScale);
        };

        handleResize(); // 初期ロード時に実行
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div className="relative w-full min-h-[calc(100vh-80px)] overflow-hidden">
            {/* 1. 背景画像とオーバーレイ (省略) */}
            <div className="absolute inset-0 z-0">
                <Image src="/images/farm.jpg" alt="豊かな農場の風景" fill style={{ objectFit: 'cover' }} priority />
                <div className="absolute inset-0 bg-white opacity-40"></div>
            </div>

            {/* 2. コンテンツエリア (中央寄せの基準点) */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4">
                
                {/* --- ① あなただけの農業スタイル (一文字ずつのアニメーション) --- */}
                <h1
                    className={`
                        text-5xl md:text-7xl font-extrabold mb-12 ${TEXT_COLOR}
                        
                        // ★ 修正点: 絶対位置と transform スケール
                        whitespace-nowrap 
                        absolute top-1/2 left-1/2 transform 
                        -translate-x-1/2 -translate-y-1/2 
                    `}
                    // ★ 修正点: スケールを適用して画面幅に収める
                    style={{ 
                        textShadow: '1px 1px 2px rgba(255,255,255,0.7)',
                        transform: `translate(-50%, -50%) scale(${scale})` // JSで計算したスケールを適用
                    }}
                >
                    {TITLE_TEXT.split("").map((char, index) => (
                        <span
                            key={index}
                            className={`
                                inline-block transition-all duration-500 ease-out 
                                ${isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                            `}
                            style={{ transitionDelay: `${index * STAGGER_DELAY_MS + INITIAL_DELAY_MS}ms` }} 
                        >
                            {char === ' ' ? '\u00A0' : char} 
                        </span>
                    ))}
                </h1>

                {/* --- ② はじめるボタン (葉っぱ型アニメーション) --- */}
                <Link href="/login" >
                    <Button
                        className={`
                            relative text-2xl font-bold py-6 px-16 h-auto 
                            rounded-full shadow-xl transition-all duration-300 transform
                            ${LEAF_BUTTON_GREEN} text-white
                            hover:scale-[1.05] hover:shadow-2xl hover:brightness-110
                            
                            // ★ 修正点: ボタンの配置をh1の下に調整
                            absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[100px] 

                            ${isButtonVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
                        `}
                        aria-label="はじめる"
                    >
                        はじめる
                    </Button>
                </Link>
            </div>
        </div>
    );
}