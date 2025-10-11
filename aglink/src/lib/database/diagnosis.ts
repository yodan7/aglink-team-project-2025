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
      .from("diagnoses")
      .insert([diagnosisData])
      .select()
      .single();

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
      .from("diagnoses")
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
 * 診断統計を取得
 */
export const getDiagnosisStats = async (): Promise<Record<
  string,
  number
> | null> => {
  try {
    const { data, error } = await supabase
      .from("diagnoses")
      .select("farm_type")
      .not("farm_type", "is", null);

    if (error) {
      console.error("Error fetching diagnosis stats:", error);
      return null;
    }

    // 統計を集計
    const stats: Record<string, number> = {};
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
