'use client'; 

import React, { useState } from 'react';

// --- 1. ダミーデータ定義 (変更なし) ---------------------------------------
const FARM_DETAIL_DATA = {
    title: "【栗拾いとサツマイモ掘りプラン】ファミリー・グループにお勧め♪",
    harvest: {
        item: "栗拾い",
        period: "9月7日～10月13日 (予定)",
        sale: "収穫した栗は1kg500円で販売いたします。",
        service: "ゆで栗試食サービス付きです。",
    },
    sweetPotato: {
        item: "サツマイモ掘り",
        period: "10月11日～11月30日 (予定)",
        type: "種類は紅はるか",
        sale: "収穫したサツマイモは1kg500円で販売いたします。（3本～4本程度）",
        service: "焼き芋サービス付き",
    },
    others: [
        { title: "その他の野菜", content: "キューイフルーツ、かぼちゃ、空心菜などが収穫できます。延滞のため、極端に野菜の数が減っています。ご承ください。" },
        { title: "動物とのふれあい", content: "烏骨鶏、岡崎黄斑、アローカナなどの卵採取ができます。卵1個200円で販売しています。仔ヤギにえさやり体験ができます。" },
        { title: "【薪割、焚火体験】", content: "希望者には薪割、火気を使わない着火、焚火体験などができます。" },
        { title: "【虫取り歓迎】", content: "有機無農薬農園のためバッタ、トンボなどの虫がたくさんいます。網と虫かごを持参して、広い農園で虫取りを楽しんでください。" },
    ],
    summary: {
        period: "2025年09月02日～2026年01月31日",
        duration: "1時間30分",
        included: "入園料込み",
        capacity: "1人～30人",
    },
    price: 3500, // 1人あたりの料金（円）
};

// --- 4. スタイル ------------------------------------------
const BASE_BG_COLOR = '#F0F6E8'; // 指定の淡いグリーン
const HIGHLIGHT_BG_COLOR = '#e8f5e9'; // サマリーテーブル用 (わずかに異なる淡いグリーン)

const styles: { [key: string]: React.CSSProperties } = {
  // ページ全体を覆うラッパーのスタイル
  pageWrapper: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: BASE_BG_COLOR, // ページ全体の背景
  },
  // 左側の画像エリアのスタイル
  imageArea: {
    flex: '0 0 400px', // 幅を固定
    height: '100vh',
    position: 'sticky', // スクロールしても固定
    top: 0,
    padding: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A2C498', // 画像エリアの背景をソフトオリーブに
    overflow: 'hidden',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  // 右側のコンテンツエリアのスタイル
  contentArea: {
    flex: 1, // 残りのスペースを全て使用
    padding: '40px',
    backgroundColor: BASE_BG_COLOR,
    color: '#333333',
    minWidth: '600px', // コンテンツの最小幅を確保
  },
  container: {
    // 従来のコンテナスタイルをコンテンツエリアに合わせて調整
    maxWidth: '100%', 
    margin: '0', 
    padding: '0', 
    border: 'none',
    borderRadius: '0',
    boxShadow: 'none',
    backgroundColor: BASE_BG_COLOR,
  },
  // ... (その他のスタイル定義は前回と同じ) ...
    title: {
      fontSize: '28px',
      borderBottom: '3px solid #6A905E',
      paddingBottom: '10px',
      marginBottom: '20px',
      color: '#333333',
    },
    subtitle: {
      fontSize: '16px',
      color: '#6A905E',
      marginBottom: '10px',
      fontWeight: 'bold',
    },
    detailBox: {
      backgroundColor: BASE_BG_COLOR,
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '30px',
      border: '1px solid #A2C498',
    },
    summaryTable: {
        marginTop: '20px',
        padding: '15px',
        backgroundColor: HIGHLIGHT_BG_COLOR,
        borderRadius: '4px',
        borderLeft: '4px solid #A2C498',
        fontSize: '14px',
    },
    form: {
      padding: '20px',
      border: '1px solid #A2C498',
      borderRadius: '8px',
      backgroundColor: BASE_BG_COLOR,
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #A2C498',
      borderRadius: '4px',
      boxSizing: 'border-box',
      fontSize: '16px',
      backgroundColor: BASE_BG_COLOR,
    },
    submitButton: {
      width: '100%',
      padding: '15px',
      backgroundColor: '#6A905E',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '18px',
      fontWeight: 'bold',
      marginTop: '20px',
      transition: 'background-color 0.3s',
    },
    confirmationBox: {
        textAlign: 'center',
        padding: '40px',
        backgroundColor: HIGHLIGHT_BG_COLOR,
        borderRadius: '8px',
        border: '2px solid #6A905E',
    },
    // ...その他のスタイル...
};


