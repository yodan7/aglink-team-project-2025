"use client";

import React from 'react';

// --- TypeScript Type Definitions ---
interface Bookmark {
  id: number;
  image: string;
  title: string;
  description:string;
}

interface BookmarkItemProps {
  image: string;
  title: string;
  description: string;
}

// --- Mock Data for Bookmarks ---
const bookmarks: Bookmark[] = [
  { id: 1, image: 'https://placehold.co/80x80/e2e8f0/4a5568?text=Farm1', title: '新鮮なトマトの育て方', description: '家庭菜園で簡単にできる栽培のコツ。' },
  { id: 2, image: 'https://placehold.co/80x80/e2e8f0/4a5568?text=Farm2', title: 'オーガニック農法の基本', description: '化学肥料を使わない、環境に優しい農業。' },
  { id: 3, image: 'https://placehold.co/80x80/e2e8f0/4a5568?text=Farm3', title: '最新の農業ドローン技術', description: '効率的な農薬散布や生育状況の監視。' },
  { id: 4, image: 'https://placehold.co/80x80/e2e8f0/4a5568?text=Farm4', title: '土壌改良材の選び方と使い方', description: 'あなたの畑に最適な改良材を見つけよう。' },
  { id: 5, image: 'https://placehold.co/80x80/e2e8f0/4a5568?text=Farm5', title: '害虫対策の自然なアプローチ', description: '農薬に頼らない害虫対策をいくつか紹介。' },
  { id: 6, image: 'https://placehold.co/80x80/e2e8f0/4a5568?text=Farm6', title: '水耕栽培システムの構築', description: '省スペースで始める未来の農業。' },
];

const SearchIcon = () => (
  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full border-4 border-black flex items-center justify-center flex-shrink-0">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </div>
);

// 中央のイラスト。画面サイズに応じて大きくなるように調整
const FarmIllustration = () => (
    <div className="relative w-full flex justify-center items-end space-x-2 sm:space-x-4 md:space-x-6 h-40 sm:h-56 lg:h-64">
      <img 
        src="https://loosedrawing.com/assets/media/illustrations/png/715.png" 
        alt="野菜かごを持つ農家" 
        className="h-32 sm:h-48 lg:h-56 object-contain"
      />
      <img 
        src="https://loosedrawing.com/assets/media/illustrations/png/872.png" 
        alt="トラクターや作物などの農業イラスト" 
        className="h-28 sm:h-40 lg:h-48 object-contain"
      />
      <img 
        src="https://loosedrawing.com/assets/media/illustrations/png/719.png" 
        alt="耕運機を使う農家" 
        className="h-32 sm:h-48 lg:h-56 object-contain"
      />
    </div>
);

const BookmarkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" fill="white" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" stroke="white" strokeWidth={2}/>
  </svg>
);

const BookmarkItem = ({ image, title, description }: BookmarkItemProps) => {
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = 'https://placehold.co/80x80/ef4444/ffffff?text=Error';
    };

    return (
        <div className="flex items-center space-x-4 p-2 rounded-lg hover:bg-black/10 transition-colors">
            <img 
              src={image} 
              alt={title} 
              className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-300 rounded-md flex-shrink-0 object-cover border-2 border-white/50"
              onError={handleImageError}
            />
            <div className="flex-grow">
                <h3 className="font-bold text-white text-lg sm:text-xl">{title}</h3>
                <p className="text-white/90 text-base">{description}</p>
            </div>
        </div>
    );
};

export default function Page() {
  const handleSearchClick = () => {
    console.log('Search button was clicked.');
  };

  return (
    <div className="bg-[#F3F2E9] h-screen w-full p-4 lg:p-8 flex flex-col items-center font-sans overflow-hidden">
      
      <div className="w-full max-w-6xl flex flex-col flex-1 h-full">
        <header className="flex-shrink-0">
          <button 
            onClick={handleSearchClick}
            className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-[#F3F2E9] rounded-full"
            aria-label="検索する"
          >
            <SearchIcon />
          </button>
        </header>
        
        <main className="w-full flex flex-col items-center flex-1 justify-around min-h-0">

          <div className="flex-shrink-0">
            <FarmIllustration />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-10 flex-shrink-0 my-2">
            <button className="text-[#3A6B41] font-bold py-3 px-8 text-2xl lg:text-3xl transition-transform hover:scale-105">
              診断をはじめる
            </button>
            <button className="bg-[#4A6EAF] hover:bg-[#42619c] text-white font-bold py-3 px-8 text-xl lg:text-2xl rounded-lg shadow-md transition-shadow hover:shadow-lg">
              履歴
            </button>
          </div>

          <section className="bg-[#8CB389] w-full p-4 sm:p-6 rounded-3xl shadow-md flex flex-col flex-1 min-h-0">
            <div className="flex items-center space-x-3 mb-4 flex-shrink-0">
              <BookmarkIcon />
              <h2 className="text-white font-bold text-3xl lg:text-4xl">ブックマーク</h2>
            </div>
            
            <div className="overflow-y-auto pr-2 space-y-2 flex-1">
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
