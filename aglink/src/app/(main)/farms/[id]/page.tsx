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
import { useFarmId } from "@/hooks/useFarmId";
import { Farm } from "@/types";
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
    return <div className="text-xl p-8 text-center">読み込み中...</div>;
  }

  if (farmError || idError) {
    return <div className="text-xl p-8 text-red-600">エラー: {farmError || idError}</div>;
  }

  // --- 3. レンダーロジック ---

  // 申し込み完了画面
  if (submittedData) {
    return (
      <div className="min-h-screen bg-background flex justify-center items-center p-4">
        <Card className="max-w-2xl shadow-xl p-10 bg-card border-primary/30">
          <CardHeader className="p-0 mb-8 border-b pb-6">
            <CardTitle className="text-4xl text-primary text-center font-bold">
              ✅ 申し込み完了
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 text-center">
            <p className="text-xl mb-6 leading-relaxed">
              「<strong className="font-bold text-2xl mx-1">{farm?.name}</strong>」
              <br />
              の体験申し込みを受け付けました。
              <br />
              ご登録のメールアドレスに詳細をお送りします。
            </p>
            <div className="border-t-2 border-b-2 border-primary/20 py-6 mb-8 text-left inline-block bg-gray-50 px-8 rounded-lg w-full">
              <p className="mb-4 text-xl">
                <strong className="text-primary mr-3 text-2xl">📅 体験日:</strong>{" "}
                <span className="font-bold">{submittedData.desiredDate}</span>
              </p>
              <p className="text-xl">
                <strong className="text-primary mr-3 text-2xl">🧑‍🤝‍🧑 人数　:</strong>{" "}
                <span className="font-bold">{submittedData.participants} 名</span>
              </p>
            </div>
          </CardContent>
          <CardFooter className="p-0 justify-center">
            <Button variant="default" onClick={handleReset} className="px-10 py-6 text-xl font-bold">
              続けて申し込みをする
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // メインのレンダリング
  return (
    <div className="bg-background min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* 農場タイトル */}
        <h1 className="text-3xl md:text-4xl font-extrabold border-b-8 border-primary pb-4 mb-10 text-foreground leading-tight">
          農場: {farm?.name} <br className="md:hidden" />
          体験申し込み
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
          体験プラン概要
        </h2>

        {/* --- 1. メインの体験詳細カード --- */}
        <Card className="shadow-xl border-primary/20 p-0 mb-10">
          <CardContent className="p-6 md:p-8">
            <h3 className="text-3xl font-bold text-primary border-b-2 border-primary/30 pb-4 mb-8">
              {farm?.plans[0].planName}
            </h3>

            {farm?.plans[0]?.sections?.map((section, index) => (
              <Card
                key={index}
                className="mb-8 bg-card border-primary/30 shadow-md"
              >
                <CardContent className="p-6">
                  <h4 className="text-2xl font-bold text-primary border-b-2 border-primary/50 pb-2 mb-4">
                    {section.title}
                  </h4>
                  <p className="text-lg md:text-xl text-gray-800 whitespace-pre-wrap leading-loose">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* --- 2. 概要/料金カード --- */}
        <Card className="mt-10 p-6 md:p-8 bg-card border-l-8 border-primary shadow-xl mb-12">
          <CardTitle className="text-3xl font-bold text-primary mb-6 p-0">
            プラン概要と料金
          </CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-lg md:text-xl leading-relaxed">
            <p>
              <strong className="text-aglink-brown inline-block min-w-[5em]">開催期間</strong>:{" "}
              <span className="font-medium">
                {farm?.plans[0].startDate} ~ {farm?.plans[0].endDate}
              </span>
            </p>
            <p>
              <strong className="text-aglink-brown inline-block min-w-[5em]">所要時間</strong>:{" "}
              <span className="font-medium">{farm?.plans[0].durationMinutes} 分</span>
            </p>
            <p>
              <strong className="text-aglink-brown inline-block min-w-[5em]">
                予約可能
              </strong>:{" "}
              <span className="font-medium">
                {farm?.plans[0].capacityMin} 名 〜 {farm?.plans[0].capacityMax} 名
              </span>
            </p>
          </div>
          <div className="font-extrabold text-2xl md:text-4xl pt-6 border-t-2 border-primary/30 mt-6 text-right">
            <span className="text-aglink-brown mr-4 text-xl md:text-2xl">
              基本料金 (1人あたり):
            </span>
            <span className="text-primary">{farm?.plans[0].price} 円</span>
          </div>
        </Card>

        {/* --- 3. 画像 (Call to Action) --- */}
        <Image
          src={farm?.imageUrl || "/images/placeholder.png"}
          alt="農業体験の様子"
          width={800}
          height={400}
          className="w-full h-auto my-10 rounded-xl border-4 border-primary shadow-xl object-cover"
        />

        {/* --- 4. 申し込みフォームカード --- */}
        <Card className="bg-white border-4 border-primary shadow-2xl p-6 md:p-10 rounded-2xl">
          <CardHeader className="p-0 mb-8">
            <CardTitle className="text-3xl md:text-4xl font-extrabold text-primary text-center">
              体験 申し込みフォーム
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            {/* 希望体験日 */}
            <div className="mb-8">
              <label
                htmlFor="date"
                className="block mb-3 text-xl font-bold text-gray-800"
              >
                📅 希望体験日
              </label>
              <input
                type="date"
                id="date"
                name="desiredDate"
                required
                value={formData.desiredDate}
                onChange={handleChange}
                className="w-full p-4 border-2 border-primary/50 rounded-xl text-xl bg-gray-50 focus:ring-4 focus:ring-primary/30 focus:border-primary cursor-pointer"
              />
            </div>

            {/* 参加人数 */}
            <div className="mb-8">
              <label
                htmlFor="participants"
                className="block mb-3 text-xl font-bold text-gray-800"
              >
                🧑‍🤝‍🧑 参加人数 <span className="text-base font-normal">(名)</span>
              </label>
              <input
                type="number"
                id="participants"
                name="participants"
                required
                min="1"
                value={formData.participants}
                onChange={handleChange}
                className="w-full p-4 border-2 border-primary/50 rounded-xl text-xl bg-gray-50 focus:ring-4 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            {/* 代表者氏名 */}
            <div className="mb-12">
              <label
                htmlFor="name"
                className="block mb-3 text-xl font-bold text-gray-800"
              >
                ✍️ 代表者氏名
              </label>
              <input
                type="text"
                id="name"
                name="representativeName"
                required
                value={formData.representativeName}
                onChange={handleChange}
                className="w-full p-4 border-2 border-primary/50 rounded-xl text-xl bg-gray-50 focus:ring-4 focus:ring-primary/30 focus:border-primary placeholder:text-gray-400"
                placeholder="例：山田 太郎"
              />
            </div>

            {/* 申し込みボタン */}
            <div className="flex justify-center">
              <Button
                type="submit"
                variant="default"
                // ↓ w-fullを削除し、px(横の余白)を大きく、text-3xlで文字を特大に、py-8で高さを確保
                className="px-16 py-8 text-xl font-bold shadow-lg hover:shadow-2xl rounded-2xl transition-all hover:scale-105"
              >
                申し込む (合計:{" "}
                {(farm?.plans[0].price as number) * formData.participants} 円)
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}