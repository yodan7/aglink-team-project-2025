import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Bookmark } from "@/types";

// 型定義
export type ProfileState = {
  name: string;
  avatar: string;
  email: string;
  gender: string;
  age: number | "";
  address: string;
};

export type DiagnosisResult = {
  code: string;
  created_at: string;
};

export const useMypageData = () => {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);

  // プロフィール状態（デフォルト値を設定）
  const [profile, setProfile] = useState<ProfileState>({
    name: "ゲスト",
    avatar: "https://placehold.co/96x96/8CB389/ffffff?text=User", // デフォルトアイコン
    email: "",
    gender: "",
    age: "",
    address: "",
  });

  // 最新の診断結果ステート
  const [latestDiagnosis, setLatestDiagnosis] =
    useState<DiagnosisResult | null>(null);

  // ブックマークステート
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. ログインユーザー取得
        const {
          data: { user },
        } = await supabase.auth.getUser();

        // ログインしていない場合はログイン画面へリダイレクト
        if (!user) {
          router.push("/login");
          return;
        }

        // --- 並列取得開始 ---
        const profilePromise = supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        // 診断結果テーブルから最新1件を取得
        const diagnosisPromise = supabase
          .from("diagnosis_results")
          .select("code, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        const [profileRes, diagnosisRes] = await Promise.all([
          profilePromise,
          diagnosisPromise,
        ]);
        // --- 並列取得終了 ---

        // 2. プロフィールのセット（DBになければAuth情報のメタデータやデフォルト値を使用）
        if (profileRes.data) {
          setProfile({
            name:
              profileRes.data.display_name ||
              user.user_metadata?.full_name ||
              "ゲスト",
            avatar:
              profileRes.data.avatar_url ||
              user.user_metadata?.avatar_url ||
              "https://placehold.co/96x96/8CB389/ffffff?text=User",
            email: user.email || "",
            gender: profileRes.data.gender || "",
            age: profileRes.data.age || "",
            address: profileRes.data.address || "",
          });
        } else {
          // profilesテーブルにレコードがない場合のフォールバック
          setProfile((prev) => ({
            ...prev,
            email: user.email || "",
            name: user.user_metadata?.full_name || "ゲスト",
          }));
        }

        // 3. 診断結果のセット（なければnullのまま＝「診断していません」表示になる）
        if (diagnosisRes.data) {
          setLatestDiagnosis({
            code: diagnosisRes.data.code,
            created_at: new Date(
              diagnosisRes.data.created_at
            ).toLocaleDateString("ja-JP"),
          });
        }

        // 4. ブックマークを取得
        const { data: bookmarksData, error: bookmarksError } = await supabase
          .from("bookmarks")
          .select(`
            id,
            user_id,
            farm_id,
            created_at,
            farms (
              id,
              name,
              location,
              image_url,
              type
            )
          `)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (bookmarksError) {
          console.error("Error fetching bookmarks:", bookmarksError);
        } else {
          setBookmarks(bookmarksData || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]); // routerを依存配列に追加

  return {
    profile,
    latestDiagnosis,
    bookmarks,
    loading,
    setProfile, // UI側での楽観的更新のためにsetterも返す
  };
};
