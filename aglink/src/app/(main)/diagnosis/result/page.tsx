// 表示を担当する「ドメイン」コンポーネントをインポート
import DiagnosisResult from "@/components/domain/diagnosis/DiagnosisResult";
// データ取得用の関数や型をインポート
import getFarmsByDiagnosis from "@/data/farms"; // 仮のデータ取得関数
import { Farm, Diagnosis } from "@/types";

export default async function DiagnosisResultPage() {
  // 1. サーバーサイドでデータを取得する
  // (実際には、前のページから診断IDを受け取って、それを元にデータを取得します)
  const diagnosis: Diagnosis = {
    farmType: "週末農業タイプ",
    description: "週末に農業を楽しみたい方向けのタイプです。",
  };
  const recommendedFarms: Farm[] | undefined = await getFarmsByDiagnosis(
    diagnosis.farmType
  );

  // 2. 取得したデータを、表示担当のドメインコンポーネントにPropsとして渡す
  return (
    <main className="container mx-auto py-8">
      <DiagnosisResult diagnosis={diagnosis} farms={recommendedFarms} />
    </main>
  );
}
