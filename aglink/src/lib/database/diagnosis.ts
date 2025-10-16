import { supabase } from "@/lib/supabaseClient";
import type { Diagnosis } from "@/types";

/**
 * codeから診断結果を取得
 */

export const getDiagnosisByCode = async (
  code: string
): Promise<Diagnosis | null> => {
  try {
    const { data, error } = await supabase
      .from("agri_types")
      .select("*")
      .eq("code", code)
      .single();

    if (error) {
      console.error("Error fetching diagnosis:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching diagnosis:", error);
    return null;
  }
};
