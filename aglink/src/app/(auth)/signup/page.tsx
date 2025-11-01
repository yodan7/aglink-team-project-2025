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
    
    // 登録成功後、登録完了ページへ遷移
    router.push('/signup/success'); 
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50 p-5">
      <div className="w-full max-w-md text-center">
        
        {/* アプリタイトル */}
        <h1 className="text-3xl font-bold text-green-700 mb-8">🌱 農業診断</h1>

        {/* AuthForm コンポーネント */}
        <AuthForm 
          formType="signup" 
          onAuthenticate={handleSignup}
        />

        {/* ログインへのリンク */}
        <Link 
          href="/login" 
          className="w-full py-3 px-4 rounded-lg border-2 border-green-500 text-green-700 font-bold hover:bg-green-100 block mt-4"
        >
          既にアカウントをお持ちの方はこちら
        </Link>
      </div>
    </div>
  );
}
