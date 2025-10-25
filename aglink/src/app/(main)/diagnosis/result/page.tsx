import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, ExternalLink, Leaf, Info, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// UI表示に必要な型 (ローカル定義)
interface Farm {
    id: number;
    name: string;
    location: string;
    area: string;
    features: string;
    url: string;
    imagePath: string; // カードUIのために追加
    plantTypes: string; // 育てられる植物
}

interface AxisDetail {
    label: string; // 例: 動機
    value: string; // 例: 芸術型 (A)
    description: string; // 例: 美しさや創造性を追求する
}

interface SupportSystem {
    id: number;
    farming_type_code: string;
    category: string;
    title: string;
    description: string;
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
        crops: string;
    };
    axisDetails: AxisDetail[]; // 軸の詳細を追加
    farmProposals: Farm[];
    supportSystems: SupportSystem[];
}

// --- UIで使用するモックデータ定義 ---
const MOCK_RESULT: DiagnosisResultData = {
    name: "週末ガーデナー",
    code: "AFHO",
    imagePath: "/images/agli-types/AFHO-type.png",
    description: {
        intro: "畑は自分だけの癒し空間。美しさや創造性を追求し、収穫した野菜は家族や友人と楽しむ。新しい植物や栽培方法を試すのが大好き。",
        strengths: [
            "環境の変化に対する高い適応力と、育てる作物への愛情の深さ。",
            "計画性よりも直感を頼りに、自然のサイクルに寄り添った農業を築ける。"
        ],
        weaknesses: [
            "ビジネス的な効率や市場動向の考慮が苦手な傾向。",
            "データに基づいた厳密な管理よりも感覚を優先しがち。"
        ],
        idealFarm: "理想の農園は、小規模でも生態系が豊かで、手作りの温かみが感じられる場所です。特に、ハーブ栽培や有機野菜の多品目栽培に適性があります。",
        crops: "ハーブ類、葉物野菜（ルッコラ、バジル）、ユニークなミニトマトやベリー類"
    },
    axisDetails: [
        { label: "動機", value: "芸術型 (A)", description: "美しさや創造性を追求し、作物や庭をアート作品のように育てることを楽しみます。" },
        { label: "規模", value: "家族型 (F)", description: "家族や友人との繋がりを大切にし、小規模で身近な範囲での農業を楽しみます。" },
        { label: "アプローチ", value: "実践型 (H)", description: "際立った技能や経験を活かし、直接土に触れ、身体を動かす作業を好みます。" },
        { label: "スタンス", value: "開放型 (O)", description: "新しい手法や異業種との交流に積極的で、多様な可能性を模索します。" }
    ],
    supportSystems: [
        { "id": 12, "farming_type_code": "AFHO", "category": "教育・体験", "title": "体験農業・ワークショップ助成", "description": "地域の体験農業プログラムやワークショップ開催に対する助成。観光連携や教育プログラムの実施費用を補助し、参加者募集や運営の負担を軽減。", "url": "https://www.maff.go.jp/j/nousin/kouryu/nouhakusuishin/nouhaku_top.html" }
    ],
    farmProposals: [
        { id: 1, name: "里山の小さなハーブ農園", location: "京都府 南丹市", area: "150坪", features: "無農薬、古民家付き", url: "/farms/1", imagePath: "/images/farm-thumb-1.jpg", plantTypes: "ハーブ、ベビーリーフ" },
        { id: 2, name: "高原の有機野菜エリア", location: "長野県 茅野市", area: "400坪", features: "冷涼地、多品目栽培向き", url: "/farms/2", imagePath: "/images/farm-thumb-2.jpg", plantTypes: "ジャガイモ、キャベツ" },
        { id: 3, name: "海岸沿いの自然農園", location: "千葉県 夷隅郡", area: "200坪", features: "温暖、土壌改良不要", url: "/farms/3", imagePath: "/images/farm-thumb-3.jpg", plantTypes: "ミニトマト、メロン" },
    ]
};

