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
