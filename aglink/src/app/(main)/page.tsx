"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const homeIcons = [{ src: "/images/group.png", alt: "集合写真" }];

export default function Page() {
  return (
    <div className="min-h-screen font-sans p-0">
      <div className="w-full px-4 sm:px-6 lg:px-10">
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
      <section className="relative w-full mt-14">
        <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-12">
          {homeIcons.map((icon, index) => (
            <div key={index} className="w-full h-auto flex justify-center mb-auto">
              <Image
                src={icon.src}
                alt={icon.alt}
                width={1000}
                height={1000}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
