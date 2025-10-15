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

export type MotivationAxis = "A" | "S";
export type ScaleAxis = "F" | "C";
export type ApproachAxis = "H" | "I";
export type StanceAxis = "O" | "P";

// 診断で使う「質問」の型を定義
export type DiagnosisQuestion = {
  id: string; // "q1", "q2" など
  questionText: string; // "収穫した野菜は、主にどうしたいですか？"
  axis: "Motivation" | "Scale" | "Approach" | "Stance"; // この質問がどの軸に関するものか
  // options はリスト
  // 現在は質問に対する回答は複数の選択肢から選ぶスタイルになっているけどSD法とかになるかもしれない？
  options: {
    text: string; // "自分で食べたり、おすそ分けして喜んでもらいたい。"
    value: MotivationAxis | ScaleAxis | ApproachAxis | StanceAxis; // "A", "F", "H", "P" など
  }[];
};