"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { useFarmId } from "@/hooks/useFarmId";
import { BookingFormInput, Farm } from "@/types";
import { useFarmById } from "@/hooks/useFarmById";
import { useFormFarm } from "@/hooks/useFormFarm";

// async関数として定義し、paramsのPromiseを解決
export default function FarmApplicationPage({
  params,
}: {
  params: Promise<{ id: Farm["id"] }>;
}) {
  const [id, idLoading, idError] = useFarmId(params);
  const [farm, farmError, farmLoading] = useFarmById(id as Farm["id"]);
  const { formData, handleChange, handleSubmit, submittedData, handleReset } =
    useFormFarm(id as Farm["id"]);

  if (farmLoading || idLoading) {
    return <div>読み込み中...</div>;
  }

  if (farmError || idError) {
    return <div>エラー: {farmError || idError}</div>;
  }

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
              「<strong className="font-semibold">{farm?.name}</strong>
              」の体験申し込みを受け付けました。
              ご登録のメールアドレスに詳細をお送りします。
            </p>
            <div className="border-t border-b border-primary/20 py-4 mb-6 text-left inline-block">
              <p className="mb-2">
                <strong className="text-primary mr-2">📅 体験日:</strong>{" "}
                {submittedData.desiredDate}
              </p>
              <p>
                <strong className="text-primary mr-2">🧑‍🤝‍🧑 参加人数:</strong>{" "}
                {submittedData.participants} 名
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
          農場: {farm?.name} 体験申し込み
        </h1>

        <h2 className="text-xl font-semibold text-primary/70 mb-4">
          体験プラン概要
        </h2>

        {/* --- 1. メインの体験詳細カード --- */}
        <Card className="shadow-xl border-primary/20 p-0 mb-8">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-primary border-b border-primary/30 pb-3 mb-6">
              {farm?.plans[0].planName}
            </h3>

            {/* 1-1. 栗拾いカード */}
            <Card className="mb-6 bg-card border-primary/30 shadow-md">
              <CardContent className="p-4">
                <h4 className="text-xl font-bold text-primary border-b-2 border-primary/50 pb-1 mb-3">
                  🌰 【{farm?.plans[0].description}】
                </h4>
                <ul className="list-disc pl-8 text-sm space-y-1 text-gray-700">
                  <li>
                    <strong>期間</strong>: {farm?.plans[0].startDate} ~{" "}
                    {farm?.plans[0].endDate}
                  </li>
                  {/* <li>
                    <strong>販売</strong>: {farm?.plans[0].price} 円
                  </li> */}
                  <li>
                    <strong>人数</strong>: {farm?.plans[0].capacityMin} 名〜
                    {farm?.plans[0].capacityMax} 名
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 1-2. サツマイモ掘りカード */}
            {/* <Card className="mb-6 bg-card border-primary/30 shadow-md">
              <CardContent className="p-4">
                <h4 className="text-xl font-bold text-primary border-b-2 border-primary/50 pb-1 mb-3">
                  🍠 【{farm?.plans[1].description}】
                </h4>
                <ul className="list-disc pl-8 text-sm space-y-1 text-gray-700">
                  <li>
                    <strong>期間</strong>: {farm?.plans[1].startDate} ~{" "}
                    {farm?.plans[1].endDate}
                  </li>
                  <li>
                    <strong>販売</strong>: {farm?.plans[1].price} 円/kg
                  </li>
                  <li>
                    <strong>人数</strong>: {farm?.plans[1].capacityMin} 名〜
                    {farm?.plans[1].capacityMax} 名
                  </li>
                </ul>
              </CardContent>
            </Card> */}

            {/* 1-3. その他情報セクション */}
            <h4 className="text-xl font-bold text-aglink-brown mt-8 mb-4">
              その他の体験内容
            </h4>
            {farm?.plans.map((item, index) => (
              <Card
                key={index}
                className="mb-3 bg-card border-aglink-brown/20 shadow-sm"
              >
                <CardContent className="p-4">
                  <h5 className="font-semibold text-aglink-brown mb-1">
                    {/* {item.planName} */}
                  </h5>
                  {/* <p className="text-sm text-gray-600"  >{item.description}</p> */}
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
              <strong className="text-aglink-brown mr-2">開催期間</strong>:{" "}
              <span>
                {farm?.plans[0].startDate} ~ {farm?.plans[0].endDate}
              </span>
            </p>
            <p>
              <strong className="text-aglink-brown mr-2">所要時間</strong>:{" "}
              <span>{farm?.plans[0].durationMinutes} 分</span>
            </p>
            <p>
              <strong className="text-aglink-brown mr-2">
                料金に含まれるもの
              </strong>
              {/* : <span>{farm?.plans[0].description}</span> */}
            </p>
            <p>
              <strong className="text-aglink-brown mr-2">予約可能人数</strong>:{" "}
              <span>
                {farm?.plans[0].capacityMin} 名〜{farm?.plans[0].capacityMax} 名
              </span>
            </p>
          </div>
          <div className="font-extrabold text-2xl pt-4 border-t border-primary/30 mt-4 text-right">
            <span className="text-aglink-brown mr-2">
              基本料金 (1人あたり):
            </span>
            <span className="text-primary">{farm?.plans[0].price} 円</span>
          </div>
        </Card>

        {/* --- 3. 画像 (Call to Action) --- */}
        <Image
          src="/images/image_4359dc.png"
          alt="農業体験の様子"
          width={800}
          height={400}
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
              <label
                htmlFor="date"
                className="block mb-2 font-semibold text-gray-700"
              >
                希望体験日
              </label>
              <input
                type="date"
                id="date"
                name="desiredDate"
                required
                value={formData.desiredDate}
                onChange={handleChange}
                className="w-full p-3 border border-primary/50 rounded-lg box-border text-base bg-white focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            {/* 参加人数 */}
            <div className="mb-5">
              <label
                htmlFor="participants"
                className="block mb-2 font-semibold text-gray-700"
              >
                参加人数
              </label>
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
              <label
                htmlFor="name"
                className="block mb-2 font-semibold text-gray-700"
              >
                代表者氏名
              </label>
              <input
                type="text"
                id="name"
                name="representativeName"
                required
                value={formData.representativeName}
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
              申し込みを確定する (合計:{" "}
              {(farm?.plans[0].price as number) * formData.participants} 円)
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
