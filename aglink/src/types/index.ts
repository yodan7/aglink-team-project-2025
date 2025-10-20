export type AgriTypePair =
  | { code: "AFHO"; type: "週末ガーデナータイプ" }
  | { code: "AFHP"; type: "のんびり家庭菜園タイプ" }
  | { code: "AFIO"; type: "ロマンティックファーマータイプ" }
  | { code: "AFIP"; type: "週末研究家タイプ" }
  | { code: "ACHO"; type: "アグリインフルエンサータイプ" }
  | { code: "ACHP"; type: "職人気質ガーデナータイプ" }
  | { code: "ACIO"; type: "企業家アグリタイプ" }
  | { code: "ACIP"; type: "アーバンファーマータイプ" }
  | { code: "SFHO"; type: "ソーシャルアグリタイプ" }
  | { code: "SFHP"; type: "堅実な家庭菜園タイプ" }
  | { code: "SFIO"; type: "理系アグリタイプ" }
  | { code: "SFIP"; type: "ロジカル農家タイプ" }
  | { code: "SCHO"; type: "週末チャレンジファーマータイプ" }
  | { code: "SCHP"; type: "プロフェッショナル農家タイプ" }
  | { code: "SCIO"; type: "テクノロジー農家タイプ" }
  | { code: "SCIP"; type: "職人ファーマータイプ" };

export type BaseFarm = {
  id: string;
  name: string;
  location?: string;
  description: string;
  imageUrl: string;
};

export type Farm = BaseFarm & AgriTypePair;

export type NewFarmInput = Array<
  | { name: string }
  | { location: string }
  | { description: string }
  | { imageUrl: string }
  | { code: AgriTypePair["code"] }
  | { type: AgriTypePair["type"] }
>;

export type BaseDiagnosis = {
  description: string;
};

export type Diagnosis = BaseDiagnosis & AgriTypePair;

export type Profile = {
  id: string; //DBから提供されるID
  username: string;
};

export type LoginInput = {
  username: string;
  password: string;
};

export type SignUpInput = {
  username: string;
  password: string;
};
export type QuestionAxis = "Motivation" | "Scale" | "Approach" | "Stance";

export type MotivationAxis = "A" | "S";
export type ScaleAxis = "F" | "C";
export type ApproachAxis = "H" | "I";
export type StanceAxis = "O" | "P";

// 診断で使う「質問」の型を定義
export type DiagnosisQuestion = {
  id: number; // 1, 2 など
  questionText: string; // "育てる野菜は、個性的な品種に魅力を感じる。"
  axis: "Motivation" | "Scale" | "Approach" | "Stance"; // どの軸か

  // poleプロパティを追加
  pole: MotivationAxis | ScaleAxis | ApproachAxis | StanceAxis; // "A", "S", "F", "C"など
};

export type GroupedQuestions = {
  [K in QuestionAxis]: DiagnosisQuestion[];
};

// ✅ より厳密な型定義
export type AnswerValue = 2 | 1 | 0 | -1 | -2;
export type AxisAnswers = Record<string, AnswerValue>; //オブジェクト形式
export type AnswerObjectType = {
  Motivation: AxisAnswers; // オブジェクト形式に変更
  Scale: AxisAnswers;
  Approach: AxisAnswers;
  Stance: AxisAnswers;
};
