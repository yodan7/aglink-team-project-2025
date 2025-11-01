import { Farm, Diagnosis } from "@/types";
import FarmList from "@/components/domain/farms/FarmList"; // 農地リスト表示用のドメインコンポーネント
import { Button } from "@/components/ui/button"; // UIの基本ブロック
import Link from "next/link";

type Props = {
  diagnosis: Diagnosis;
  farms: Farm[] | undefined;
};

export default function DiagnosisResult({ diagnosis, farms }: Props) {
  return (
    <div className="flex flex-col items-center gap-8">
      {/* 診断結果の表示エリア */}
      <section className="text-center">
        <p>あなたが向いているのは・・・</p>
        <h1 className="text-4xl font-bold my-4">{diagnosis.type}</h1>
        <p className="max-w-md">{diagnosis.description}</p>
      </section>

      {/* おすすめ農地リストの表示エリア */}
      <section className="w-full">
        <h2 className="text-2xl font-bold mb-4">あなたへのおすすめ農地</h2>
        {/* 農地リストの表示は、専門のFarmListコンポーネントに任せる */}
        <FarmList farms={farms} />
      </section>

      <Link href="/">
        <Button variant="secondary">トップページへ戻る</Button>
      </Link>
    </div>
  );
}
