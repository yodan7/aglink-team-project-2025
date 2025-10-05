export type Farm = {
  id: string;
  name: string;
  type: "AFHO - 週末ガーデナータイプ" | "AFHP - のんびり家庭菜園タイプ" | "AFIO - ロマンティックファーマータイプ" | "AFIP - 週末研究家タイプ" |
        "ACHO - アグリインフルエンサータイプ" | "ACHP - 職人気質ガーデナータイプ" | "ACIO - 企業家アグリタイプ" | "ACIP - アーバンファーマータイプ" |
        "SFHO - ソーシャルアグリタイプ" | "SFHP - 堅実な家庭菜園タイプ" | "SFIO - 理系アグリタイプ" | "SFIP - ロジカル農家タイプ" |
        "SCHO - 週末チャレンジファーマータイプ" | "SCHP - プロフェッショナル農家タイプ" | "SCIO - テクノロジー農家タイプ" | "SCIP - 職人ファーマータイプ";
  location?: string;
  description: string;
  imageUrl: string;
};

export type Diagnosis = {
  type: "AFHO - 週末ガーデナータイプ" | "AFHP - のんびり家庭菜園タイプ" | "AFIO - ロマンティックファーマータイプ" | "AFIP - 週末研究家タイプ" |
        "ACHO - アグリインフルエンサータイプ" | "ACHP - 職人気質ガーデナータイプ" | "ACIO - 企業家アグリタイプ" | "ACIP - アーバンファーマータイプ" |
        "SFHO - ソーシャルアグリタイプ" | "SFHP - 堅実な家庭菜園タイプ" | "SFIO - 理系アグリタイプ" | "SFIP - ロジカル農家タイプ" |
        "SCHO - 週末チャレンジファーマータイプ" | "SCHP - プロフェッショナル農家タイプ" | "SCIO - テクノロジー農家タイプ" | "SCIP - 職人ファーマータイプ";
  description: string;
};

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