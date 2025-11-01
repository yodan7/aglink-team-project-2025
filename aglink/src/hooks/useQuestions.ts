"use client";
import { GroupedQuestions } from "@/types";
import { useCallback, useEffect, useState } from "react";
import type { AxisCategory, AnswerObjectType, AnswerValue } from "@/types";
import { getAllQuestions } from "@/lib/database/questions";

export const useQuestions = () => {
  const [questions, setQuestions] = useState<GroupedQuestions | null>(null);
  // 現在の回答値の状態管理 - オブジェクト形式で効率的に管理
  const [currentAnswerValue, setCurrentAnswerValue] =
    useState<AnswerObjectType>({
      Motivation: {},
      Scale: {},
      Approach: {},
      Stance: {},
    });
  // タイプコードの状態管理
  const [typeCode, setTypeCode] = useState({
    Motivation: "AS",
    Scale: "FC",
    Approach: "HI",
    Stance: "OP",
  });
  const [axisNum, setAxisNum] = useState(0); // 現在表示中の軸のインデックス(0: Motivation, 1: Scale, 2: Approach, 3: Stance)
  const [error, setError] = useState<string | null>(null);
  const axisList: AxisCategory[] = Object.keys(questions ?? {}).map(
    (question) => question as AxisCategory
  );

  // 現在の軸を取得
  const currentAxis = axisList[axisNum];

  // 質問データを取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const questions = await getAllQuestions(); //awaitしたいのでasync関数内で実行（直下じゃないとエラーになるため）
        console.log("取得した質問データ:", questions);
        setQuestions(questions);
      } catch (err) {
        console.error("質問データの取得に失敗:", err);
        setError("質問データの読み込みに失敗しました。");
      }
    };
    fetchData();
  }, []);

  // typeCode更新の副作用をuseEffectで管理
  useEffect(() => {
    if (!currentAxis) {
      console.log("currentAxis is undefined. Skipping typeCode update.");
      return;
    }

    // axisValueを計算
    const axisValue =
      currentAxis && currentAnswerValue[currentAxis]
        ? Object.entries(currentAnswerValue[currentAxis]).reduce(
            (sum, [, value]) => sum + value,
            0
          ) // 各回答値を合計
        : 0; // currentAxisが未定義の場合はデフォルト値0を使用

    console.log("Debug: Calculated axisValue =", axisValue);

    setTypeCode((prev) => {
      const updatedTypeCode = { ...prev };

      // 以前のtypeCodeのデバッグログ
      console.log("Debug: Previous typeCode =", prev);

      // currentAxisに対応する値のみ更新
      if (currentAxis && axisValue !== undefined) {
        updatedTypeCode[currentAxis] = calculateTypeCode(
          axisValue,
          currentAxis
        ); // 必要に応じてロジックを置き換え
      }

      // 更新後のtypeCodeのデバッグログ
      console.log("Debug: Updated typeCode =", updatedTypeCode);

      return updatedTypeCode;
    });
  }, [currentAxis, currentAnswerValue]); // currentAxisとcurrentAnswerValueを依存配列に追加

  const handleAnswer = useCallback(
    (questionId: number, value: AnswerValue) => {
      // {...prev, newKey: newValue} でオブジェクトを展開後に再代入
      // [変数名] で動的キー指定
      // 再度スプレッド構文でネストオブジェクトも展開
      setCurrentAnswerValue((prev) => ({
        ...prev,
        [currentAxis]: {
          ...prev[currentAxis],
          [questionId]: value, // 直接代入で効率的に更新
        },
      }));
      console.log(`質問${questionId}に回答値 ${value} が選択されました`);
    },
    [currentAxis]
  );

  // Helper function to calculate typeCode based on axosValue
  function calculateTypeCode(value: number, axis: AxisCategory): string {
    const defaultTypeCodes: Record<AxisCategory, string> = {
      Motivation: "AS",
      Scale: "FC",
      Approach: "HI",
      Stance: "OP",
    };

    const typeCode = defaultTypeCodes[axis];
    return value > 0 ? typeCode[0] : value < 0 ? typeCode[1] : typeCode[0]; // 正か0なら1文字目、負なら2文字目を選択
  }

  return {
    questions,
    currentAnswerValue,
    typeCode,
    axisNum,
    setAxisNum,
    error,
    handleAnswer,
    axisList,
    currentAxis,
  };
};
