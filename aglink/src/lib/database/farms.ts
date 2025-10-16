import { supabase } from "@/lib/supabaseClient";
import type { Farm, NewFarmInput } from "@/types";

/**
 * 農地データベース操作の関数群
 */

/**
 * 全ての農地を取得
 */
export const getAllFarms = async (): Promise<Farm[] | null> => {
  try {
    const { data, error } = await supabase
      .from("farms")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching farms:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
};

/**
 * 特定の農地を取得（1個）
 */
export const getFarmById = async (id: string): Promise<Farm | null> => {
  try {
    const { data, error } = await supabase
      .from("farms")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching farm:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
};

/**
 * 農業codeでフィルタリング
 */
export const getFarmsByCode = async (
  farmCode: string
): Promise<Farm[] | null> => {
  try {
    const { data, error } = await supabase
      .from("farms")
      .select("*")
      .eq("code", farmCode)
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching farms by code:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
};

/**
 * 新しい農地を作成
 */
export const createFarm = async (
  farmData: NewFarmInput
): Promise<Farm | null> => {
  try {
    const { data, error } = await supabase
      .from("farms")
      .insert(farmData)
      .select()
      .single();

    if (error) {
      console.error("Error creating farm:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
};
