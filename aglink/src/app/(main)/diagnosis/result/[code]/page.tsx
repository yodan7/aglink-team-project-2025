"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink, Leaf, Info, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDiagnosis } from "@/hooks/useDiagnosis";
import { AgriTypePair } from "@/types";
import { useCode } from "@/hooks/useCode";
import { useFarms } from "@/hooks/useFarms";

export default function DiagnosisResultPage({
  params,
}: {
  params: Promise<{ code: AgriTypePair["code"] }>;
}) {
  // データはローカルのモックデータを使用
  // const result = MOCK_RESULT;
  const [code, codeLoading, codeError] = useCode(params);
  const [
    diagnosis,
    axisDetails,
    supportInfo,
    diagnosisError,
    diagnosisLoading,
  ] = useDiagnosis(code as AgriTypePair["code"]);
  const [farms, farmsError, farmsLoading] = useFarms(
    code as AgriTypePair["code"]
  );

  if (codeLoading || diagnosisLoading || farmsLoading) {
    return <div>読み込み中...</div>;
  }

  if (codeError || diagnosisError || farmsError) {
    return <div>エラー: {codeError || diagnosisError || farmsError}</div>;
  }
  // console.log(farms?.[0].plans.map((x) => x.description));
  return (
    <main className="w-full min-h-screen bg-background">
      {/* 全体コンテナ: layout.tsxのpadding-topを打ち消すため、CSS変数を利用 */}
      <div
        className="flex flex-col items-center w-full relative z-0"
        style={{ marginTop: "calc(-1 * var(--layout-padding-top))" }}
      >
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
            <div
              className="relative z-10 w-full max-w-5xl mx-auto pt-[100px] pb-16 md:pb-20 lg:pb-24 px-8 
                                        flex flex-col lg:flex-row items-center lg:justify-center lg:gap-x-12 text-center"
            >
              {/* 左側: タイプ名とアルファベット、簡単な紹介文 */}
              <div className="flex flex-col items-center lg:items-center mb-8 lg:mb-0 text-white animate-fadeInUp delay-300">
                <p className="text-xl md:text-2xl font-semibold mb-1">
                  あなたの農業スタイル
                </p>
                <h1
                  // 変更 1: text-5xl md:text-6xl lg:text-7xl から text-6xl md:text-7xl lg:text-8xl に変更
                  className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight"
                  style={{
                    color: "white",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
                  }}
                >
                  {diagnosis?.type}
                </h1>
                <p className="text-2xl md:text-3xl font-mono mt-2 text-white drop-shadow-md">
                  ({code})
                </p>
              </div>

              {/* 右側: キャラクター画像 */}
              <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] relative shrink-0 animate-fadeInUp">
                <Image
                  src={`/images/agli-types/${code}-type.png`}
                  alt={`${diagnosis?.type} キャラクター`}
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>

          {/* 2. 詳細セクション - 画像配置のために親要素を relative に設定 */}
          <div className="w-full max-w-4xl space-y-8 px-4 relative">
            
            {/* スタイルの特徴と作物 (左側に画像1を配置) */}
            <section className="bg-card p-6 rounded-lg shadow-md relative">
              {/* ★★★ 画像1: 週末ガーデナーの特徴 (左側) ★★★ */}
              <div className="hidden lg:block absolute w-24 h-24 -left-[8vw] -top-1/4">
                <Image
                  src="/images/agli-types/AFHO1.png"
                  alt="キャラクターイメージ1"
                  fill
                  className="object-contain"
                />
              </div>

              <h2 
                // 変更 2: text-2xl から text-3xl に変更
                className="text-3xl font-bold text-primary mb-4 flex items-center"
              >
                <Leaf className="w-6 h-6 mr-2" />
                {diagnosis?.type} の特徴
              </h2>
              {/* 変更 3: text-lg から text-xl に変更 */}
              <p className="text-xl text-gray-700 mb-4">
                {diagnosis?.description}
              </p>
            </section>

            {/* 4つの軸の詳細セクション (右側に画像2を配置) */}
            <section className="bg-card p-6 rounded-lg shadow-md relative">
              {/* ★★★ 画像2: 診断結果の詳細 (右側) ★★★ */}
              <div className="hidden lg:block absolute w-28 h-28 right-0 top-1/2 transform -translate-y-1/2 translate-x-1/3">
                <Image
                  src="/images/agli-types/AFHO2.png"
                  alt="キャラクターイメージ2"
                  fill
                  className="object-contain"
                />
              </div>

              <h2 
                // 変更 2: text-2xl から text-3xl に変更
                className="text-3xl font-bold text-primary mb-6 flex items-center"
              >
                <Leaf className="w-6 h-6 mr-2" />
                診断結果の詳細：4つの軸
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {axisDetails?.map((axis, i) => (
                  <div key={i} className="border-l-4 border-primary/50 pl-3">
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {axis.axisCategory}:{" "}
                      <span className="text-primary">{axis.name}</span>
                    </h3>
                    {/* 変更 4: text-base から text-lg に変更 */}
                    <p className="text-lg text-gray-600">{axis.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 支援情報セクション (左側に画像3を配置) */}
            <section className="bg-card p-6 rounded-lg shadow-md relative">
              {/* ★★★ 画像3: 支援制度の提案 (左側) ★★★ */}
              <div className="hidden lg:block absolute w-24 h-24 -left-1/4 top-1/2 transform -translate-y-1/2">
                <Image
                  src="/images/agli-types/AFHO3.png"
                  alt="キャラクターイメージ3"
                  fill
                  className="object-contain"
                />
              </div>

              <h2 
                // 変更 2: text-2xl から text-3xl に変更
                className="text-3xl font-bold text-primary mb-6 flex items-center"
              >
                <Info className="w-6 h-6 mr-2" />
                支援制度の提案
              </h2>
              <div className="space-y-4">
                {supportInfo?.map((support, i) => (
                  <div
                    key={i}
                    className="p-4 border rounded-lg bg-muted/50 hover:bg-muted transition duration-150"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-foreground">
                        {support.title}
                      </h3>
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {support.category}
                      </span>
                    </div>
                    {/* 変更 5: text-base から text-lg に変更 */}
                    <p className="text-lg text-gray-600 mb-3">
                      {support.description}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-primary border-primary"
                      asChild
                    >
                      <Link
                        href={support.resourceLinks}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
              <h2 
                // 変更 2: text-2xl から text-3xl に変更
                className="text-3xl font-bold text-primary mb-6 flex items-center"
              >
                <MapPin className="w-6 h-6 mr-2" />
                {diagnosis?.type} のあなたにお勧めの農地
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {farms?.map((farm) => (
                  <Dialog key={farm.id}>
                    <Card className="overflow-hidden shadow-md hover:shadow-xl transition duration-300 p-0">
                      {/* 画像エリア (7割を占める) */}
                      <CardHeader className="p-0 border-b border-border">
                        <div className="relative h-40 md:h-48 w-full">
                          <Image
                            src={farm.imageUrl} // 農地画像パス
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
                        {/* 変更 4: text-xs から text-sm に変更 (前回の変更を維持) */}
                        <CardDescription className="text-sm text-gray-600 line-clamp-2">
                          <MapPin className="w-3 h-3 mr-1 inline" />
                          {farm.location} | {farm.location} - {farm.type}
                        </CardDescription>

                        {/* モーダルを起動するトリガー */}
                        <DialogTrigger asChild>
                          <Button
                            variant="default"
                            size="sm"
                            className="mt-2 w-full bg-primary hover:bg-primary/90 text-white"
                          >
                            詳細・体験予約
                          </Button>
                        </DialogTrigger>
                      </CardContent>
                    </Card>

                    {/* モーダルウィンドウのコンテンツ定義 */}
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-xl text-primary">
                          {farm.name}
                        </DialogTitle>
                        <DialogDescription className="text-sm text-gray-700 font-semibold flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                          {farm.location} ({farm.location})
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="relative h-40 w-full rounded-md overflow-hidden">
                          <Image
                            src={farm.imageUrl}
                            alt={farm.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-sm text-gray-600 border-t pt-3">
                          特徴: {farm.plans[0].planName}
                        </p>
                      </div>
                      <DialogFooter>
                        <Button
                          className="w-full bg-primary hover:bg-primary/90 text-white"
                          asChild
                        >
                          <Link href={`/farms/${farm.id}`}>
                            農業体験を予約する
                            <Clock className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-3">
                  他にも多くの農地があります。理想の農園を探し始めましょう。
                </p>
                <Button
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  asChild
                >
                  <Link href="#farms">すべての農地を見る</Link>
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