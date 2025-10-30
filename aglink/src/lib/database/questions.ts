import { supabase } from "@/lib/supabaseClient";
import type {
  DiagnosisQuestion,
  AxisCategory,
  GroupedQuestions,
} from "@/types";
import { supabaseToCamelCase } from "../utils";

export const getAllQuestions = async (): Promise<GroupedQuestions | null> => {
  try {
    //全部取ってくる場合は配列になるので、戻り値の型を配列にする
    const { data, error } = await supabase.from("questions").select("*");
    // {data | null, error | null}が返ってくるので、data, error, nullチェックが必要
    if (error) {
      console.error("質問の取得に失敗しました", error);
      return null;
    }

    // 取得した質問データを軸(Motivation, Scale, Approach, Stance)ごとにグループ化
    // dataがnullの場合は空配列を使用
    const safeData = (supabaseToCamelCase(data) as DiagnosisQuestion[]) || [];

    const grouped: GroupedQuestions = {
      Motivation: [] as DiagnosisQuestion[],
      Scale: [] as DiagnosisQuestion[],
      Approach: [] as DiagnosisQuestion[],
      Stance: [] as DiagnosisQuestion[],
    };

    console.log(safeData);

    safeData.forEach((question: DiagnosisQuestion) => {
      const axis = question.axis as AxisCategory;
      if (axis in grouped) {
        grouped[axis].push(question);
      }
    });

    return grouped;
  } catch (error) {
    console.error("予期しないエラーが発生しました", error);
    return null;
  }
};
