"use client";
import React, { useEffect, useRef } from "react";
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
import { saveDiagnosisResult } from "../../actions";

export default function DiagnosisResultPage({
  params,
}: {
  params: Promise<{ code: AgriTypePair["code"] }>;
}) {
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

  console.log("🔍 useCodeの状態:", { code, codeLoading, codeError });

  // 保存済みかどうかのフラグ
  const hasSaved = useRef(false);

  useEffect(() => {
    if (!code || hasSaved.current) return;

    const save = async () => {
      hasSaved.current = true;
      console.log("💾 保存処理スタート: code =", code);

      try {
        // 結果を受け取る
        const result = await saveDiagnosisResult(code as string);

        if (result.success) {
          if (result.saved) {
            console.log("✅ 保存成功！ (DBに書き込みました)");
          } else {
            console.log("ℹ️ 未ログインのため保存をスキップしました");
          }
        } else {
          console.error("❌ 保存エラー:", result.error);
        }
      } catch (e) {
        console.error("❌ 通信エラー:", e);
      }
    };

    save();
  }, [code]);
  // codeの値が変わったタイミング（読み込み完了時）に発火

  if (codeLoading || diagnosisLoading || farmsLoading) {
    return <div>読み込み中...</div>;
  }

  if (codeError || diagnosisError || farmsError) {
    return <div>エラー: {codeError || diagnosisError || farmsError}</div>;
  }

  // console.log(farms?.[0].plans.map((x) => x.description));
  return (
    <main className="w-full min-h-screen bg-background">
      {/* 全体コンテナ */}
      <div
        className="flex flex-col items-center w-full relative z-0"
        style={{ marginTop: "calc(-1 * var(--layout-padding-top))" }}
      >
        <div className="w-full max-w-5xl flex flex-col items-center pt-8 pb-12">
          {/* 1. トップセクション */}
          <div className="relative w-screen overflow-hidden mb-12">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/result-haikei.png"
                alt="雲と緑の背景"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/5"></div>
            </div>

            {/* コンテンツ: 左右配置のコンテナ */}
            <div className="relative z-10 w-full max-w-5xl mx-auto pt-[100px] pb-16 md:pb-20 lg:pb-24 px-8 flex flex-col lg:flex-row items-center lg:justify-center lg:gap-x-12 text-center">
              {/* 左側: タイプ名とアルファベット、簡単な紹介文 */}
              <div className="flex flex-col items-center lg:items-center mb-8 lg:mb-0 text-white animate-fadeInUp delay-300">
                <p className="text-xl md:text-2xl font-semibold mb-1">
                  あなたの農業スタイル
                </p>
                <h1
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

          {/* 2. 詳細セクション */}
          <div className="w-full max-w-4xl space-y-8 px-4 relative">
            <section className="bg-card p-6 rounded-lg shadow-md relative">
              <h2 className="text-3xl font-bold text-primary mb-4 flex items-center">
                <Leaf className="w-6 h-6 mr-2" />
                {diagnosis?.type} の特徴
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                {diagnosis?.description}
              </p>
            </section>

            <section className="bg-card p-6 rounded-lg shadow-md relative">
              <h2 className="text-3xl font-bold text-primary mb-6 flex items-center">
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
                    <p className="text-lg text-gray-600">{axis.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-card p-6 rounded-lg shadow-md relative">
              <h2 className="text-3xl font-bold text-primary mb-6 flex items-center">
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

            {/* 3. 農地提案セクション */}
            <section className="bg-card p-6 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold text-primary mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-2" />
                {diagnosis?.type} のあなたにお勧めの農地
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {farms?.map((farm) => (
                  <Dialog key={farm.id}>
                    <Card className="overflow-hidden shadow-md hover:shadow-xl transition duration-300 p-0">
                      <CardHeader className="p-0 border-b border-border">
                        <div className="relative h-40 md:h-48 w-full">
                          <Image
                            src={farm.imageUrl}
                            alt={farm.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 flex flex-col gap-1">
                        <CardTitle className="text-lg font-bold text-foreground line-clamp-1">
                          {farm.name}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-600 line-clamp-2">
                          <MapPin className="w-3 h-3 mr-1 inline" />
                          {farm.location} | {farm.location} - {farm.type}
                        </CardDescription>

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

                    {/* ★★★ 修正箇所: サイズを画面いっぱいに固定 (w-[95vw] h-[90vh]) ★★★ */}
                    <DialogContent className="w-[95vw] max-w-[95vw] h-[90vh] max-h-[90vh] p-0 flex flex-col">

                      {/* ヘッダーエリア */}
                      <DialogHeader className="p-6 pb-2 shrink-0">
                        <DialogTitle className="text-2xl md:text-3xl font-bold text-primary mb-2">
                          {farm.name}
                        </DialogTitle>
                        <DialogDescription className="text-base md:text-lg text-gray-700 font-medium flex items-center">
                          <MapPin className="w-5 h-5 mr-2 text-muted-foreground" />
                          {farm.location} ({farm.location})
                        </DialogDescription>
                      </DialogHeader>

                      {/* スクロール可能なコンテンツエリア (flex-1 で余った高さを全て使う) */}
                      <div className="flex-1 overflow-y-auto p-6 pt-2 space-y-6">

                        {/* メイン画像 */}
                        <div className="relative w-full h-64 md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-sm shrink-0">
                          <Image
                            src={farm.imageUrl}
                            alt={farm.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* 詳細情報 */}
                        <div className="space-y-4">
                          <div className="bg-muted/30 p-4 rounded-lg">
                            <h4 className="font-bold text-lg mb-2 text-foreground">
                              農園の特徴・プラン
                            </h4>
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                              {farm.plans[0].planName}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border p-4 rounded-lg">
                              <span className="text-sm text-muted-foreground block mb-1">
                                農園タイプ
                              </span>
                              <span className="text-lg font-medium">
                                {farm.type}
                              </span>
                            </div>
                            <div className="border p-4 rounded-lg">
                              <span className="text-sm text-muted-foreground block mb-1">
                                エリア
                              </span>
                              <span className="text-lg font-medium">
                                {farm.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* フッター (アクションボタン) */}
                      <DialogFooter className="p-6 pt-4 border-t mt-auto shrink-0 bg-background/95 backdrop-blur">
                        <Button
                          className="w-full h-14 text-xl font-bold bg-primary hover:bg-primary/90 text-white shadow-lg rounded-lg"
                          asChild
                        >
                          <Link href={`/farms/${farm.id}`}>
                            農業体験を予約する
                            <Clock className="w-6 h-6 ml-2" />
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

        <div className="h-10"></div>
      </div>
    </main>
  );
}
