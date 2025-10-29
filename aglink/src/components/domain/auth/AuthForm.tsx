'use client'; 

import React, { useState } from 'react';

type AuthFormProps = {
  formType: 'login' | 'signup';
  // 登録時とログイン時で引数が異なる場合を想定
  onAuthenticate: (data: { 
    email: string; 
    password: string; 
    name?: string; // 登録時のみ使用
  }) => void;
};

const AuthForm: React.FC<AuthFormProps> = ({ formType, onAuthenticate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isLogin = formType === 'login';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 登録時のパスワード一致チェック
    if (!isLogin && password !== confirmPassword) {
      alert('パスワードが一致しません。');
      return;
    }

    onAuthenticate({ 
      email, 
      password, 
      name: isLogin ? undefined : name // ログイン時は名前は不要
    });
  };

  return (
    <div className="login-box">
      <h2>{isLogin ? 'ログイン' : '新規会員登録'}</h2>

      <form onSubmit={handleSubmit} className="login-form">
        
        {/* 会員登録時のみ「お名前」フィールドを表示 */}
        {!isLogin && (
          <input
            type="text"
            placeholder="お名前 (例: 山田 太郎)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field"
          />
        )}

        <input
          type="email" // ログイン/登録ともにメールアドレスは必須
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-field"
        />
        
        {/* 会員登録時のみ「パスワード確認」フィールドを表示 */}
        {!isLogin && (
          <input
            type="password"
            placeholder="パスワード（確認用）"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input-field"
          />
        )}


        {/* メインボタン */}
        <button type="submit" className="btn primary-btn">
          {isLogin ? 'ログイン' : '登録を完了する'}
        </button>
      </form>

      {/* パスワード忘れリンクはログイン時のみ表示 (変更なし) */}
      {isLogin && (
        <a href="/forgot-password" className="forgot-password">
          パスワードをお忘れですか？
        </a>
      )}
    </div>
  );
};

export default AuthForm;