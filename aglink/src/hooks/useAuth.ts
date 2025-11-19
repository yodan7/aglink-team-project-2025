type User = {
  id?: string;
  name: string;
  avatar?: string;
};

type RecentDiagnosis = {
  type: string;
  date: string;
  summary: string;
};

// 開発時のモック認証フック (フロントのみ)。本番では Supabase 等に置き換える。
export const useAuth = () => {
  const user: User = {
    id: "mock-user-1",
    name: "山田 太郎",
    avatar: "https://placehold.co/96x96/8CB389/ffffff?text=YT",
  };

  const recentDiagnosis: RecentDiagnosis = {
    type: "家庭菜園タイプ",
    date: "2025-09-20",
    summary: "ミニトマト栽培が向いています。初心者向けの育て方ガイドがおすすめです。",
  };

  return {
    user,
    recentDiagnosis,
  };
};