export default function DiagnosisResultPage() {
    // データはローカルのモックデータを使用
    const result = MOCK_RESULT;
    const characterImageSrc = result.imagePath;

    return (
        <main className="w-full min-h-screen bg-background">
            {/* 全体コンテナ: mt-[-80px]を適用してlayout.tsxのpadding-topを打ち消す */}
            <div className={`flex flex-col items-center w-full mt-[-80px] relative z-0`}>
                
                <div className="w-full max-w-5xl flex flex-col items-center pt-8 pb-12">
                    
                    {/* ★★★ 1. トップセクション (キャラクター＆タイプ名) ★★★ */}
                    <div className="relative w-screen overflow-hidden mb-12">
                        {/* 背景画像 (緑の空と雲) */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="/images/result-haikei.png" // 雲の背景画像パス
                                alt="雲と緑の背景"
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* 半透明のオーバーレイ */}
                            <div className="absolute inset-0 bg-black/5"></div>
                        </div>

                        {/* コンテンツ: 左右配置のコンテナ */}
                        <div className="relative z-10 w-full max-w-5xl mx-auto pt-[100px] pb-16 md:pb-20 lg:pb-24 px-8 
                                        flex flex-col lg:flex-row items-center lg:justify-center lg:gap-x-12 text-center">
                            
                            {/* 左側: タイプ名とアルファベット、簡単な紹介文 */}
                            <div className="flex flex-col items-center lg:items-center mb-8 lg:mb-0 text-white animate-fadeInUp delay-300">
                                <p className="text-xl md:text-2xl font-semibold mb-1">
                                    あなたの農業スタイル
                                </p>
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight" 
                                    style={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.4)' }}>
                                    {result.name}
                                </h1>
                                <p className="text-2xl md:text-3xl font-mono mt-2"
                                    style={{ color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                                    ({result.code})
                                </p>
                            </div>

                            {/* 右側: キャラクター画像 */}
                            <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] relative shrink-0 animate-fadeInUp">
                                <Image
                                    src={characterImageSrc}
                                    alt={`${result.name} キャラクター`}
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        </div>
                    </div>


                    {/* 2. 詳細セクション - 画像配置のために親要素を relative に設定 */}
                    <div className="w-full max-w-4xl space-y-8 px-4 relative">
                        
                        {/* 詳細な説明 (イントロ部分) */}
                        <p className="text-lg md:text-xl text-foreground font-medium text-center bg-card p-6 rounded-lg shadow-md mt-8 relative z-20">
                            {result.description.intro}
                        </p>
                        
                        {/* スタイルの特徴と作物 (左側に画像1を配置) */}
                        <section className="bg-card p-6 rounded-lg shadow-md relative">
                            {/* ★★★ 画像1: 週末ガーデナーの特徴 (左側) ★★★ */}
                            <div className="hidden lg:block absolute w-24 h-24 -left-32 -top-1/4">
                                <Image src="/images/agli-types/AFHO1.png" alt="キャラクターイメージ1" fill className="object-contain" />
                            </div>
                            
                            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center">
                                <Leaf className="w-6 h-6 mr-2" />
                                {result.name} の特徴
                            </h2>
                            <p className="text-base text-gray-700 mb-4">
                                {result.description.idealFarm}
                            </p>
                            <p className="text-base font-semibold text-foreground border-t border-dashed pt-4">
                                🌿 向いている作物: <span className="font-normal text-green-700">{result.description.crops}</span>
                            </p>
                        </section>
                        
                        
                        {/* 4つの軸の詳細セクション (右側に画像2を配置) */}
                        <section className="bg-card p-6 rounded-lg shadow-md relative">
                            {/* ★★★ 画像2: 診断結果の詳細 (右側) ★★★ */}
                            <div className="hidden lg:block absolute w-28 h-28 -right-40 top-1/2 transform -translate-y-1/2">
                                <Image src="/images/agli-types/AFHO2.png" alt="キャラクターイメージ2" fill className="object-contain" />
                            </div>

                            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
                                <Leaf className="w-6 h-6 mr-2" />
                                診断結果の詳細：4つの軸
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                {result.axisDetails.map((axis, i) => (
                                    <div key={i} className="border-l-4 border-primary/50 pl-3">
                                        <h3 className="text-lg font-bold text-foreground mb-1">
                                            {axis.label}: <span className="text-primary">{axis.value}</span>
                                        </h3>
                                        <p className="text-sm text-gray-600">{axis.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>


                        {/* 支援情報セクション (左側に画像3を配置) */}
                        <section className="bg-card p-6 rounded-lg shadow-md relative">
                            {/* ★★★ 画像3: 支援制度の提案 (左側) ★★★ */}
                            <div className="hidden lg:block absolute w-24 h-24 -left-36 top-1/2 transform -translate-y-1/2">
                                <Image src="/images/agli-types/AFHO3.png" alt="キャラクターイメージ3" fill className="object-contain" />
                            </div>

                            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
                                <Info className="w-6 h-6 mr-2" />
                                支援制度の提案
                            </h2>
                            <div className="space-y-4">
                                {result.supportSystems.map((support) => (
                                    <div key={support.id} className="p-4 border rounded-lg bg-muted/50 hover:bg-muted transition duration-150">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-foreground">
                                                {support.title}
                                            </h3>
                                            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                                                {support.category}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-3">{support.description}</p>
                                        <Button size="sm" variant="outline" className="text-primary border-primary" asChild>
                                            <Link href={support.url} target="_blank" rel="noopener noreferrer">
                                                詳細へ
                                                <ExternalLink className="w-4 h-4 ml-2" />
                                            </Link>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </section>


                        {/* 3. 農地提案セクション (カードUI) */}
                        <section className="bg-card p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
                                <MapPin className="w-6 h-6 mr-2" />
                                {result.name} のあなたにお勧めの農地
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {result.farmProposals.map((farm) => (
                                    <Dialog key={farm.id}>
                                        <Card className="overflow-hidden shadow-md hover:shadow-xl transition duration-300 p-0">
                                            
                                            {/* 画像エリア (7割を占める) */}
                                            <CardHeader className="p-0 border-b border-border">
                                                <div className="relative h-40 md:h-48 w-full">
                                                    <Image
                                                        src={farm.imagePath} // 農地画像パス
                                                        alt={farm.name}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 1024px) 50vw, 33vw"
                                                    />
                                                </div>
                                            </CardHeader>

                                            {/* カード本文 (3割を占める) */}
                                            <CardContent className="p-4 flex flex-col gap-1">
                                                <CardTitle className="text-lg font-bold text-foreground line-clamp-1">
                                                    {farm.name}
                                                </CardTitle>
                                                <CardDescription className="text-xs text-gray-600 line-clamp-2">
                                                    <MapPin className="w-3 h-3 mr-1 inline" />
                                                    {farm.location} | {farm.area} - {farm.plantTypes}
                                                </CardDescription>

                                                {/* モーダルを起動するトリガー */}
                                                <DialogTrigger asChild>
                                                    <Button variant="default" size="sm" className="mt-2 w-full bg-primary hover:bg-primary/90 text-white">
                                                        詳細・体験予約
                                                    </Button>
                                                </DialogTrigger>
                                            </CardContent>
                                        </Card>

                                        {/* モーダルウィンドウのコンテンツ定義 */}
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle className="text-xl text-primary">{farm.name}</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4">
                                                <div className="relative h-40 w-full rounded-md overflow-hidden">
                                                    <Image src={farm.imagePath} alt={farm.name} fill className="object-cover" />
                                                </div>
                                                <p className="text-sm text-gray-700 font-semibold mb-2 flex items-center">
                                                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                                                    {farm.location} ({farm.area})
                                                </p>
                                                <p className="text-sm text-gray-600 border-t pt-3">
                                                    特徴: {farm.features} / 育てられる作物: {farm.plantTypes}
                                                </p>
                                                <Button className="w-full bg-primary hover:bg-primary/90 text-white mt-4" asChild>
                                                    <Link href={`${farm.url}/reserve`}>
                                                        農業体験を予約する
                                                        <Clock className="w-4 h-4 ml-2" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
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