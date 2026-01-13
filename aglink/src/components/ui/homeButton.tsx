import React from "react";
import { Button } from "./button";
import Link from "next/link";

export const HomeButton = () => {
  return (
    <div className="mt-12 text-center">
      <Button
        asChild
        className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <Link href={"/"}>ホームに戻る</Link>
      </Button>
    </div>
  );
};
