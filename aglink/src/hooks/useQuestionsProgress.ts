import { AnswerObjectType, GroupedQuestions, AxisCategory } from "@/types";
import { useMemo } from "react";

// src/hooks/useDiagnosisProgress.ts
export const useQuestionsProgress = (
  questions: GroupedQuestions | null,
  currentAxis: AxisCategory,
  currentAnswerValue: AnswerObjectType
) => {
  //未回答の質問を抽出
  //'key' in {key : value}で、オブジェクトにキーが存在するか確認
  //idがあるかどうかに変更
  const unSelected = useMemo(
    () =>
      questions && currentAxis && questions[currentAxis]
        ? questions[currentAxis].filter(
            (q) => currentAnswerValue[currentAxis]?.[q.id] === undefined
          )
        : [],
    [questions, currentAxis, currentAnswerValue]
  );

  const isAllSelect = useMemo(() => unSelected.length === 0, [unSelected]);

  const axisValue = useMemo(
    () =>
      currentAxis && currentAnswerValue[currentAxis]
        ? Object.values(currentAnswerValue[currentAxis]).reduce(
            (sum: number, value: number) => sum + value,
            0
          )
        : 0,
    [currentAxis, currentAnswerValue]
  );

  return { unSelected, isAllSelect, axisValue };
};
