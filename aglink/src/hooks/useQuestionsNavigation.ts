import { DiagnosisQuestion } from "@/types";
import { useCallback } from "react";

export const useQuestionsNavigation = (
  axisNum: number,
  setAxisNum: (value: number | ((prevState: number) => number)) => void,
  isAllSelect: boolean,
  unSelected: DiagnosisQuestion[]
) => {
  const handleNext = useCallback(() => {
    // 未選択がある場合
    if (!isAllSelect) {
      alert("すべての選択肢を選択してください。");
      if (unSelected.length > 0) {
        const unElement = document.getElementById(
          `q${unSelected[0].id.toString()}`
        );
        // ★修正: block を "start" に変更し、質問が画面上部に表示されるようにする
        unElement?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    // 選択済みの場合
    if (axisNum < 3) {
      setAxisNum((prev) => prev + 1);
      // ★修正: 質問が更新された後にスクロールするため、setTimeoutで遅延実行
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axisNum, isAllSelect, unSelected]);

  const handlePrev = useCallback(() => {
    if (axisNum > 0) {
      setAxisNum((prev) => prev - 1);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axisNum]);

  return { handlePrev, handleNext };
};
