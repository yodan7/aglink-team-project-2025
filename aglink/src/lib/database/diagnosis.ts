import { supabase } from "@/lib/supabaseClient";
import type { AxisDetail, Diagnosis, SupportInfo } from "@/types";
import { supabaseToCamelCase } from "../utils";

/**
 * codeから診断結果を取得
 */

export const getResultsByCode = async (
  code: string
): Promise<{
  diagnosis: Diagnosis | null;
  axisDetails: AxisDetail[] | null;
  supportInfo: SupportInfo[] | null;
}> => {
  try {
    // 診断結果を取得
    const diagnosis = await getDiagnosisByCode(code);
    if (!diagnosis) {
      console.warn(`診断結果が見つかりませんでした: code=${code}`);
    }

    // 軸詳細を取得
    const axisDetails = await getAxisDetailByCode(code);
    if (!axisDetails) {
      console.warn(`軸詳細が見つかりませんでした: code=${code}`);
    }

    // サポート情報を取得
    const supportInfo = await getSupportInfoByCode(code);
    if (!supportInfo) {
      console.warn(`サポート情報が見つかりませんでした: code=${code}`);
    }

    return {
      diagnosis,
      axisDetails,
      supportInfo,
    };
  } catch (error) {
    console.error("データ取得中に予期しないエラーが発生しました", error);
    return {
      diagnosis: null,
      axisDetails: null,
      supportInfo: null,
    };
  }
};

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
      console.error("質問の取得に失敗しました", error);
      return null;
    }

    const diagnosis = supabaseToCamelCase(data) as Diagnosis;
    return diagnosis ?? null;
  } catch (error) {
    console.error("予期しないエラーが発生しました", error);
    return null;
  }
};

export const getAxisDetailByCode = async (
  code: string
): Promise<AxisDetail[] | null> => {
  try {
    // Supabaseのinクエリを使用して効率的にデータを取得
    const { data, error } = await supabase
      .from("axis_detail")
      .select("*")
      .in("axis_value", code.split("")); // codeを文字ごとの配列に分割

    if (error) {
      console.error("軸詳細の取得に失敗しました", error);
      return null;
    }

    // データが存在しない場合はnullを返す
    if (!data) {
      console.warn("指定されたコードに一致する軸詳細が見つかりませんでした");
      return null;
    }

    return supabaseToCamelCase(data) as AxisDetail[];
  } catch (error) {
    console.error("予期しないエラーが発生しました", error);
    return null;
  }
};

export const getSupportInfoByCode = async (
  code: string
): Promise<SupportInfo[] | null> => {
  try {
    // Supabaseクエリで、指定されたcodeと"ALL"の両方を取得
    const { data, error } = await supabase
      .from("support_info")
      .select("*")
      .in("code", [code, "ALL"]); // codeと"ALL"を指定

    if (error) {
      console.error("サポート情報の取得に失敗しました", error);
      return null;
    }

    if (!data || data.length === 0) {
      console.warn(
        "指定されたコードに一致するサポート情報が見つかりませんでした"
      );
      return null;
    }

    return supabaseToCamelCase(data) as SupportInfo[];
  } catch (error) {
    console.error("予期しないエラーが発生しました", error);
    return null;
  }
};
