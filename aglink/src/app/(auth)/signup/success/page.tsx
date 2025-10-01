'use client'; // router.pushを使用するためクライアントコンポーネントとします

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Next.jsのルーターを使用

/**
 * 新規登録完了ページのコンポーネント
 */
export default function SignupSuccessPage() {
  const router = useRouter();

  // メイン画面（例: トップページやマイページ）への遷移処理
  const handleGoToMain = () => {
    // ユーザーは登録済みなので、メインの診断ページやマイページへ誘導します
    router.push('/diagnosis'); 
  };

  return (
    // これまでの認証画面と同じCSSクラスを使用
    <div className="auth-page-wrapper"> 
      <div className="login-container">
        
        {/* アプリのロゴ/タイトル */}
        <h1 className="app-title">🎉 農業診断</h1>

        <div className="login-box success-box">
          
          {/* 完了アイコンとメッセージ */}
          <div className="success-icon">✅</div>
          <h2>ご登録ありがとうございます！</h2>
          <p>これで、すべての機能をご利用いただけます。</p>
          <p>早速、あなたの農園を診断してみましょう！</p>

          {/* メイン画面へ進むボタン (メインアクション) */}
          <button 
            onClick={handleGoToMain} 
            className="btn primary-btn" 
            style={{ marginTop: '30px' }} // 見た目を調整
          >
            さっそく診断を始める
          </button>
        </div>

        {/* 必要であれば、マイページへのリンクなどを配置 */}
        <Link href="/mypage" className="btn secondary-btn">
          マイページへ移動
        </Link>
      </div>
    </div>
  );
}