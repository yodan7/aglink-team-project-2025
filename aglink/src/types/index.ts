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
  imageUrl: string; // キャメルケースに変更
};

export type Section = {
  title: string;
  content: string;
};

export type PlanDetails = {
  planName: string; // キャメルケースに変更
  sections?: Section[];
  startDate?: string;
  endDate?: string;
  durationMinutes?: number;
  price?: number;
  capacityMin?: number;
  capacityMax?: number;
};

export type Farm = BaseFarm &
  AgriTypePair & {
    plans: PlanDetails[]; // キャメルケースに変更
  };

export type NewFarmInput = Array<
  | { name: string }
  | { location: string }
  | { description: string }
  | { imageUrl: string }
  | { code: AgriTypePair["code"] }
  | { type: AgriTypePair["type"] }
>;

//申し込みフォーム型
export type BookingFormInput = {
  desiredDate: string; // "YYYY-MM-DD"形式
  participants: number; //参加人数
  representativeName: string; //代表者氏名
  farmId?: Farm["id"];
  // 必要であれば farmId や planId も追加
};

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
export type AxisCategory = "Motivation" | "Scale" | "Approach" | "Stance";

export type MotivationAxisValue = "A" | "S";
export type ScaleAxisValue = "F" | "C";
export type ApproachAxisValue = "H" | "I";
export type StanceAxisValue = "O" | "P";

// 診断で使う「質問」の型を定義
export type DiagnosisQuestion = {
  id: number; // 1, 2 など
  questionText: string; // "育てる野菜は、個性的な品種に魅力を感じる。"
  axis: "Motivation" | "Scale" | "Approach" | "Stance"; // どの軸か

  // poleプロパティを追加
  pole:
    | MotivationAxisValue
    | ScaleAxisValue
    | ApproachAxisValue
    | StanceAxisValue; // "A", "S", "F", "C"など
};

export type GroupedQuestions = {
  [K in AxisCategory]: DiagnosisQuestion[];
};

// ✅ より厳密な型定義
export type AnswerValue = 2 | 1 | -1 | -2;
export type AxisAnswers = Record<string, AnswerValue>; //オブジェクト形式
export type AnswerObjectType = {
  Motivation: AxisAnswers; // オブジェクト形式に変更
  Scale: AxisAnswers;
  Approach: AxisAnswers;
  Stance: AxisAnswers;
};

//　診断結果画面で使う型定義
// 軸の詳細情報
export type AxisDetail = {
  axisValue: "A" | "S" | "F" | "C" | "H" | "I" | "O" | "P";
  axisCategory: AxisCategory;
  name: string;
  description: string;
};

// サポート情報
export type SupportInfo = {
  code: AgriTypePair["code"];
  category: string;
  title: string;
  description: string;
  resourceLinks: string;
};

export type Bookmark = {
  id: string;
  user_id: string;
  farm_id: string;
  created_at: string;
  farm?: Farm; // 関連する農地情報
};
