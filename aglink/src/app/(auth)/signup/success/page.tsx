'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupSuccessPage() {
  const router = useRouter();

  const handleGoToMain = () => {
    router.push('/diagnosis'); 
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50 p-5">
      <div className="w-full max-w-md text-center">
        {/* アプリタイトル */}
        <h1 className="text-3xl font-bold text-green-700 mb-8">🎉 農業診断</h1>

        {/* 成功メッセージボックス */}
        <div className="bg-white p-8 rounded-xl shadow-md mb-6">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-700 mb-2">ご登録ありがとうございます！</h2>
          <p className="text-gray-700 mb-1">これで、すべての機能をご利用いただけます。</p>
          <p className="text-gray-700 mb-4">早速、あなたの農園を診断してみましょう！</p>

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
