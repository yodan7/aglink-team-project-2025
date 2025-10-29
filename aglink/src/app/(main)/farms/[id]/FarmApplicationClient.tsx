// src/app/farm/[id]/FarmApplicationClient.tsx (Client Component)

'use client'; 

import React, { useState } from 'react';
// ⚠️ Card, Button コンポーネントのインポートパスを修正してください
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// --- データの再定義 ---
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
        type: "紅はるか",
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

// フォームデータの型を定義
interface FormData {
    name: string;
    participants: number;
    date: string;
}

interface FarmApplicationClientProps {
    farmId: string; // page.tsx から props として受け取る
}

// Client Component: asyncではない同期関数として定義
export default function FarmApplicationClient({ farmId }: FarmApplicationClientProps) {
    
    const farm = FARM_DETAIL_DATA;

    // 状態管理
    const [formData, setFormData] = useState<FormData>({
        name: '',
        participants: 1,
        date: '',
    });
    const [submittedData, setSubmittedData] = useState<FormData | null>(null);

    // フォーム入力ハンドラ
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value) : value,
        }));
    };

    // フォーム送信ハンドラ
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.participants < 1 || formData.date === '' || formData.name === '') {
            alert("日付、参加人数、お名前を正しく入力してください。");
            return;
        }
        console.log(`農場ID: ${farmId} へのフォーム送信データ:`, formData);
        setSubmittedData(formData);
    };

    // 完了メッセージからフォームに戻るためのリセットハンドラ
    const handleReset = () => {
        setSubmittedData(null);
    };


    // --- 3. レンダーロジック ---

    // 申し込み完了画面
    if (submittedData) {
        return (
            <div className="min-h-screen bg-background flex justify-center items-center p-4">
                <Card className="max-w-xl shadow-xl p-8 bg-card border-primary/30">
                    <CardHeader className="p-0 mb-6 border-b pb-4">
                        <CardTitle className="text-3xl text-primary text-center">
                            ✅ 申し込みが完了しました！
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 text-center">
                        <p className="text-lg mb-4">
                            「<strong className="font-semibold">{farm.title}</strong>」の体験申し込みを受け付けました。
                            ご登録のメールアドレスに詳細をお送りします。
                        </p>
                        <div className="border-t border-b border-primary/20 py-4 mb-6 text-left inline-block">
                            <p className="mb-2">
                                <strong className="text-primary mr-2">📅 体験日:</strong> {submittedData.date}
                            </p>
                            <p>
                                <strong className="text-primary mr-2">🧑‍🤝‍🧑 参加人数:</strong> {submittedData.participants} 名
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className="p-0 justify-center">
                        <Button variant="default" onClick={handleReset}>
                            続けて申し込みをする
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    // メインのレンダリング
    return (
        <div className="bg-background min-h-screen py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold border-b-4 border-primary pb-3 mb-8 text-foreground">
                    農場ID: {farmId} 体験申し込み
                </h1>
                
                <h2 className="text-xl font-semibold text-primary/70 mb-4">体験プラン概要</h2>

                {/* --- 1. メインの体験詳細カード --- */}
                <Card className="shadow-xl border-primary/20 p-0 mb-8">
                    <CardContent className="p-6">
                        <h3 className="text-2xl font-bold text-primary border-b border-primary/30 pb-3 mb-6">
                            {farm.title}
                        </h3>

                        {/* 1-1. 栗拾いカード */}
                        <Card className="mb-6 bg-card border-primary/30 shadow-md">
                            <CardContent className="p-4">
                                <h4 className="text-xl font-bold text-primary border-b-2 border-primary/50 pb-1 mb-3">
                                    🌰 【{farm.harvest.item}】
                                </h4>
                                <ul className="list-disc pl-8 text-sm space-y-1 text-gray-700">
                                    <li><strong>期間</strong>: {farm.harvest.period}</li>
                                    <li><strong>販売</strong>: {farm.harvest.sale}</li>
                                    <li><strong>サービス</strong>: {farm.harvest.service}</li>
                                </ul>
                            </CardContent>
                        </Card>
                        
                        {/* 1-2. サツマイモ掘りカード */}
                        <Card className="mb-6 bg-card border-primary/30 shadow-md">
                            <CardContent className="p-4">
                                <h4 className="text-xl font-bold text-primary border-b-2 border-primary/50 pb-1 mb-3">
                                    🍠 【{farm.sweetPotato.item}】
                                </h4>
                                <ul className="list-disc pl-8 text-sm space-y-1 text-gray-700">
                                    <li><strong>期間</strong>: {farm.sweetPotato.period}</li>
                                    <li><strong>種類</strong>: {farm.sweetPotato.type}</li>
                                    <li><strong>販売</strong>: {farm.sweetPotato.sale}</li>
                                    <li><strong>サービス</strong>: {farm.sweetPotato.service}</li>
                                </ul>
                            </CardContent>
                        </Card>
                        
                        {/* 1-3. その他情報セクション */}
                        <h4 className="text-xl font-bold text-aglink-brown mt-8 mb-4">その他の体験内容</h4>
                        {farm.others.map((item, index) => (
                            <Card key={index} className="mb-3 bg-card border-aglink-brown/20 shadow-sm">
                                <CardContent className="p-4">
                                    <h5 className="font-semibold text-aglink-brown mb-1">
                                        {item.title}
                                    </h5>
                                    <p className="text-sm text-gray-600">{item.content}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </CardContent>
                </Card>

                {/* --- 2. 概要/料金カード --- */}
                <Card className="mt-8 p-4 bg-card border-l-4 border-primary shadow-xl mb-8">
                    <CardTitle className="text-2xl font-bold text-primary mb-4 p-0">
                        プラン概要と料金
                    </CardTitle>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm leading-relaxed">
                        <p>
                            <strong className="text-aglink-brown mr-2">開催期間</strong>: <span>{farm.summary.period}</span>
                        </p>
                        <p>
                            <strong className="text-aglink-brown mr-2">所要時間</strong>: <span>{farm.summary.duration}</span>
                        </p>
                        <p>
                            <strong className="text-aglink-brown mr-2">料金に含まれるもの</strong>: <span>{farm.summary.included}</span>
                        </p>
                        <p>
                            <strong className="text-aglink-brown mr-2">予約可能人数</strong>: <span>{farm.summary.capacity}</span>
                        </p>
                    </div>
                    <div className="font-extrabold text-2xl pt-4 border-t border-primary/30 mt-4 text-right">
                        <span className="text-aglink-brown mr-2">基本料金 (1人あたり):</span> 
                        <span className="text-primary">{farm.price.toLocaleString()} 円</span>
                    </div>
                </Card>
                
                {/* --- 3. 画像 (Call to Action) --- */}
                <Image 
                    src="/images/image_4359dc.png" 
                    alt="農業体験の様子" 
                    className="w-full h-auto my-8 rounded-lg border-2 border-primary shadow-xl object-cover"
                />

                {/* --- 4. 申し込みフォームカード --- */}
                <Card className="bg-card border-l-8 border-primary shadow-2xl p-6"> 
                    <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-3xl font-extrabold text-primary text-center">
                            体験 申し込みフォーム
                        </CardTitle>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        
                        {/* 希望体験日 */}
                        <div className="mb-5">
                            <label htmlFor="date" className="block mb-2 font-semibold text-gray-700">希望体験日</label>
                            <input 
                                type="date" 
                                id="date"
                                name="date"
                                required
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full p-3 border border-primary/50 rounded-lg box-border text-base bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>

                        {/* 参加人数 */}
                        <div className="mb-5">
                            <label htmlFor="participants" className="block mb-2 font-semibold text-gray-700">参加人数</label>
                            <input 
                                type="number" 
                                id="participants"
                                name="participants"
                                required
                                min="1"
                                value={formData.participants}
                                onChange={handleChange}
                                className="w-full p-3 border border-primary/50 rounded-lg box-border text-base bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>
                        
                        {/* 代表者氏名 */}
                        <div className="mb-8">
                            <label htmlFor="name" className="block mb-2 font-semibold text-gray-700">代表者氏名</label>
                            <input 
                                type="text" 
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 border border-primary/50 rounded-lg box-border text-base bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="例：山田 太郎"
                            />
                        </div>

                        {/* 申し込みボタン */}
                        <Button 
                            type="submit" 
                            variant="default" 
                            size="lg"
                            className="w-full shadow-lg hover:shadow-xl"
                        >
                            申し込みを確定する (合計: {(farm.price * formData.participants).toLocaleString()} 円)
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}