// --- 2. コンポーネント定義 --------------------------------------
export default function FarmApplicationPage({ params }: { params: { id: string } }) {
    const farmId = params.id;
    const farm = FARM_DETAIL_DATA;

    const [formData, setFormData] = useState({
        name: '',
        participants: 1,
        date: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    // ... (ロジックは変更なし) ...
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("フォーム送信データ:", formData);
        setIsSubmitted(true);
    };

    // 送信完了画面 (省略)
    if (isSubmitted) {
        return (
            <div style={{ ...styles.pageWrapper, justifyContent: 'center', alignItems: 'center' }}>
                <div style={styles.confirmationBox}>
                    <h2>✅ 申し込みが完了しました！</h2>
                    <p>「{farm.title}」の体験申し込みを受け付けました。ご登録のメールアドレスに詳細をお送りします。</p>
                    <div style={{...styles.details, margin: '20px auto'}}>
                        <p><strong>体験日:</strong> {formData.date}</p>
                        <p><strong>参加人数:</strong> {formData.participants} 名</p>
                    </div>
                    <button style={styles.backButton} onClick={() => setIsSubmitted(false)}>
                        続けて申し込みをする
                    </button>
                </div>
            </div>
        );
    }

    // メインのレンダリング
    return (
        <div style={styles.pageWrapper}>
            {/* ⚠️ 修正: HTML/Bodyの背景とスクロールバーのトラックを強制的に指定色に統一 */}
            <style jsx global>{`
              html, body {
                background-color: ${BASE_BG_COLOR} !important; /* ページ全体の背景を強制的に統一 */
                margin: 0;
                padding: 0;
                width: 100%;
                min-height: 100vh;
              }
              ::-webkit-scrollbar {
                width: 8px;
                height: 8px;
              }
              ::-webkit-scrollbar-track {
                background: ${BASE_BG_COLOR} !important; /* スクロールバーのトラックの背景を統一 */
                border-radius: 4px;
              }
              ::-webkit-scrollbar-thumb {
                background: #A2C498;
                border-radius: 4px;
              }
              ::-webkit-scrollbar-thumb:hover {
                background: #6A905E;
              }
            `}</style>

            {/* --- 左側: 画像エリア (余白の代わりに画像を配置) --- */}
            <div style={styles.imageArea}>
                <img 
                    src="/images/agli-types/ACHO-type.png" 
                    alt="農業体験のイメージ画像" 
                    style={styles.image}
                />
            </div>
            
            {/* --- 右側: コンテンツ (申し込みページ) --- */}
            <div style={styles.contentArea}>
                <div className="container" style={styles.container}>
                    <h1 style={styles.title}>
                        農場ID: {farmId} 体験申し込み
                    </h1>
                    <p style={styles.subtitle}>
                        体験プラン詳細情報
                    </p>

                    {/* --- 詳細情報表示エリア --- */}
                    <div style={styles.detailBox}>
                        <h2 style={{...styles.detailTitle, marginTop: 0}}>{farm.title}</h2>

                        {/* 栗拾い */}
                        <h3 style={styles.subHeading}>【栗拾い】</h3>
                        <ul style={styles.ul}>
                            <li>期間 {farm.harvest.period}</li>
                            <li>{farm.harvest.sale}</li>
                            <li>{farm.harvest.service}</li>
                        </ul>
                        
                        {/* サツマイモ掘り */}
                        <h3 style={styles.subHeading}>【サツマイモ掘り】</h3>
                        <ul style={styles.ul}>
                            <li>期間 {farm.sweetPotato.period}</li>
                            <li>種類は{farm.sweetPotato.type}</li>
                            <li>{farm.sweetPotato.sale}</li>
                            <li>{farm.sweetPotato.service}</li>
                        </ul>
                        
                        {/* その他 */}
                        {farm.others.map((item, index) => (
                            <div key={index} style={{ marginBottom: '10px' }}>
                                <h3 style={styles.subHeading}>{item.title}</h3>
                                <p style={styles.p}>{item.content}</p>
                            </div>
                        ))}

                        {/* 概要テーブル */}
                        <div style={styles.summaryTable}>
                            <p><strong>開催期間</strong>: <span>{farm.summary.period}</span></p>
                            <p><strong>所要時間</strong>: <span>{farm.summary.duration}</span></p>
                            <p><strong>料金に含まれるもの</strong>: <span>{farm.summary.included}</span></p>
                            <p><strong>1予約あたりの予約可能人数</strong>: <span>{farm.summary.capacity}</span></p>
                        </div>
                    </div>

                    {/* 申し込みフォームエリア */}
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <h2 style={{...styles.formTitle, marginTop: 0}}>申し込みフォーム</h2>
                        
                        <div style={styles.formGroup}>
                            <label htmlFor="date" style={styles.label}>希望体験日</label>
                            <input 
                                type="date" 
                                id="date"
                                name="date"
                                required
                                value={formData.date}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="participants" style={styles.label}>参加人数</label>
                            <input 
                                type="number" 
                                id="participants"
                                name="participants"
                                required
                                min="1"
                                value={formData.participants}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label htmlFor="name" style={styles.label}>代表者氏名</label>
                            <input 
                                type="text" 
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="ログインユーザー名"
                            />
                        </div>

                        <button type="submit" style={styles.submitButton}>
                            申し込みを確定する ({farm.price * formData.participants} 円)
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}