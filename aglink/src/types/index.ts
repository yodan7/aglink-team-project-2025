export type Farm = {
  id: string;
  name: string;
  type: "AFHO" | "AFHP - のんびり農業タイプ" | "AFIO" | "AFIP" |
        "ACHO" | "ACHP" | "ACIO" | "ACIP" |
        "SFHO" | "SFHP" | "SFIO" | "SFIP" |
        "SCHO" | "SCHP" | "SCIO" | "SCIP";
  location?: string;
  description: string;
  imageUrl: string;
};

export type Diagnosis = {
  type: "AFHO" | "AFHP - のんびり農業タイプ" | "AFIO" | "AFIP" |
        "ACHO" | "ACHP" | "ACIO" | "ACIP" |
        "SFHO" | "SFHP" | "SFIO" | "SFIP" |
        "SCHO" | "SCHP" | "SCIO" | "SCIP";
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
