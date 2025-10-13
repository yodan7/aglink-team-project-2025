// aglink/src/components/domain/home/SearchIcon.tsx
import React from "react";

export const SearchIcon: React.FC = () => (
  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full border-4 border-black flex items-center justify-center flex-shrink-0">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </div>
);
