// src/context/DisplayContext.tsx
"use client";

import { createContext, useContext } from "react";
import { usePathname } from "next/navigation";

const DisplayContext = createContext<boolean>(true);

export const DisplayProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname() || ""; // 初期値を空文字列に設定

  // localhost:3000/diagnosis の場合のみ isDisplay を false に設定
  const isDisplay = pathname !== "/diagnosis";
  console.log("pathname", pathname);
  console.log("isDisplay", isDisplay);

  return (
    <DisplayContext.Provider value={isDisplay}>
      {children}
    </DisplayContext.Provider>
  );
};

export const useIsDisplay = () => {
  const context = useContext(DisplayContext);
  if (context === undefined) {
    throw new Error("useIsDisplay must be used within a DisplayProvider");
  }
  return context;
};
