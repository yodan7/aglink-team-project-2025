"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { AnswerValue } from "@/types";
import { useQuestions } from "@/hooks/useQuestions";
import { useQuestionsNavigation } from "@/hooks/useQuestionsNavigation";
import { useQuestionsProgress } from "@/hooks/useQuestionsProgress";

// 定数も型安全に
const ANSWER_VALUES: AnswerValue[] = [2, 1, 0, -1, -2] as const;

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
    typeCode, //result画面に受け渡す
    axisNum,
    setAxisNum,
    error,
    handleAnswer,
    axisList,
    currentAxis,
  } = useQuestions();

  const { unSelected, isAllSelect, axisValue } = useQuestionsProgress(
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

  // エラー表示の追加
  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    // ★ 修正1: 垂直方向のパディングを大幅に削減 (p-4 md:p-6 に変更)
    <div
      className={`flex flex-col items-center p-4 md:p-6 min-h-screen bg-background`}
    >
      {/* 0. ロゴとタイトルエリア */}
      <div className="w-full max-w-5xl flex flex-col items-center justify-center mb-6 md:mb-8 pt-4">
        {/* ロゴ画像 */}
        <Image
          src={IMAGE_PATHS[3]}
          alt="Aglink ロゴ"
          width={80}
          height={20}
          className="mb-2 object-contain h-12 w-auto" // ロゴの高さを少し縮小
        />

        {/* タイトル */}
        <h1 className="text-xl md:text-2xl font-bold text-center text-foreground">
          農業スタイル診断
        </h1>
      </div>

      {/* 1. 進行度バーエリア */}
      {/* ★ 修正2: 下部マージンを削減 (mb-6 に変更) */}
      <div className="w-full max-w-5xl mb-6 pt-2">
        <h2
          className={`text-sm font-semibold text-gray-600 mb-1 text-foreground`}
        >
          {currentAxis ? `${currentAxis}軸の質問` : "読み込み中..."}
          {questions &&
            currentAxis &&
            ` (${questions[currentAxis]?.length || 0}問)`}
        </h2>
        <div className="relative w-full h-2 rounded-full bg-muted overflow-hidden">
          {" "}
          {/* Progress Bar の高さを h-2 に縮小 */}
          <div
            className={`h-full rounded-full transition-all duration-500 ease-in-out bg-primary`}
            style={{
              width: `${questions ? ((axisNum + 1) / 4) * 100 : 0}%`,
            }}
          />
        </div>
      </div>
      <div>
        {questions &&
          currentAxis &&
          questions[currentAxis].map((question) => (
            <div
              key={question.id}
              id={`q${question.id.toString()}`}
              className="mb-6"
            >
              {/* 2. 質問カード/コンテナ */}
              {/* ★ 修正3: カードの垂直パディングを削減 (py-6 md:py-8 に変更) */}
              <div className="w-full max-w-4xl bg-card px-8 py-6 md:px-12 md:py-8 rounded-xl shadow-xl border border-border flex-shrink-0">
                {/* 質問文 */}
                {/* ★ 修正4: 質問文の下部マージンを削減 (mb-8 に変更) */}
                <p
                  className={`text-xl md:text-2xl font-semibold mb-8 text-center text-foreground`}
                >
                  {question.questionText}
                </p>

                {/* 3. 回答選択肢エリア */}
                <div className="flex items-center justify-center w-full">
                  {/* 「そう思う」を左端に配置 */}
                  <div className="w-20 text-center mr-2 text-base md:text-lg font-medium">
                    <span className="text-primary">そう思う</span>
                  </div>

                  {/* 葉っぱの選択肢コンテナ */}
                  <div className="flex justify-between items-end w-full max-w-2xl px-2 md:px-4">
                    {ANSWER_VALUES.map((value) => {
                      // サイズ調整ロジック (省略)
                      const sizeFactor = Math.abs(value) + 1;
                      const baseSize = 40;
                      const leafSize = baseSize + sizeFactor * 10; // 葉っぱサイズもわずかに縮小

                      // 現在選択されているかをチェック（オブジェクト形式）
                      const isSelected =
                        currentAnswerValue[currentAxis]?.[question.id] ===
                        value;

                      return (
                        <button
                          key={value}
                          className={`
                        relative transition-all duration-200 ease-in-out cursor-pointer p-0.5
                        ${
                          isSelected
                            ? "scale-[1.1] shadow-lg rounded-full"
                            : "hover:scale-[1.05]"
                        }
                      `}
                          style={{
                            width: leafSize,
                            height: leafSize,
                            minWidth: leafSize,
                          }}
                          aria-label={`回答: ${value}`}
                          onClick={() => handleAnswer(question.id, value)}
                        >
                          <Image
                            src={IMAGE_PATHS[Math.sign(value) + 1]}
                            alt={`回答: ${value}`}
                            fill
                            className={`
                          object-contain transition-all duration-200 
                          ${
                            isSelected
                              ? "filter saturate-[200%] drop-shadow-lg"
                              : "opacity-70 hover:opacity-100"
                          }
                        `}
                            style={{
                              filter: isSelected
                                ? "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))"
                                : "none",
                            }}
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* 「そう思わない」を右端に配置 */}
                  <div className="w-20 text-center ml-2 text-base md:text-lg font-medium">
                    <span className="text-muted-foreground">そう思わない</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* 4. ナビゲーションボタン */}
      {/* ★ 修正5: 上部マージンを削減 (mt-6 に変更) */}
      <div className="w-full max-w-4xl flex justify-between mt-6">
        {axisNum > 0 ? (
          <Button
            onClick={handlePrev}
            className={`px-6 py-2 rounded-md shadow-md text-white transition-all duration-200 bg-muted-foreground hover:bg-muted-foreground/90 hover:shadow-lg hover:scale-[1.02]`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> 戻る
          </Button>
        ) : (
          <div />
        )}

        {axisNum < 3 ? (
          <Button
            onClick={handleNext}
            className={`px-6 py-2 rounded-md shadow-md text-white transition-all duration-200 bg-primary hover:bg-primary/90 hover:shadow-lg hover:scale-[1.02]`}
          >
            次へ <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            className={`px-6 py-2 rounded-md shadow-md text-white transition-all duration-200 bg-primary hover:bg-primary/90 hover:shadow-lg hover:scale-[1.02]`}
            {...(isAllSelect ? { asChild: true } : { onClick: handleNext })}
          >
            {isAllSelect ? (
              <Link
                href={`/diagnosis/result/${typeCode.Motivation}${typeCode.Scale}${typeCode.Approach}${typeCode.Stance}`}
              >
                結果を見る <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            ) : (
              <>
                結果を見る <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
