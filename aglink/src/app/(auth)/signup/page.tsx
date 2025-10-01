'use client';

import React from 'react';
import AuthForm from '@/components/domain/auth/AuthForm'; 
import Link from 'next/link'; 
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = (data: { email: string; password: string; name?: string }) => {
    console.log('新規登録リクエスト:', data);
    
    // 実際の登録API呼び出しをここで行う
    
    // 処理が成功したと仮定して...
    
    // ❌ この alert() が画面遷移をブロックしていました！これを削除またはコメントアウトします。
    // alert(`新規登録: ${data.name} 様、登録成功！`); 

    // ✅ 登録成功後、すぐに登録完了ページへ遷移
    router.push('/signup/success'); 
  };

  return (
    <div className="auth-page-wrapper"> 
      <div className="login-container">
        
        <h1 className="app-title">🌱 農業診断</h1>

        <AuthForm 
          formType="signup" 
          onAuthenticate={handleSignup}
        />

        <Link href="/login" className="btn secondary-btn">
          既にアカウントをお持ちの方はこちら
        </Link>
      </div>
    </div>
  );
}