"use client";

import React, { useState, FormEvent } from 'react';

// Login.tsx
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // ログイン処理のダミーハンドラ
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // ここに実際の認証ロジックを実装します
    console.log('ログイン試行:', { email, password });
    
    // 成功したと仮定してメッセージを表示
    alert(`ようこそ、Aglinkへ！(メールアドレス: ${email})`);
    
    // 実際のアプリケーションでは、ここでホーム画面などにリダイレクトします
    // 例: router.push('/dashboard');
  };

  // 会員登録ページへの遷移ハンドラ (今回はダミー)
  const handleSignupRedirect = () => {
    alert('会員登録ページへ遷移します。');
    // 実際のアプリケーションでは、ルーターを使って遷移
    // 例: router.push('/signup');
  };

  return (
    <>
      <div className="auth-page-wrapper">
        <div className="login-container">
          
          {/* アプリタイトル - CSSでアニメーションを適用 */}
          <h1 className="app-title">Aglink</h1>

          {/* ログインフォームボックス - CSSでアニメーションを適用 */}
          <div className="login-box">
            <h2>ログイン</h2>

            <form className="login-form" onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="メールアドレス"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
              />
              <input
                type="password"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
              />
              
              {/* ログインボタン - CSSでアニメーションを適用 */}
              <button
                type="submit"
                className="btn primary-btn"
              >
                ログイン
              </button>
              
              {/* 会員登録ボタン - CSSでアニメーションを適用 */}
              <button
                type="button"
                className="btn secondary-btn"
                onClick={handleSignupRedirect}
              >
                会員登録
              </button>
            </form>

            {/* パスワード忘れリンク - CSSでアニメーションを適用 */}
            <a
              href="#"
              className="forgot-password"
            >
              パスワードを忘れた場合
            </a>
          </div>
        </div>
      </div>

      {/* ================================================================================
          インラインCSS（このファイルで完結させるための全スタイル定義）
          ================================================================================ */}
      <style jsx global>{`
        /* --------------------------------------------------------
           グローバルスタイル/変数定義 (@layer base に相当)
           -------------------------------------------------------- */
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
          background-color: #F0F4EF; /* 認証画面の背景色を直接適用 */
          color: hsl(var(--foreground));
          font-feature-settings: "rlig" 1, "calt" 1;
        }

        * {
          border-color: hsl(var(--border));
        }

        /* --------------------------------------------------------
           アニメーションキーフレーム
           -------------------------------------------------------- */
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

        /* --------------------------------------------------------
           認証画面共通スタイル
           -------------------------------------------------------- */
        .auth-page-wrapper {
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
          font-size: 40px;
          font-weight: bold;
          opacity: 0; /* アニメーションの初期状態 */
          animation: fadeInUp 0.7s ease-out forwards 0.1s; /* delay-100 適用 */
        }

        /* フォームとタイトルを囲むボックス */
        .login-box {
          background-color: #FFFFFF;
          padding: 30px 25px;
          border-radius: 15px; 
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
          opacity: 0; /* アニメーションの初期状態 */
          animation: fadeInUp 0.7s ease-out forwards 0.2s; /* delay-200 適用 */
        }

        .login-box h2 {
          color: #38761D;
          margin-top: 0;
          margin-bottom: 20px;
          font-size: 24px;
        }

        /* 入力フィールド */
        .login-form .input-field {
          width: 100%;
          padding: 12px 15px;
          margin-bottom: 15px;
          border: 1px solid #CCCCCC;
          border-radius: 8px;
          box-sizing: border-box; 
          font-size: 16px;
          text-align: center; 
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
          font-size: 18px;
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
          opacity: 0; /* アニメーションの初期状態 */
          animation: fadeInUp 0.7s ease-out forwards 0.3s; /* delay-300 適用 */
        }

        .primary-btn:hover {
          background-color: #4CAF50; /* ホバーで少し濃く */
        }

        /* 会員登録ボタン (セカンダリ) */
        .secondary-btn {
          background-color: transparent; 
          border: 2px solid #6AA84F; 
          color: #38761D; 
          padding: 10px; 
          margin-top: 10px;
          opacity: 0; /* アニメーションの初期状態 */
          animation: fadeInUp 0.7s ease-out forwards 0.4s; /* delay-400 適用 */
        }

        .secondary-btn:hover {
          background-color: #E8F5E9; 
        }

        /* パスワード忘れリンク */
        .forgot-password {
          display: inline-block;
          margin-top: 20px;
          color: #666666;
          font-size: 14px;
          text-decoration: none;
          margin-bottom: 10px;
          opacity: 0; /* アニメーションの初期状態 */
          animation: fadeInUp 0.7s ease-out forwards 0.5s; /* delay-500 適用 */
        }

        .forgot-password:hover {
          text-decoration: underline;
          color: #4CAF50;
        }

        /* --------------------------------------------------------
           未使用だが提供されたスタイル（Login.tsxでは使用しない）
           -------------------------------------------------------- */
        .success-box { padding-bottom: 40px; }
        .success-icon { font-size: 5rem; margin-bottom: 15px; line-height: 1; }
        .success-box h2 { color: #38761D; margin-top: 0; margin-bottom: 10px; font-size: 26px; }
        .success-box p { color: #555555; margin-bottom: 5px; }
        .main-page-container { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #F0F4EF; min-height: 100vh; padding: 20px; max-width: 600px; margin: 0 auto; box-sizing: border-box; }
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .welcome-message { color: #38761D; font-size: 20px; font-weight: bold; }
        /* ... その他メインページ用のスタイルは省略 ... */
      `}</style>
    </>
  );
}