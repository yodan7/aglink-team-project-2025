"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  SearchIcon,
  BookmarkIcon,
  HistoryIcon,
  BookmarkItem,
} from "@/components/domain/home";
import Image from "next/image";

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
  {
    id: 7,
    image: "https://placehold.co/80x80/e2e8f0/4a5568?text=Farm7",
    title: "気候変動と作物の関係",
    description: "持続可能な農業を目指すための基礎知識。",
  },
  {
    id: 8,
    image: "https://placehold.co/80x80/e2e8f0/4a5568?text=Farm8",
    title: "有機堆肥の作り方",
    description: "家庭でできる簡単な堆肥作りを紹介。",
  },
  {
    id: 9,
    image: "https://placehold.co/80x80/e2e8f0/4a5568?text=Farm9",
    title: "季節ごとの野菜栽培スケジュール",
    description: "春夏秋冬に応じたおすすめ野菜を紹介。",
  },
  {
    id: 10,
    image: "https://placehold.co/80x80/e2e8f0/4a5568?text=Farm10",
    title: "スマート農業の最新トレンド",
    description: "AIとIoTが支える次世代農業技術。",
  },
];

const homeIcons = [{ src: "/images/group.png", alt: "集合写真" }];

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchClick = () => {
    console.log("Search button clicked.");
  };

  const handleBookmarkClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans p-0">
      <div className="w-full px-4 sm:px-6 lg:px-10">
        {/* ヘッダー */}
        <header className="flex justify-end items-center mb-6 relative z-10">
          <div className="flex items-center justify-end space-x-10 sm:space-x-12">
            <button
              onClick={handleBookmarkClick}
              className="flex items-center justify-center rounded-full hover:bg-gray-200 p-4 sm:p-5 transition"
            >
              <BookmarkIcon />
            </button>
            <Link
              href="/diagnosis/history"
              className="flex items-center justify-center rounded-full hover:bg-gray-200 p-4 sm:p-5 transition"
            >
              <HistoryIcon />
            </Link>
            <button
              onClick={handleSearchClick}
              className="flex items-center justify-center rounded-full hover:bg-gray-200 p-4 sm:p-5 transition"
            >
              <SearchIcon />
            </button>
          </div>
        </header>

        {/* タイトル */}
        <div className="flex justify-center mt-8 mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 text-center">
            さあ、農業をはじめよう！
          </h1>
        </div>

        {/* 診断ボタン */}
        <main className="space-y-5 sm:space-y-6">
          <div className="flex justify-center mt-4">
            <Link
              href="/diagnosis"
              className="btn primary-action-btn px-16 py-5 text-xl rounded-full shadow-lg scale-110 transition-transform duration-300 hover:scale-115 bg-[#8CB389] text-white"
            >
              診断をはじめる
            </Link>
          </div>
        </main>
      </div>

      {/* 背景画像セクション */}
      <section className="relative w-full bg-gray-50 mt-14">
        <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-12">
          {homeIcons.map((icon, index) => (
            <Image
              key={index}
              src={icon.src}
              alt={icon.alt}
              width={1000}
              height={1000}
              className="w-full h-auto object-contain block mx-auto mb-auto"
              style={{ maxHeight: "80vh" }}
            />
          ))}
        </div>
      </section>

      {/* ブックマーク一覧モーダル */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-[900px] max-h-[80vh] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center px-5 py-4 bg-[#8CB389] text-white">
              <h2 className="text-xl font-bold flex items-center space-x-2">
                <div className="pointer-events-none select-none">
                  <BookmarkIcon />
                </div>
                <span>ブックマーク一覧</span>
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-white text-3xl font-light hover:text-gray-200"
              >
                &times;
              </button>
            </div>
            <div className="p-6 space-y-3 overflow-y-auto">
              {bookmarks.map((item) => (
                <BookmarkItem
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
