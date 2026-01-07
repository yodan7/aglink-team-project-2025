import { DiagnosisQuestion } from "@/types";
import { useCallback } from "react";

export const useDiagnosisNavigation = (
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
        unElement?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // 選択済みの場合
    if (axisNum < 3) {
      setAxisNum((prev) => prev + 1);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
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
  }, [axisNum]);

  return { handlePrev, handleNext };
};
