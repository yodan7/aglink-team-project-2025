"use client";

import React, { useState, FormEvent } from "react";
import { signup } from "@/lib/database/actions";
import Link from "next/link";
import Image from "next/image";
// Next.js固有の機能（Link, useRouter）は、このプレビュー環境では
// 動作しないため、標準的なHTML要素とアラートで代用します。

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // const handleSignup = (e: FormEvent) => {
  //   e.preventDefault();
  //   const data = { email, password, name };
  //   console.log('新規登録リクエスト:', data);

  //   // 実際のアプリではルーターで遷移しますが、ここではアラートで代用
  //   alert('登録処理が完了しました。登録完了ページへ遷移します。');
  // };

  // const handleSigninRedirect = (e: React.MouseEvent<HTMLAnchorElement>) => {
  //   e.preventDefault();
  //   alert('ログインページへ遷移します。');
  // };

  return (
    <>
      {/* Tailwind CSS クラスのみで構成
        bg-[#F0F4EF] : 背景色
        min-h-screen : 画面の高さ確保
      */}
      <div className="min-h-screen flex items-center justify-center bg-[#F0F4EF] p-5 font-sans">
        <div className="w-[90%] max-w-[400px] text-center">
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

          {/* フォームコンテナ */}
          <div
            className="bg-white px-[25px] py-[30px] rounded-[15px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] mb-5 opacity-0"
            style={{ animation: "fadeInUp 0.7s ease-out forwards 0.2s" }}
          >
            <h2 className="text-[#38761D] mt-0 mb-5 text-[28px] font-bold">
              新規アカウント登録
            </h2>

            <form action={signup} className="flex flex-col">
              {/* 名前入力フィールド */}
              <div className="mb-[15px]">
                <input
                  type="text"
                  name="name"
                  placeholder="お名前 (オプション)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-[12px_15px] border border-[#CCCCCC] rounded-lg text-[22px] text-center outline-none transition-all focus:border-[#6AA84F] focus:ring-4 focus:ring-[#6AA84F]/20"
                />
              </div>

              {/* メールアドレス入力フィールド */}
              <div className="mb-[15px]">
                <input
                  type="email"
                  name="email"
                  placeholder="メールアドレス"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-[12px_15px] border border-[#CCCCCC] rounded-lg text-[22px] text-center outline-none transition-all focus:border-[#6AA84F] focus:ring-4 focus:ring-[#6AA84F]/20"
                />
              </div>

              {/* パスワード入力フィールド */}
              <div className="mb-[15px]">
                <input
                  type="password"
                  name="password"
                  placeholder="パスワード"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-[12px_15px] border border-[#CCCCCC] rounded-lg text-[22px] text-center outline-none transition-all focus:border-[#6AA84F] focus:ring-4 focus:ring-[#6AA84F]/20"
                />
              </div>

              {/* サインアップボタン */}
              <button
                type="submit"
                className="w-full p-3 mt-[15px] rounded-lg text-2xl font-bold text-white bg-[#6AA84F] hover:bg-[#4CAF50] transition-colors block"
              >
                新規登録
              </button>
            </form>
          </div>

          {/* ログインへのリンク (Next.jsのLinkではなくaタグを使用) */}
          <Link
            href="/signin"
            className="w-full p-[10px] mt-4 rounded-lg text-base font-bold bg-transparent border-2 border-[#6AA84F] text-[#38761D] hover:bg-[#E8F5E9] transition-colors block opacity-0 text-decoration-none cursor-pointer"
            style={{ animation: "fadeInUp 0.7s ease-out forwards 0.3s" }}
          >
            既にアカウントをお持ちの方はこちら
          </Link>
        </div>
      </div>

      {/* アニメーション定義のみ残す */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
