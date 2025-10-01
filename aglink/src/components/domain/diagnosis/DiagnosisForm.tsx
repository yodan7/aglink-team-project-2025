// src/components/domain/diagnosis/DiagnosisForm.tsx

'use client'; //
import React, { useState } from 'react';
import { SDScaleRow } from './SDScaleRow'; // 作成したSDScaleRowをインポート
// ui/Card, Buttonの型が見つからないため、ここでは仮の型を適用します。
// 実際のshadcn/uiでは import { Card } from '@/components/ui/card' のようになります。
// @ts-ignore: 仮のコンポーネントとして無視
import { Card } from '../../ui/Card'; 
import { Button } from '../../ui/button'; 
import { DiagnosisAnswer, DiagnosisQuestion } from '@/types';
// import { saveDiagnosisAction } from '@/lib/actions'; // Server Actionを想定

// SD法設問データのモック
const SD_QUESTIONS: DiagnosisQuestion[] = [
  { id: 'health', label: '作物の健康状態', left: '弱い', right: '強い', scaleMax: 7 },
  { id: 'growth', label: '成長の勢い', left: '遅い', right: '早い', scaleMax: 7 },
  { id: 'vigor', label: '葉の活力', left: '元気がない', right: '生き生きとしている', scaleMax: 7 },
  { id: 'purity', label: '品質の清潔感', left: '汚い', right: 'きれい', scaleMax: 7 },
];

export const DiagnosisForm: React.FC = () => {
  // 回答を保持する状態 (key: questionId, value: 1-7 or undefined)
  const [answers, setAnswers] = useState<DiagnosisAnswer>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 全ての質問に回答済みかチェック
  const isFormComplete = SD_QUESTIONS.every(q => answers[q.id] !== undefined);

  // SDScaleRowからの回答変更ハンドラ
  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // フォーム送信ハンドラ
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isFormComplete) {
      setError('全ての質問に回答してください。');
      return;
    }

    setIsSubmitting(true);
    
    // バックエンドへの送信処理 (Server Actionを想定)
    try {
      // ユーザーIDや農場IDも必要に応じて追加して送信
      const diagnosisData = { 
        ...answers, 
        // ユーザーID, 農場ID, タイムスタンプなどのデータ
      };

      // 実際の送信処理（例：Server Actionの呼び出し）
      // await saveDiagnosisAction(diagnosisData); 
      
      // 診断結果ページへリダイレクト
      window.location.href = '/diagnosis/result'; 

    } catch (err) {
      setError('診断結果の保存に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Cardコンポーネントは、ここでは単純なdivとして実装
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">作物健康状態 SD法診断</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {SD_QUESTIONS.map((q) => (
            <SDScaleRow
              key={q.id}
              id={q.id}
              label={q.label}
              left={q.left}
              right={q.right}
              value={answers[q.id]}
              onChange={(value) => handleAnswerChange(q.id, value)}
            />
          ))}
        </div>
        
        {error && (
          <p className="mt-4 text-red-500 font-medium text-center">{error}</p>
        )}

        <Button 
          type="submit" 
          disabled={!isFormComplete || isSubmitting} 
          className={`w-full mt-8 py-3 text-lg ${
            !isFormComplete ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isSubmitting ? '診断中...' : '結果を診断する'}
        </Button>
      </form>
    </div>
  );
};