"use client";

import { useState, useEffect, useCallback } from "react";
import { getAllFarms, getFarmsByType } from "@/lib/database/farms";
import type { Farm } from "@/types";

/**
 * 農地データを管理するカスタムフック
 */
export const useFarms = (farmType?: string) => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFarms = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = farmType
        ? await getFarmsByType(farmType)
        : await getAllFarms();

      if (data) {
        setFarms(data);
      } else {
        setError("農地データの取得に失敗しました");
      }
    } catch {
      setError("予期しないエラーが発生しました");
    } finally {
      setLoading(false);
    }
  }, [farmType]);

  useEffect(() => {
    fetchFarms();
  }, [fetchFarms]);

  return {
    farms,
    loading,
    error,
    refetch: fetchFarms,
  };
};
