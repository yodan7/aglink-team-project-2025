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
