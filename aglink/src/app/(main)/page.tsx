"use client";

import React from "react";
import Image from "next/image";
import {
  SearchIcon,
  BookmarkIcon,
  BookmarkItem,
} from "@/components/domain/home";
import Link from "next/link";
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
  { src: "/images/farmer.png", alt: "農家" },
  { src: "/images/tractor.png", alt: "トラクター" },
  { src: "/images/leaf-and-nuts.png", alt: "牛" },
  { src: "/images/planting.png", alt: "稲" },
];

export default function Page() {
  const handleSearchClick = () => {
    console.log("Search button was clicked.");
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-6">
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

        <main className="space-y-6">
          <section className="bg-green-100/60 rounded-2xl p-4 flex justify-around items-center">
            {homeIcons.map((icon, index) => (
              <img
                key={index}
                src={icon.src}
                alt={icon.alt}
                className="h-14 w-14 sm:h-16 sm:w-16 opacity-70"
              />
            ))}
          </section>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 py-4">
            <button className="w-full sm:w-auto bg-[#3A6B41] hover:bg-[#315a37] text-white font-bold py-3 px-12 text-lg rounded-lg shadow-md transition-all duration-300">
              診断をはじめる
            </button>
            <button className="w-full sm:w-auto bg-[#4A6EAF] hover:bg-[#42619c] text-white font-bold py-3 px-12 text-lg rounded-lg shadow-md transition-all duration-300">
              履歴
            </button>
          </div>

          <section className="bg-[#8CB389] w-full p-4 sm:p-6 rounded-2xl shadow-md flex flex-col">
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
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

      {/* アクションボタン群 */}
      <div className="action-buttons-container">
        {/* 診断をはじめるボタン (メインアクション) */}
        <Link href="/diagnosis" className="btn primary-action-btn">
          診断をはじめる
        </Link>

        {/* 履歴ボタン (サブアクション) */}
        <Link href="/diagnosis/history" className="btn secondary-action-btn">
          履歴
        </Link>
      </div>

      {/* ブックマーク/お気に入りセクション */}
      <section className="bookmark-section">
        {/* <DummyBookmarkList /> 存在しないcomponent だったので一旦コメントアウト。できたら編集してください。*/}
      </section>
    </div>
  );
}
