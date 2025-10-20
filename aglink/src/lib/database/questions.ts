import { supabase } from "@/lib/supabaseClient";
import type {
  DiagnosisQuestion,
  QuestionAxis,
  GroupedQuestions,
} from "@/types";

export const getAllQuestions = async (): Promise<GroupedQuestions | null> => {
  try {
    //全部取ってくる場合は配列になるので、戻り値の型を配列にする
    const { data, error } = await supabase.from("questions").select("*");
    // {data | null, error | null}が返ってくるので、data, error, nullチェックが必要
    if (error) {
      console.error("質問の取得に失敗しました", error);
      return null;
    }

    //コピーした新配列を、1/2の確立で正負に分けてソートしシャッフル
    // dataがnullの場合は空配列を使用
    const safeData = data || [];

    const grouped: GroupedQuestions = {
      Motivation: [] as DiagnosisQuestion[],
      Scale: [] as DiagnosisQuestion[],
      Approach: [] as DiagnosisQuestion[],
      Stance: [] as DiagnosisQuestion[],
    };

    safeData.forEach((question: DiagnosisQuestion) => {
      const axis = question.axis as QuestionAxis;
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
