"use client";
// Login.tsx
import React from 'react';

export default function Login() {
  return (
    <>
      <div className="auth-page-wrapper">
        <div className="login-container">
          {/* アプリタイトル */}
          <h1 className="app-title animate-fadeInUp delay-100">Aglink</h1>

          {/* ログインフォームボックス */}
          <div className="login-box animate-fadeInUp delay-200">
            <h2>ログイン</h2>

            <form className="login-form">
              <input
                type="text"
                placeholder="メールアドレス"
                className="input-field"
              />
              <input
                type="password"
                placeholder="パスワード"
                className="input-field"
              />
              <button
                type="submit"
                className="btn primary-btn animate-fadeInUp delay-300"
              >
                ログイン
              </button>
              <button
                type="button"
                className="btn secondary-btn animate-fadeInUp delay-400"
              >
                会員登録
              </button>
            </form>

            <a
              href="#"
              className="forgot-password animate-fadeInUp delay-500"
            >
              パスワードを忘れた場合
            </a>
          </div>
        </div>
      </div>

      {/* ================================================================================
          インラインCSS（page.tsxで完結させるため）
          ================================================================================ */}
      <style jsx global>{`
        /* 1. Tailwind CSSの基本設定 (必須) - @layer base に含まれない部分のみ
          @tailwind base;
          @tailwind components;
          @tailwind utilities; 
        */

        /* ================================================================================
          2. アプリ全体の基本スタイルとテーマ設定
          ================================================================================ */
        :root {
          /* カラーパレットの定義 */
          --background: 0 0% 95%; /* 背景色 (stone-100) */
          --foreground: 240 10% 3.9%; /* 文字色 (黒に近いグレー) */

          --card: 240 10% 100%; /* カードの背景色 (白) */
          --card-foreground: 240 10% 3.9%;

          --popover: 240 10% 100%;
          --popover-foreground: 240 10% 3.9%;

          /* Aglinkのテーマカラー */
          --primary: 123 25% 58%; /* メインカラー (/sampleページの緑) */
          --primary-foreground: 0 0% 100%; /* 緑の上の白い文字色 */

          --secondary: 217 91% 60%; /* サブカラー (/sampleページの青) */
          --secondary-foreground: 0 0% 100%; /* 青の上の白い文字色 */

          --muted: 240 5% 96.1%; /* 控えめな要素の色 (薄いグレー) */
          --muted-foreground: 240 4% 46.1%;

          /* ★ 追加: Aglinkの茶色 (土の色) を専用で追加 */
          --aglink-brown: 30 20% 40%;
          --aglink-brown-dark: 30 20% 25%;

          --accent: 240 5% 96.1%; /* アクセントカラー */
          --accent-foreground: 240 6% 10%;

          --destructive: 0 84.2% 60.2%; /* 警告色 (赤) */
          --destructive-foreground: 0 0% 100%;

          /* UI要素の色 */
          --border: 240 6% 90%; /* ボーダー色 */
          --input: 240 6% 90%; /* 入力欄のボーダー色 */
          --ring: 210 70% 55%; /* フォーカス時のリング色 (青) */

          --radius: 0.75rem; /* 角の丸み (少し大きめにして柔らかい印象に) */
        }

        body {
          /* @apply bg-background text-foreground; の代わりに直接指定 */
          background-color: hsl(var(--background));
          color: hsl(var(--foreground));
          font-feature-settings: "rlig" 1, "calt" 1;
        }

        * {
          /* @apply border-border; の代わりに直接指定 */
          border-color: hsl(var(--border));
        }

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
          opacity: 0; /* 初期状態を非表示にする */
        }

        /* 遅延アニメーションのためのユーティリティ */
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

      <style jsx>{`
        /* ==================================
          認証画面共通スタイル (login, signup)
          ================================== */
        .auth-page-wrapper {
          /* 画面全体の中央揃えを実現 */
          display: flex;
          justify-content: center; /* 水平方向の中央 */
          align-items: center;     /* 垂直方向の中央 */
          min-height: 100vh;       /* 画面の高さいっぱい */
          background-color: #F0F4EF; /* 非常に薄い緑/オフホワイトの背景 */
          padding: 20px;
        }

        .login-container {
          width: 90%;
          max-width: 400px; /* PC/タブレットでの最大幅を制限 */
          text-align: center;
        }

        /* アプリタイトル */
        .app-title {
          color: #38761D; /* 濃い緑 */
          margin-bottom: 30px;
          font-size: 3.0rem; /* 3xl に相当 */
          font-weight: 700; /* bold に相当 */
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
          font-size: 2rem; /* 2xl に相当 */
          font-weight: 700; /* bold に相当 */
        }

        /* 入力フィールド */
        .login-form .input-field {
          width: 100%;
          padding: 12px 15px;
          margin-bottom: 15px;
          border: 1px solid #CCCCCC;
          border-radius: 8px;
          box-sizing: border-box;
          font-size: 1.5rem; /* lg に相当 */
          text-align: center; /* 入力テキストも中央揃えに */
          outline: none;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .login-form .input-field:focus {
          border-color: #6AA84F;
          box-shadow: 0 0 0 3px rgba(106, 168, 79, 0.2);
        }

        /* ボタンの共通スタイル */
        .btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: 1rem; /* lg に相当 */
          cursor: pointer;
          text-decoration: none;
          display: block;
          margin-top: 15px;
          font-weight: bold;
          transition: background-color 0.3s, border-color 0.3s, color 0.3s;
        }

        /* ログインボタン (プライマリ) */
        .primary-btn {
          background-color: #6AA84F; /* 明るい緑 */
          color: white;
          margin-bottom: 10px; /* 次のボタンとの間に少しスペースを空ける */
        }

        .primary-btn:hover {
          background-color: #4CAF50; /* ホバーで少し濃く */
        }

        /* 会員登録ボタン (セカンダリ) */
        .secondary-btn {
          background-color: transparent;
          border: 2px solid #6AA84F;
          color: #38761D;
          padding: 10px; /* 2pxのボーダーを考慮して上下を調整 */
          margin-top: 0; /* 上のボタンとのスペースは primary-btn の mb で調整 */
        }

        .secondary-btn:hover {
          background-color: #E8F5E9;
        }

        /* パスワード忘れリンク */
        .forgot-password {
          display: inline-block;
          margin-top: 15px; /* ボタンとのスペースを確保 */
          color: #666666;
          font-size: 1rem; /* sm に相当 */
          text-decoration: none;
          margin-bottom: 0;
        }

        .forgot-password:hover {
          text-decoration: underline;
          color: #4CAF50;
        }
      `}</style>
    </>
  );
}