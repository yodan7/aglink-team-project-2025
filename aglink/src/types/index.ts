export type FarmType = "週末農業タイプ" | "家庭菜園タイプ";

export type Farm = {
  id: string;
  name: string;
  farmType: FarmType;
  location?: string;
  description: string;
  imageUrl: string;
};

export type Diagnosis = {
  farmType: FarmType;
  description: string;
};
