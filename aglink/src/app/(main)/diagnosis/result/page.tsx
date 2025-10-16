
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, ExternalLink, Leaf } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// UI表示に必要な型 (ローカル定義)
interface Farm {
    id: number;
    name: string;
    location: string;
    area: string;
    features: string;
    url: string;
}

interface DiagnosisResultData {
    name: string;
    code: string;
    imagePath: string;
    description: {
        intro: string;
        strengths: string[];
        weaknesses: string[];
        idealFarm: string;
    };
    farmProposals: Farm[];
}

// --- UIで使用するモックデータ定義 ---
const MOCK_RESULT: DiagnosisResultData = {
    name: "週末ガーデナー",
    code: "AFHO",
    imagePath: "/images/agli-types/AFHO-type.png", 
    description: {
        intro: "畑は自分だけの癒し空間。美しさやユニークさを追求し、収穫した野菜は家族や友人と楽しむ。新しい植物や栽培方法を試すのが大好き。",
        strengths: [
            "環境の変化に対する高い適応力と、育てる作物への愛情の深さ。",
            "計画性よりも直感を頼りに、自然のサイクルに寄り添った農業を築ける。"
        ],
        weaknesses: [
            "ビジネス的な効率や市場動向の考慮が苦手な傾向。",
            "データに基づいた厳密な管理よりも感覚を優先しがち。"
        ],
        idealFarm: "理想の農園は、小規模でも生態系が豊かで、手作りの温かみが感じられる場所です。特に、ハーブ栽培や有機野菜の多品目栽培に適性があります。"
    },
    farmProposals: [
        { id: 1, name: "里山の小さなハーブ農園", location: "京都府 南丹市", area: "150坪", features: "無農薬、古民家付き", url: "/farm/1" },
        { id: 2, name: "高原の有機野菜エリア", location: "長野県 茅野市", area: "400坪", features: "冷涼地、多品目栽培向き", url: "/farm/2" },
        { id: 3, name: "海岸沿いの自然農園", location: "千葉県 夷隅郡", area: "200坪", features: "温暖、土壌改良不要", url: "/farm/3" },
    ]
};

// UIレンダリング関数 (page.tsxのexport default関数として定義)
export default function DiagnosisResultPage() {
    // データはローカルのモックデータを使用
    const result = MOCK_RESULT;
    const characterImageSrc = result.imagePath;

    return (
        <main className="container mx-auto py-8">
            {/* 全体コンテナ: 中央揃え、パディング、背景色 */}
            <div className={`flex flex-col items-center p-4 md:p-6 min-h-screen bg-background`}>
                
                {/* ページコンテンツの最大幅を制限するコンテナ */}
                <div className="w-full max-w-5xl flex flex-col items-center pt-8 pb-12">
                    
                    {/* ★ 1. タイプ名、アルファベット、キャラクター画像のセクションを左右に配置 */}
                    <div className="bg-card p-8 md:p-12 rounded-xl shadow-2xl border border-border w-full 
                                    flex flex-col lg:flex-row items-center justify-between text-center lg:text-left overflow-hidden relative">
                        
                        {/* 左側: タイプ名とアルファベット、簡単な紹介文 */}
                        <div className="flex flex-col items-center lg:items-start lg:w-1/2 mb-8 lg:mb-0 lg:pr-8 animate-fadeInUp delay-300">
                            <p className="text-xl md:text-2xl font-semibold text-primary mb-1">
                                あなたの農業スタイル
                            </p>
                            {/* ★ フォントサイズを調整し、見やすくする */}
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tighter leading-tight">
                                {result.name}
                            </h1>
                            <p className="text-2xl md:text-3xl font-mono text-muted-foreground mt-2">
                                ({result.code})
                            </p>
                            <p className="text-lg md:text-xl text-foreground font-medium max-w-2xl mt-6">
                                {result.description.intro}
                            </p>
                        </div>

                        {/* 右側: キャラクター画像 */}
                        {/* ★ 画像サイズを調整し、右側に配置 */}
                        <div className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] relative shrink-0 animate-fadeInUp">
                            <Image
                                src={characterImageSrc}
                                alt={`${result.name} キャラクター`}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* 2. スタイルの説明セクション */}
                    <div className="mt-12 w-full max-w-4xl space-y-8">

                        {/* 詳細な説明 */}
                        <section className="bg-white p-6 rounded-lg shadow-md border">
                            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center">
                                <Leaf className="w-6 h-6 mr-2" />
                                {result.name} の特徴
                            </h2>
                            <p className="text-base text-gray-700 mb-6">
                                {result.description.idealFarm}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* 強み */}
                                <div>
                                    <h3 className="text-lg font-semibold text-green-700 mb-2"> 強み</h3>
                                    <ul className="list-disc list-inside space-y-1 pl-4 text-gray-700">
                                        {result.description.strengths.map((s, i) => (
                                            <li key={i}>{s}</li>
                                        ))}
                                    </ul>
                                </div>
                                
                                {/* 課題 */}
                                <div>
                                    <h3 className="text-lg font-semibold text-red-600 mb-2"> 課題</h3>
                                    <ul className="list-disc list-inside space-y-1 pl-4 text-gray-700">
                                        {result.description.weaknesses.map((w, i) => (
                                            <li key={i}>{w}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* 3. 農地提案セクション */}
                        <section className="bg-white p-6 rounded-lg shadow-md border">
                            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
                                <MapPin className="w-6 h-6 mr-2" />
                                あなたにぴったりの農地提案
                            </h2>
                            
                            <div className="space-y-4">
                                {result.farmProposals.map((farm) => (
                                    <div key={farm.id} className="p-4 border rounded-lg hover:bg-gray-50 transition duration-150">
                                        <h3 className="text-xl font-bold text-foreground mb-1">
                                            <Link href={farm.url} className="hover:underline">
                                                {farm.name}
                                            </Link>
                                        </h3>
                                        <div className="flex flex-wrap text-sm text-gray-600 space-x-4">
                                            <span className="flex items-center">
                                                <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
                                                {farm.location}
                                            </span>
                                            <span className="flex items-center">
                                                {farm.area}
                                            </span>
                                            <span className="flex items-center font-medium text-green-700">
                                                - {farm.features}
                                            </span>
                                        </div>
                                        <Link href={farm.url} >
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                className="mt-2 text-primary border-primary hover:bg-primary/10 transition-all duration-200"
                                            >
                                                詳細を見る
                                                <ExternalLink className="w-4 h-4 ml-2" />
                                            </Button>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 text-center">
                                <p className="text-gray-600 mb-3">
                                    他にも多くの農地があります。理想の農園を探し始めましょう。
                                </p>
                                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200" asChild>
                                    <Link href="/farms">
                                        すべての農地を見る
                                    </Link>
                                </Button>
                            </div>
                        </section>
                    </div>
                </div>
                
                {/* 画面下部の余白調整用のダミー要素 */}
                <div className="h-10"></div>
            </div>
        </main>
    );
}