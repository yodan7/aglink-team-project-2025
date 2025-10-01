'use client'; 

import React from 'react';
import Link from 'next/link';

// ドメインコンポーネント (後で再利用するブックマークリスト)
// 実際にはAPIから取得したデータを表示するリストコンポーネントを使用します
const DummyBookmarkList = () => (
  <div className="bookmark-list-container">
    <div className="bookmark-list-header">
      <span className="bookmark-icon">🏆</span>
      <h2 className="bookmark-title">ブックマーク</h2>
    </div>
    
    <div className="bookmark-card">
      <div className="card-thumb"></div>
      <div className="card-content">
        <p className="card-line"></p>
        <p className="card-line short"></p>
      </div>
    </div>
    
    <div className="bookmark-card">
      <div className="card-thumb"></div>
      <div className="card-content">
        <p className="card-line"></p>
        <p className="card-line short"></p>
      </div>
    </div>
    
    <Link href="/bookmarks" className="all-bookmarks-link">
      ブックマーク一覧へ
    </Link>
  </div>
);


/**
 * ログイン後のメイン機能のトップページ
 */
export default function MainPage() {
  
  // ユーザー名やログイン状態は useAuth フックなどで取得することを想定
  const userName = "森 大輔"; // ダミーデータ

  return (
    <div className="main-page-container">
      
      {/* 画面上部の挨拶と検索エリア */}
      <header className="page-header">
        <h1 className="welcome-message">ようこそ、{userName}さん！</h1>
        <Link href="/search" className="search-icon-wrapper" aria-label="検索">
          <svg className="search-icon" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </Link>
      </header>

      {/* イラストエリア */}
      <div className="illustration-area">
        {/* 画像の代替として、文字ベースの表現 */}
        <div className="illustration-placeholder">
          {/* 画像のイラストをイメージ */}
          <p className="illustration-text">👩‍🌾 🚜 🐔 🐄 🌾</p>
        </div>
      </div>
      
      {/* アクションボタン群 */}
      <div className="action-buttons-container">
        {/* 診断をはじめるボタン (メインアクション) */}
        <Link href="/diagnosis" className="btn primary-action-btn">
          診断をはじめる
        </Link>
        
        {/* 履歴ボタン (サブアクション) */}
        <Link href="/diagnosis/history" className="btn secondary-action-btn">
          履歴
        </Link>
      </div>

      {/* ブックマーク/お気に入りセクション */}
      <section className="bookmark-section">
        <DummyBookmarkList />
      </section>

    </div>
  );
}
