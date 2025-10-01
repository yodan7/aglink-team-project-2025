export type Farm = {
  id: string;
  name: string;
  type: "週末農業タイプ" | "家庭菜園タイプ";
  location?: string;
  description: string;
  imageUrl: string;
};

export type Diagnosis = {
  type: "週末農業タイプ" | "家庭菜園タイプ";
  description: string;
};
// src/types/index.ts

/**
 * SD法診断の単一の設問データ
 */
export type DiagnosisQuestion = {
  id: string; // 設問のユニークなID (例: 'health', 'growth')
  label: string; // 設問テキスト (例: '作物の健康状態')
  left: string; // 左側の対立形容詞 (例: '弱い')
  right: string; // 右側の対立形容詞 (例: '強い')
  scaleMax: 7; // スケールの最大値 (SD法では通常7)
};

/**
 * SD法診断の回答結果（クライアントで一時保持するデータ）
 * 例: { health: 6, growth: 2, appearance: 5 }
 */
export type DiagnosisAnswer = {
  [questionId: string]: number | undefined; // 1 から 7 の値、未回答は undefined
};

/**
 * 診断結果（データベースに保存され、結果ページで表示されるデータ）
 */
export type DiagnosisResult = {
  id: string;
  userId: string;
  farmId: string;
  timestamp: string;
  scores: DiagnosisAnswer; // 評価スコア
  // ... その他の結果データ
};