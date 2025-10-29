// aglink/src/components/domain/home/SearchIcon.tsx
import React from "react";

export const SearchIcon: React.FC = () => (
  // 白い背景と黒い枠を削除し、シンプルなアイコンに変更
  <div className="p-2 rounded-full hover:bg-gray-200/80 transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </div>
);