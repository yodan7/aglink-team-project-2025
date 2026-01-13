"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { AnswerValue } from "@/types";
import { useQuestions } from "@/hooks/useQuestions";
import { useQuestionsNavigation } from "@/hooks/useQuestionsNavigation";
import { useQuestionsProgress } from "@/hooks/useQuestionsProgress";

// 0を削除して4択に固定
const ANSWER_VALUES: AnswerValue[] = [2, 1, -1, -2] as const;

const IMAGE_PATHS = [
  "/images/leaf-illu/deadleaves.png",
  "/images/leaf-illu/halfleaves.png",
  "/images/leaf-illu/leaf.png",
  "/images/logo-icon/aglink-icon.png",
];

export default function DiagnosisPageUI() {
  const {
    questions,
    currentAnswerValue,
    typeCode,
    axisNum,
    setAxisNum,
    error,
    handleAnswer,
    axisList,
    currentAxis,
  } = useQuestions();

  const { unSelected, isAllSelect } = useQuestionsProgress(
    questions,
    currentAxis!,
    currentAnswerValue
  );

  const { handlePrev, handleNext } = useQuestionsNavigation(
    axisNum,
    setAxisNum,
    isAllSelect,
    unSelected
  );

  // 全体の質問数と回答済み数を計算
  const totalQuestionsCount = questions
    ? Object.values(questions).reduce((acc, qs) => acc + qs.length, 0)
    : 0;

  const totalAnsweredCount = Object.values(currentAnswerValue).reduce(
    (acc, axisAnswers) => {
      if (!axisAnswers) return acc;
      return acc + Object.keys(axisAnswers).length;
    },
    0
  );

  const remainingTotal = totalQuestionsCount - totalAnsweredCount;
  const progressPercent = totalQuestionsCount
    ? (totalAnsweredCount / totalQuestionsCount) * 100
    : 0;

  const saveDiagnosisData = () => {
    const finalTypeCode = `${typeCode.Motivation}${typeCode.Scale}${typeCode.Approach}${typeCode.Stance}`;
    const data = {
      userAnswers: currentAnswerValue,
      finalType: finalTypeCode,
    };
    // 診断項目をsessionStorageに保存してAI診断ページで利用できるようにする
    sessionStorage.setItem("debug_diagnosis_data", JSON.stringify(data));

    // 診断完了のフラグも保存
    // sessionStorageは文字列しか保存できないため事前に文字列にする
    sessionStorage.setItem("diagnosis_completed", "true");
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    // ★修正: fixed配置を廃止し、通常のフローレイアウトに戻す
    <div className="min-h-screen bg-background flex flex-col items-center pb-20">
      {/* 0. ロゴとタイトルエリア (通常の配置) */}
      {/* 全画面共通ヘッダーの下に自然に配置されます */}
      <div className="w-full max-w-5xl flex flex-col items-center justify-center pt-8 pb-4 px-4">
        <Image
          src={IMAGE_PATHS[3]}
          alt="Aglink ロゴ"
          width={80}
          height={20}
          className="mb-2 object-contain h-10 w-auto"
        />
        <h1 className="text-xl md:text-2xl font-bold text-center text-foreground">
          農業スタイル診断
        </h1>
      </div>

      {/* 1. 進行度と残り質問数 (Sticky配置) */}
      {/* ★重要: sticky top-0 により、スクロール時に画面上部に張り付きます */}
      {/* bg-background/95 と backdrop-blur で背景を少し透過させつつ、質問が後ろを流れるように演出 */}
      <div className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 shadow-sm transition-all">
        <div className="w-full max-w-5xl mx-auto px-4 py-3">
          <div className="flex justify-between items-end mb-2">
            {/* Progress Info */}
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-0.5">
                Progress
              </span>
              <span className="text-2xl font-extrabold text-foreground">
                {Math.round(progressPercent)}
                <span className="text-sm font-medium text-muted-foreground ml-0.5">
                  %
                </span>
              </span>
            </div>
            {/* Remaining Count */}
            <div className="text-right">
              <p className="text-xs text-muted-foreground font-medium mb-0.5">
                残りの質問数
              </p>
              <p className="text-sm font-medium text-foreground">
                あと{" "}
                <span className="text-xl font-bold text-primary">
                  {remainingTotal}
                </span>{" "}
                問
                <span className="text-xs text-muted-foreground ml-1">
                  {" "}
                  / 全{totalQuestionsCount}問
                </span>
              </p>
            </div>
          </div>

          {/* Bar */}
          <div className="relative w-full h-2.5 rounded-full bg-muted overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out bg-primary"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[10px] md:text-xs text-center text-muted-foreground mt-1">
            {currentAxis}に関する質問 (
            {questions && currentAxis ? questions[currentAxis].length : 0}問)
          </p>
        </div>
      </div>

      {/* 2. メインコンテンツエリア */}
      <div className="w-full max-w-5xl px-4 md:px-6 py-8 flex flex-col items-center">
        {/* 質問リスト */}
        <div className="w-full">
          {questions &&
            currentAxis &&
            questions[currentAxis].map((question) => (
              <div
                key={question.id}
                id={`q${question.id.toString()}`}
                className="mb-8 scroll-mt-40" // アンカーリンク用にスクロール位置調整
              >
                {/* 質問カード */}
                <div className="w-full max-w-4xl bg-card px-4 py-8 md:px-12 md:py-10 rounded-xl shadow-xl border border-border mx-auto">
                  {/* 質問文 */}
                  <p className="text-xl md:text-2xl font-semibold mb-10 text-center text-foreground leading-relaxed">
                    {question.questionText}
                  </p>

                  {/* 回答選択肢エリア */}
                  <div className="flex items-center justify-center w-full">
                    {/* 「そう思う」ラベル */}
                    <div className="w-16 md:w-20 text-center mr-2 text-sm md:text-lg font-bold text-primary">
                      そう思う
                    </div>

                    {/* 葉っぱの選択肢 */}
                    <div className="flex justify-between items-center w-full max-w-2xl px-1 gap-2 md:gap-6">
                      {ANSWER_VALUES.map((value) => {
                        const isSelected =
                          currentAnswerValue[currentAxis]?.[question.id] ===
                          value;
                        const hasAnswer =
                          currentAnswerValue[currentAxis]?.[question.id] !==
                          undefined;

                        const sizeFactor = Math.abs(value) + 1;
                        const baseSize = 40;
                        const leafSize = baseSize + sizeFactor * 10;

                        return (
                          <button
                            key={value}
                            onClick={() => handleAnswer(question.id, value)}
                            aria-label={`回答: ${value}`}
                            className={`
                              relative rounded-full transition-all duration-300 ease-out flex items-center justify-center flex-shrink-0
                              ${
                                isSelected
                                  ? "scale-110 md:scale-125 opacity-100 z-10 ring-4 ring-primary ring-offset-2 ring-offset-card shadow-2xl"
                                  : hasAnswer
                                  ? "scale-90 opacity-40 grayscale blur-[1px] hover:grayscale-0 hover:opacity-100 hover:scale-100 hover:blur-0"
                                  : "hover:scale-110 opacity-90 hover:opacity-100"
                              }
                            `}
                            style={{
                              width: leafSize,
                              height: leafSize,
                              minWidth: leafSize,
                            }}
                          >
                            <Image
                              src={IMAGE_PATHS[Math.sign(value) + 1]}
                              alt={`回答: ${value}`}
                              fill
                              className={`
                                object-contain transition-all duration-300
                                ${
                                  isSelected
                                    ? "drop-shadow-lg"
                                    : "drop-shadow-none"
                                }
                              `}
                            />
                            {isSelected && (
                              <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1 shadow-md animate-in zoom-in duration-200">
                                <CheckCircle2
                                  className="w-3 h-3"
                                  strokeWidth={4}
                                />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* 「そう思わない」ラベル */}
                    <div className="w-16 md:w-20 text-center ml-2 text-sm md:text-lg font-bold text-muted-foreground">
                      そう思わない
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* 3. ナビゲーションボタン */}
        <div className="w-full max-w-4xl flex flex-col mt-4">
          {/* 未回答数の案内 */}
          {!isAllSelect && (
            <div className="text-center mb-6 animate-pulse">
              <span className="inline-block bg-amber-100 text-amber-800 text-sm font-bold px-6 py-2 rounded-full border border-amber-200 shadow-sm">
                このページであと {unSelected.length} 問 回答してください
              </span>
            </div>
          )}

          <div className="flex justify-between w-full">
            {axisNum > 0 ? (
              <Button
                onClick={handlePrev}
                className="px-8 py-6 h-auto text-lg rounded-full shadow-md text-white transition-all duration-200 bg-muted-foreground hover:bg-muted-foreground/90 hover:shadow-lg hover:scale-[1.02]"
              >
                <ArrowLeft className="w-5 h-5 mr-2" /> 戻る
              </Button>
            ) : (
              <div />
            )}

            {axisNum < 3 ? (
              <Button
                onClick={handleNext}
                disabled={!isAllSelect}
                className={`px-8 py-6 h-auto text-lg rounded-full shadow-lg text-white transition-all duration-200 
                      ${
                        isAllSelect
                          ? "bg-primary hover:bg-primary/90 hover:shadow-xl hover:scale-[1.05]"
                          : "bg-gray-300 cursor-not-allowed opacity-70"
                      }
                  `}
              >
                次へ <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button
                disabled={!isAllSelect}
                className={`px-8 py-6 h-auto text-lg rounded-full shadow-lg text-white transition-all duration-200 
                      ${
                        isAllSelect
                          ? "bg-primary hover:bg-primary/90 hover:shadow-xl hover:scale-[1.05]"
                          : "bg-gray-300 cursor-not-allowed opacity-70"
                      }
                  `}
                {...(isAllSelect ? { asChild: true } : { onClick: handleNext })}
              >
                {isAllSelect &&
                typeCode.Motivation &&
                typeCode.Scale &&
                typeCode.Approach &&
                typeCode.Stance ? (
                  <Link
                    href={`/diagnosis/result/${typeCode.Motivation}${typeCode.Scale}${typeCode.Approach}${typeCode.Stance}`}
                    onClick={saveDiagnosisData} // ★ここに追加！
                  >
                    結果を見る <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                ) : (
                  <>
                    結果を見る <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
