'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link'; 
import { useRouter } from 'next/navigation';

// AuthFormの代わりに、サインアップフォームを直接このページに実装します。

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignup = (e: FormEvent) => {
    e.preventDefault(); // フォームのデフォルト動作を停止
    
    const data = { email, password, name };
    console.log('新規登録リクエスト:', data);

    // 実際の登録API呼び出しをここで行う（今回はダミー）
    // 処理が成功したと仮定して...
    
    // 登録成功後、登録完了ページへ遷移
    router.push('/signup/success'); 
  };

  return (
    // auth-page-wrapper, login-container クラスを使用
    <div className="auth-page-wrapper min-h-screen p-5">
      <div className="login-container">
        
        {/* アプリタイトル (app-title クラスを使用) */}
        <h1 className="app-title">🌱 農業診断</h1>

        {/* フォームコンテナ (login-box クラスを使用) */}
        <div className="login-box animate-fadeInUp delay-200">
          <h2>新規アカウント登録</h2>

          {/* フォーム本体 (login-form クラスを使用) */}
          <form onSubmit={handleSignup} className="login-form">
            {/* 名前入力フィールド */}
            <div>
              <input
                type="text"
                placeholder="お名前 (オプション)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field" // input-field クラスを使用
              />
            </div>

            {/* メールアドレス入力フィールド */}
            <div>
              <input
                type="email"
                placeholder="メールアドレス"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field" // input-field クラスを使用
              />
            </div>

            {/* パスワード入力フィールド */}
            <div>
              <input
                type="password"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field" // input-field クラスを使用
              />
            </div>

            {/* サインアップボタン (primary-btn クラスを使用) */}
            <button
              type="submit"
              className="btn primary-btn"
            >
              新規登録
            </button>
          </form>
        </div>

        {/* ログインへのリンク (secondary-btn クラスを使用) */}
        <Link 
          href="/signin" 
          className="btn secondary-btn mt-4 animate-fadeInUp delay-300"
        >
          既にアカウントをお持ちの方はこちら
        </Link>
      </div>
      
      {/* -----------------------------------------------------------
          提供された全てのCSS定義を<style jsx>ブロック内に記述します。
          これにより、このファイルだけでスタイルが完結します。
          ----------------------------------------------------------- */}
      <style jsx global>{`
        /* 1. Tailwind CSSの基本設定 (ここでは省略 - 外部ファイルまたはconfigに依存) */
        /* @tailwind base;
        @tailwind components;
        @tailwind utilities; */

        /* 2. アプリ全体の基本スタイルとテーマ設定 */
        @layer base {
          :root {
            /* カラーパレットの定義 (Tailwindのカスタムカラーとして機能) */
            --background: 0 0% 95%; 
            --foreground: 240 10% 3.9%; 
            --card: 240 10% 100%; 
            --card-foreground: 240 10% 3.9%; 
            --popover: 240 10% 100%;
            --popover-foreground: 240 10% 3.9%;
            --primary: 123 25% 58%; 
            --primary-foreground: 0 0% 100%; 
            --secondary: 217 91% 60%; 
            --secondary-foreground: 0 0% 100%; 
            --muted: 240 5% 96.1%; 
            --muted-foreground: 240 4% 46.1%;
            --aglink-brown: 30 20% 40%; 
            --aglink-brown-dark: 30 20% 25%;
            --accent: 240 5% 96.1%; 
            --accent-foreground: 240 6% 10%;
            --destructive: 0 84.2% 60.2%; 
            --destructive-foreground: 0 0% 100%;
            --border: 240 6% 90%; 
            --input: 240 6% 90%; 
            --ring: 210 70% 55%; 
            --radius: 0.75rem; 
          }

          body {
            /* Tailwindクラスがないため、CSSを直接適用 */
            background-color: hsl(var(--background)); 
            color: hsl(var(--foreground));
            font-feature-settings: "rlig" 1, "calt" 1;
          }

          * {
            border-color: hsl(var(--border));
          }
        }

        /* アニメーションキーフレームの定義 */
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

        .animate-fadeInUp {
          animation: fadeInUp 0.7s ease-out forwards;
          opacity: 0; 
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }

        /* ==================================
          認証画面共通スタイル (login, signup)
          ================================== */
        .auth-page-wrapper {
          display: flex;
          justify-content: center; 
          align-items: center; 
          background-color: #F0F4EF; /* 非常に薄い緑/オフホワイトの背景 */
          padding: 20px;
        }

        .login-container {
          width: 90%;
          max-width: 400px; 
          text-align: center;
        }

        /* アプリタイトル */
        .app-title {
          color: #38761D; /* 濃い緑 */
          margin-bottom: 30px;
          font-size: 40px;
          font-weight: bold; /* 追加: 見た目を元のJSXに合わせる */
        }

        /* フォームとタイトルを囲むボックス */
        .login-box {
          background-color: #FFFFFF;
          padding: 30px 25px;
          border-radius: 15px; 
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }

        .login-box h2 {
          color: #38761D;
          margin-top: 0;
          margin-bottom: 20px;
          font-size: 28px;
        }

        /* 入力フィールド */
        .login-form .input-field {
          width: 100%;
          padding: 12px 15px;
          margin-bottom: 15px;
          border: 1px solid #CCCCCC;
          border-radius: 8px;
          box-sizing: border-box; 
          font-size: 22px;
          text-align: center; 
        }

        /* ボタンの共通スタイル */
        .btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: 24px;
          cursor: pointer;
          text-decoration: none; 
          display: block; 
          margin-top: 15px;
          font-weight: bold;
          transition: background-color 0.3s;
        }

        /* ログインボタン (プライマリ) */
        .primary-btn {
          background-color: #6AA84F; 
          color: white;
        }

        .primary-btn:hover {
          background-color: #4CAF50; 
        }

        /* 会員登録ボタン (セカンダリ) */
        .secondary-btn {
          background-color: transparent; 
          border: 2px solid #6AA84F; 
          color: #38761D; 
          padding: 10px; 
        }

        .secondary-btn:hover {
          background-color: #E8F5E9; 
        }

        /* パスワード忘れリンク (今回は未使用) */
        .forgot-password {
          display: inline-block;
          margin-top: 10px;
          color: #666666;
          font-size: 14px;
          text-decoration: none;
          margin-bottom: 10px;
        }

        .forgot-password:hover {
          text-decoration: underline;
          color: #4CAF50;
        }
        
        /* ==================================
          登録完了画面専用スタイル (今回は未使用)
          ================================== */
        /* ... success-box, success-icon, などの定義 ... */

        /* ==================================
          メインページ共通スタイル (今回は未使用)
          ================================== */
        /* ... main-page-container, page-header, などの定義 ... */

      `}</style>
    </div>
  );
}