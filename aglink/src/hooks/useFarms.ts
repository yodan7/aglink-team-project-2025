"use client";

import { useState, useEffect, useCallback } from "react";
import { getAllFarms, getFarmsByCode } from "@/lib/database/farms";
import type { Farm } from "@/types";

/**
 * 農地データを管理するカスタムフック
 * codeが指定された場合はそのコードでフィルタリング、指定されなければ全件取得
 * @return {Object} { farms, loading, error, refetch }
 * - farms: 取得した農地データの配列
 * - loading: データ取得中かどうかの状態
 * - error: エラーメッセージ（エラーが発生した場合）
 * - refetch: データを再取得するための関数
 * 上記を一元管理し、コンポーネントでの利用を簡素化
 * 例: const { farms, loading, error, refetch } = useFarms(code);
 * codeが変わるたびに自動でデータを再取得
 */
export const useFarms = (code: string) => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFarms = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = code ? await getFarmsByCode(code) : await getAllFarms();

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
  }, [code]);

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
