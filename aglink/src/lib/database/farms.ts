import { supabase } from "@/lib/supabaseClient";
import type { Farm, NewFarmInput } from "@/types";
import { supabaseToCamelCase } from "../utils";

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
      .select(
        `
        id,
        name,
        code,
        type,
        location,
        image_url,
        plans (
          plan_name,
          description,
          start_date,
          end_date,
          duration_minutes,
          price,
          capacity_min,
          capacity_max
        )
      `
      )
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching farms:", error);
      return null;
    }

    const camelCasedData = supabaseToCamelCase(data);
    return camelCasedData as Farm[];
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
      .select(
        `
        id,
        name,
        code,
        type,
        location,
        image_url,
        plans (
          plan_name,
          description,
          start_date,
          end_date,
          duration_minutes,
          price,
          capacity_min,
          capacity_max
        )
      `
      )
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching farm:", error);
      return null;
    }

    return supabaseToCamelCase(data) as Farm;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
};

/**
 * 農業codeでフィルタリング
 */
export const getFarmsByCode = async (code: string): Promise<Farm[] | null> => {
  try {
    const { data, error } = await supabase
      .from("farms")
      .select(
        `
        id,
        name,
        code,
        type,
        location,
        image_url,
        plans (
          plan_name,
          description,
          start_date,
          end_date,
          duration_minutes,
          price,
          capacity_min,
          capacity_max
        )
      `
      )
      .eq("code", code)
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching farms by code:", error);
      return null;
    }

    const camelCasedData = supabaseToCamelCase(data); //一度unknown型にする
    return camelCasedData as Farm[]; //その後明示的にFarm型の配列に変換
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

    return supabaseToCamelCase(data) as Farm;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
};
