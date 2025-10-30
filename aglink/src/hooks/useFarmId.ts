import { useEffect, useState } from "react";
import { Farm } from "@/types";

export const useFarmId = (params: Promise<{ id: Farm["id"] }>) => {
  const [id, setId] = useState<Farm["id"] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCode = async () => {
      try {
        setLoading(true);
        const resolvedParams = await params;
        if (resolvedParams?.id) {
          setId(resolvedParams.id);
        } else {
          setError("IDが無効です。");
        }
      } catch (err) {
        console.error("IDの取得中にエラーが発生しました:", err);
        setError("IDの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchCode();
  }, [params]);

  return [id, loading, error];
};
