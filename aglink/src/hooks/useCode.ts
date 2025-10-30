import { useEffect, useState } from "react";
import { AgriTypePair } from "@/types";

export const useCode = (params: Promise<{ code: AgriTypePair["code"] }>) => {
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCode = async () => {
      try {
        setLoading(true);
        const resolvedParams = await params; // 非同期で params を解決
        setCode(resolvedParams.code.toUpperCase()); // 大文字に変換して保存
      } catch (err) {
        console.error("コードの取得中にエラーが発生しました:", err);
        setError("コードの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchCode();
  }, [params]);

  return [code, loading, error];
};
