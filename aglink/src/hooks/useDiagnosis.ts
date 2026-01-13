"use client";
import { getResultsByCode } from "@/lib/database/diagnosis";
import { AgriTypePair, AxisDetail, Diagnosis, SupportInfo } from "@/types";
import { useEffect, useState } from "react";

export const useDiagnosis = (code: AgriTypePair["code"]) => {
  const [diagnosisResults, setDiagnosisResults] = useState<{
    diagnosis: Diagnosis | null;
    axisDetails: AxisDetail[] | null;
    supportInfo: SupportInfo[] | null;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // ローディング状態を追加

  useEffect(() => {
    // 無効なコードの場合は処理をスキップ
    // console.log(code);

    if (!code) {
      // codeがまだ渡されていない場合は、ローディング中のまま待機
      setLoading(true);
      return;
    }

    let isMounted = true; // コンポーネントがマウントされているかを追跡

    const fetchData = async () => {
      setLoading(true); // ローディング開始
      try {
        const diagnosisResults = await getResultsByCode(code);

        if (isMounted) {
          if (!diagnosisResults) {
            setError("診断データが見つかりませんでした。");
          } else {
            setDiagnosisResults(diagnosisResults);
          }
        }
      } catch (error) {
        console.error("診断データの取得に失敗:", error);
        if (isMounted) {
          setError("診断データの読み込みに失敗しました。");
        }
      } finally {
        if (isMounted) {
          setLoading(false); // ローディング終了
        }
      }
    };

    fetchData();

    // クリーンアップ関数でアンマウント時の処理を防止
    return () => {
      isMounted = false;
    };
  }, [code]);

  return [
    diagnosisResults?.diagnosis,
    diagnosisResults?.axisDetails,
    diagnosisResults?.supportInfo,
    error,
    loading, // ローディング状態を返す
  ] as const;
};
