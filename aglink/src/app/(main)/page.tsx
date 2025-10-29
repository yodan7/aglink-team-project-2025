"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SearchIcon,
  BookmarkIcon,
  BookmarkItem,
} from "@/components/domain/home";

interface Bookmark {
  id: number;
  image: string;
  title: string;
  description: string;
}

const bookmarks: Bookmark[] = [
  {
    id: 1,
    image: "https://placehold.co/80x80/e2e8f0/4a5568?text=Farm1",
    title: "新鮮なトマトの育て方",
    description: "家庭菜園で簡単にできる栽培のコツ。",
  },
  {
    id: 2,
    image: "https://placehold.co/80x80/e2e8f0/4a5568?text=Farm2",
    title: "オーガニック農法の基本",
    description: "化学肥料を使わない、環境に優しい農業。",
  },
  {
    id: 3,
    image: "https://placehold.co/80x80/e2e8f0/4a5568?text=Farm3",
    title: "最新の農業ドローン技術",
    description: "効率的な農薬散布や生育状況の監視。",
  },
  {
    id: 4,
    image: "https://placehold.co/80x80/e2e8f0/4a5568?text=Farm4",
    title: "土壌改良材の選び方と使い方",
    description: "あなたの畑に最適な改良材を見つけよう。",
  },
  {
    id: 5,
    image: "https://placehold.co/80x80/e2e8f0/4a5568?text=Farm5",
    title: "害虫対策の自然なアプローチ",
    description: "農薬に頼らない害虫対策をいくつか紹介。",
  },
  {
    id: 6,
    image: "https://placehold.co/80x80/e2e8f0/4a5568?text=Farm6",
    title: "水耕栽培システムの構築",
    description: "省スペースで始める未来の農業。",
  },
];

const homeIcons = [
  { src: "/images/group.jpg", alt: "集合写真" },
];

export default function Page() {
  const handleSearchClick = () => {
    console.log("Search button was clicked.");
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* ヘッダー */}
        <header className="flex justify-between items-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            ようこそ、usernameさん！
          </h1>
          <button
            onClick={handleSearchClick}
            className="focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full"
            aria-label="検索する"
          >
            <SearchIcon />
          </button>
        </header>

        <main className="space-y-5 sm:space-y-6">
          {/* 上部アイコン群 */}
          <section className="m-0 p-0 flex justify-center items-center">
            {homeIcons.map((icon, index) => (
              <img
                key={index}
                src={icon.src}
                alt={icon.alt}
                className="w-full h-auto block"
              />
            ))}
          </section>


          {/* ボタン群 */}
          <div className="relative flex items-center justify-center py-2 sm:py-4 mt-2 sm:mt-3">
            {/* 中央の「診断をはじめる」ボタン */}
            <Link
              href="/diagnosis"
              className="btn primary-action-btn absolute left-1/2 -translate-x-1/2 
                        px-16 py-5 text-xl rounded-full shadow-lg scale-110
                        transition-transform duration-300 hover:scale-115"
            >
              診断をはじめる
            </Link>

            {/* 右端の「履歴」ボタン */}
            <Link
              href="/diagnosis/history"
              className="btn secondary-action-btn ml-auto px-8 py-3 text-base rounded-full"
            >
              履歴
            </Link>
          </div>

          {/* ブックマークセクション */}
          <section className="bg-[#8CB389] w-full p-4 sm:p-6 rounded-2xl shadow-md flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-3">
                <BookmarkIcon />
                <h2 className="text-white font-bold text-2xl sm:text-3xl">
                  ブックマーク
                </h2>
              </div>
              <a
                href="#"
                className="text-white/90 hover:text-white transition-colors text-sm sm:text-base"
              >
                ブックマーク一覧へ
              </a>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              {bookmarks.map((item) => (
                <BookmarkItem
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
