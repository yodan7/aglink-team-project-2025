'use client'; 

import React from 'react';
import AuthForm from '@/components/domain/auth/AuthForm'; 
import Link from 'next/link'; 
import { useRouter } from 'next/navigation'; // 👈 useRouterをインポート

export default function LoginPage() {
  const router = useRouter(); // 👈 useRouterフックを呼び出し

  // 認証処理を定義
  const handleLogin = (data: { email: string; password: string }) => { 
    console.log('認証リクエスト:', data);
    
    // 実際のログインAPI呼び出しをここで行う
    
    // 処理が成功したと仮定して...
    
    // ❌ この alert() が画面遷移をブロックしていました！これを削除またはコメントアウトします。
    // alert(`ログイン試行中: ${data.email}`); 
    
    // ✅ ログイン成功後、メインの診断ページへ遷移
    router.push('/diagnosis'); 
  };

  return (
    <div className="auth-page-wrapper"> 
      <div className="login-container">
        
        <h1 className="app-title">🌾 農業診断</h1>

        <AuthForm 
          formType="login" 
          onAuthenticate={handleLogin} 
        />

        <Link href="/signup" className="btn secondary-btn">
          新規会員登録はこちら
        </Link>
      </div>
    </div>
  );
}