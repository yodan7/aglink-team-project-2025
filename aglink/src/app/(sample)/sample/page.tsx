import React from "react";

/**
 * リストの一つ一つの項目を表示するコンポーネント
 */
const FarmListItem: React.FC = () => {
  return (
    <div className="flex gap-4 items-center">
      {/* 画像プレースホルダー */}
      <div className="w-24 h-16 bg-slate-200 rounded-lg shrink-0"></div>

      {/* テキスト部分のプレースホルダー */}
      <div className="w-full space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="h-5 w-4/5 bg-slate-400 rounded"></div>
          {/* ブックマークアイコン */}
          <svg
            className="w-5 h-5 text-yellow-400 shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
        </div>
        <div className="h-3 w-full bg-slate-300 rounded"></div>
        <div className="h-3 w-5/6 bg-slate-300 rounded"></div>
      </div>
    </div>
  );
};

/**
 * 「おすすめの農地」カード全体を表示するメインコンポーネント
 */
const RecommendedFarmsCard: React.FC = () => {
  // 表示するリスト項目のためのダミーデータ
  const farmData = [{ id: 1 }, { id: 2 }, { id: 3 }];

  return (
    // 背景（ページ全体）
    <div
      className="bg-stone-100 min-h-screen flex items-center justify-center p-4"
      // Reactでは通常、フォントは `index.css` などでグローバルに指定します
      style={{ fontFamily: "'M PLUS Rounded 1c', sans-serif" }}
    >
      {/* カード本体 */}
      <div className="bg-[#78b17a] rounded-2xl p-6 md:p-8 shadow-lg w-full max-w-2xl">
        {/* タイトル */}
        <h1
          className="text-white text-3xl font-extrabold mb-6"
          // インラインスタイルはオブジェクト形式で記述します
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.2)" }}
        >
          おすすめの農地
        </h1>

        {/* リストとスクロールバーのコンテナ */}
        <div className="flex gap-3">
          {/* リスト項目 */}
          <div className="space-y-6 flex-grow">
            {/* ダミーデータを元にリスト項目を繰り返し表示 */}
            {farmData.map((farm) => (
              <FarmListItem key={farm.id} />
            ))}
          </div>

          {/* 擬似スクロールバー */}
          <div className="w-1.5 h-auto bg-white bg-opacity-50 rounded-full"></div>
        </div>

        {/* ホームボタン */}
        <div className="flex justify-end mt-6">
          <button className="bg-[#3b82f6] text-white font-bold py-2 px-8 rounded-full shadow-md hover:bg-blue-600 transition-colors">
            ホーム
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendedFarmsCard;
