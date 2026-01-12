"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignupSuccessPage() {
  const router = useRouter();

  const handleGoToMain = () => {
    router.push("/diagnosis");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50 p-5">
      <div className="w-full max-w-md text-center">
        {/* アプリタイトル */}
        <div
          className="justify-center flex mb-3 opacity-0" // mb-8 -> mb-12 for more spacing below
          style={{ animation: "fadeInUp 0.7s ease-out forwards 0.1s" }}
        >
          <Image
            src="/images/logo-icon/aglink-logo.png"
            alt="Aglink ロゴ - 成長と繋がり"
            width={150} // width increased from 200 to 300
            height={30} // height increased from 60 to 90
            priority
            className="h-auto w-auto" // h-12 removed for auto height adjustment
          />
        </div>

        {/* 成功メッセージボックス */}
        <div className="bg-white p-8 rounded-xl shadow-md mb-6">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-700 mb-2">
            ご登録ありがとうございます！
          </h2>
          <p className="text-gray-700 mb-1">
            これで、すべての機能をご利用いただけます。
          </p>
          <p className="text-gray-700 mb-4">
            早速、あなたの農園を診断してみましょう！
          </p>

          {/* メイン画面へ進むボタン */}
          <button
            onClick={handleGoToMain}
            className="w-full py-3 px-4 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 mb-3"
          >
            さっそく診断を始める
          </button>

          {/* マイページへのリンク */}
          <Link
            href="/mypage"
            className="w-full py-3 px-4 rounded-lg border-2 border-green-500 text-green-700 font-bold hover:bg-green-100 block"
          >
            マイページへ移動
          </Link>
        </div>
      </div>
    </div>
  );
}
