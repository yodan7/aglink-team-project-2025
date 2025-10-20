import { GroupedQuestions } from "@/types";
import { useCallback, useEffect, useState } from "react";
import type { QuestionAxis, AnswerObjectType, AnswerValue } from "@/types";
import { getAllQuestions } from "@/lib/database/questions";

export const useDiagnosis = () => {
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
  const [axisNum, setAxisNum] = useState(0); //5問ごとに軸が変わるセクション数
  const [error, setError] = useState<string | null>(null);
  const axisList: QuestionAxis[] = Object.keys(questions ?? {}).map(
    (question) => question as QuestionAxis
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
    // 現在の軸の値を計算 - オブジェクト形式に対応
    const axisValue =
      currentAxis && currentAnswerValue[currentAxis]
        ? Object.values(currentAnswerValue[currentAxis]).reduce(
            (sum: number, value: number) => sum + value,
            0
          )
        : 0;

    if (currentAxis && typeCode[currentAxis]) {
      setTypeCode((prev) => ({
        ...prev,
        [currentAxis]:
          axisValue > 0 ? prev[currentAxis][0] : prev[currentAxis][1],
      }));
    }
  }, [currentAxis, currentAnswerValue]);

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
