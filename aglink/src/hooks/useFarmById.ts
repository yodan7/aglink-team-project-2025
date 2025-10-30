"use client";
import { getFarmById } from "@/lib/database/farms";
import { Farm } from "@/types";
import { useEffect, useState } from "react";

export const useFarmById = (id: Farm["id"]) => {
  const [farm, setFarm] = useState<Farm | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // ローディング状態を追加

  useEffect(() => {
    // 無効なIDの場合は処理をスキップ
    console.log(id);

    if (!id) {
      // idがまだ渡されていない場合は、ローディング中のまま待機
      setLoading(true);
      return;
    }

    let isMounted = true; // コンポーネントがマウントされているかを追跡

    const fetchData = async () => {
      setLoading(true); // ローディング開始
      try {
        const farm = await getFarmById(id);

        if (isMounted) {
          if (!farm) {
            setError("農地データが見つかりませんでした。");
          } else {
            setFarm(farm);
          }
        }
      } catch (error) {
        console.error("農地データの取得に失敗:", error);
        if (isMounted) {
          setError("農地データの読み込みに失敗しました。");
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
  }, [id]);

  return [
    farm,
    error,
    loading, // ローディング状態を返す
  ] as const;
};
