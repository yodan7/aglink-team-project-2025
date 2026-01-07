"use client";

import React, { useState, FormEvent } from "react";
import { LucideSprout } from "lucide-react"; // アイコン例として追加
import { login } from "@/lib/database/actions";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ログイン処理のダミーハンドラ
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    console.log("ログイン試行:", { email, password });
    alert(`ようこそ、Aglinkへ！(メールアドレス: ${email})`);
  };

  // 会員登録ページへの遷移ハンドラ
  const handleSignupRedirect = () => {
    alert("会員登録ページへ遷移します。");
  };

  return (
    <>
      {/* Tailwind CSS クラスのみでスタイリング
        bg-[#F0F4EF] : カスタム背景色
        min-h-screen : 画面いっぱいの高さ
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
              className="h-auto w-auto flex " // h-12 removed for auto height adjustment
            />
          </div>

          {/* ログインフォームボックス */}
          <div
            className="bg-white px-[25px] py-[30px] rounded-[15px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] mb-5 opacity-0"
            style={{ animation: "fadeInUp 0.7s ease-out forwards 0.2s" }}
          >
            <h2 className="text-[#38761D] mt-0 mb-5 text-2xl font-bold">
              ログイン
            </h2>

            <form action={login} className="flex flex-col">
              <input
                type="email"
                name="email"
                placeholder="メールアドレス"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-[12px_15px] mb-[15px] border border-[#CCCCCC] rounded-lg text-base text-center outline-none transition-all focus:border-[#6AA84F] focus:ring-4 focus:ring-[#6AA84F]/20"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-[12px_15px] mb-[15px] border border-[#CCCCCC] rounded-lg text-base text-center outline-none transition-all focus:border-[#6AA84F] focus:ring-4 focus:ring-[#6AA84F]/20"
                required
              />

              {/* ログインボタン */}
              <button
                type="submit"
                className="w-full p-3 mt-[15px] rounded-lg text-lg font-bold text-white bg-[#6AA84F] hover:bg-[#4CAF50] transition-colors block opacity-0"
                style={{ animation: "fadeInUp 0.7s ease-out forwards 0.3s" }}
              >
                ログイン
              </button>

              {/* 会員登録ボタン */}
              <Link href="/signup">
                <button
                  type="button"
                  className="w-full p-[10px] mt-[10px] rounded-lg text-lg font-bold bg-transparent border-2 border-[#6AA84F] text-[#38761D] hover:bg-[#E8F5E9] transition-colors opacity-0"
                  style={{ animation: "fadeInUp 0.7s ease-out forwards 0.4s" }}
                >
                  会員登録
                </button>
              </Link>
            </form>

            {/* パスワード忘れリンク */}
            <Link
              href="#"
              className="inline-block mt-5 text-[#666666] text-sm no-underline mb-[10px] hover:text-[#4CAF50] hover:underline opacity-0 transition-colors"
              style={{ animation: "fadeInUp 0.7s ease-out forwards 0.5s" }}
            >
              パスワードを忘れた場合
            </Link>
          </div>
        </div>
      </div>

      {/* アニメーションのキーフレーム定義のみ残しています（Tailwind設定ファイルがない環境のため） */}
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
