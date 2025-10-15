import { supabase } from "@/lib/supabaseClient";
import type { Diagnosis } from "@/types";

/**
 * 診断データベース操作の関数群
 */

/**
 * 診断結果を保存
 */
export const saveDiagnosis = async (
  diagnosisData: Omit<Diagnosis, "id">
): Promise<Diagnosis | null> => {
  try {
    const { data, error } = await supabase
      .from("diagnoses_results")
      .insert([diagnosisData])
      .select()
      .single(); // 追加したデータを一件返す（すぐに使いたい場合のみ）

    if (error) {
      console.error("Error saving diagnosis:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
};

/**
 * ユーザーの診断履歴を取得
 */
export const getUserDiagnosisHistory = async (
  userId: string
): Promise<Diagnosis[] | null> => {
  try {
    const { data, error } = await supabase
      .from("diagnoses_results")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching diagnosis history:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
};

/**
 * 診断統計を取得（件数を取得するなどの目的）
 */
export const getDiagnosisStats = async (): Promise<Record<
  string,
  number
> | null> => {
  try {
    const { data, error } = await supabase
      .from("diagnoses_results")
      .select("farm_type")
      .not("farm_type", "is", null);

    if (error) {
      console.error("Error fetching diagnosis stats:", error);
      return null;
    }

    // 統計を集計
    const stats: Record<string, number> = {}; //この例では"農業タイプ" : 件数のオブジェクトが生成
    data.forEach((diagnosis) => {
      const type = diagnosis.farm_type;
      stats[type] = (stats[type] || 0) + 1;
    });

    return stats;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
};
