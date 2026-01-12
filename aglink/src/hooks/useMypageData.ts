import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Bookmark } from "@/types";

// 型定義
export type ProfileState = {
  id: string;
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

export type AvatarRestult = {
  success: boolean;
  path?: string;
  url?: string;
  error?: unknown;
};

// デフォルトのゲストアイコンURL
// ★セキュリティ: 環境変数を使用してSupabase URLを動的に構築
const DEFAULT_AVATAR_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/guest/avatar.png`;

export const useMypageData = () => {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);

  // プロフィール状態（デフォルト値を設定）
  const [profile, setProfile] = useState<ProfileState>({
    id: "guest",
    name: "ゲスト",
    avatar: DEFAULT_AVATAR_URL, // デフォルトアイコン
    email: "",
    gender: "",
    age: "",
    address: "",
  });
  const [uploading, setUploading] = useState(false);

  // プロフィール画像をアップロードする関数
  const uploadAvatar = async (
    userId: string,
    file: File
  ): Promise<AvatarRestult> => {
    try {
      setUploading(true);

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        throw new Error(
          "ファイルサイズが大きすぎます。5MB以下にしてください。"
        );
      }

      const fileExt = file.name.split(".").pop()?.toLowerCase();
      if (
        !fileExt ||
        !["jpg", "jpeg", "png", "gif", "webp"].includes(fileExt)
      ) {
        throw new Error(
          "対応していないファイル形式です。JPG, PNG, GIF, WebP のみ対応しています。"
        );
      }

      //ファイル名を固定し上書き保存による更新を可能にする
      //拡張子の違いはブラウザ側で自動解釈されることを利用
      //fromでavatarsにアクセスするので、PathNameはavatars/以下のパスになるようにする
      const PathName = `${userId}/avatar.png`;

      //DBとは違い、storageというGoogleドライブのような場所にファイルを保存する
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(PathName, file, { upsert: true }); // upsert: trueで削除処理を書かずに上書き可能
      if (uploadError) throw uploadError;

      // アップロードした画像の公開URLを取得
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(PathName);

      console.log("Saving URL to DB:", publicUrl); // ★ログ確認: 保存しようとしているURL

      // プロフィールテーブル更新
      // ★ .select() を追加して、更新結果を受け取れるように変更
      const { data: updateData, error: updateError } = await supabase
        .from("profiles")
        .update({
          avatar_url: publicUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)
        .select();

      if (updateError) throw updateError;

      // ★ 更新結果のチェック
      console.log("DB Update Result:", updateData);
      if (!updateData || updateData.length === 0) {
        console.warn(
          "⚠️ DBの更新件数が0件です。profilesテーブルに行が存在しないか、RLSポリシーでブロックされています。"
        );
        // ここで insert を試みる（upsert的挙動）ことも可能ですが、まずはログで原因特定します
      }

      // ★ここが重要: DB更新成功後、画面のStateも更新する
      // これによりリロードしなくても新しい画像が表示されます
      // さらにキャッシュ回避パラメータを付与して即時反映させる
      const newDisplayUrl = `${publicUrl}?t=${new Date().getTime()}`;

      setProfile((prev) => ({
        ...prev,
        avatar: newDisplayUrl,
      }));

      return {
        success: true,
        path: PathName,
        url: publicUrl,
      };
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("アバターのアップロードに失敗しました。もう一度お試しください。");
      return { success: false, error };
    } finally {
      setUploading(false);
    }
  };

  // キャッシュ回避用のURLを生成するヘルパー関数
  // 画像のURLが変わらないため、時刻を含めたURLを生成することで最新画像を取得できるようにする
  const getAvatarUrl = (path: string | undefined) => {
    if (!path) return DEFAULT_AVATAR_URL;

    // 既存pathをもう一度publicUrlに変換してから時刻パラメータを付与して返す
    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    const publicUrl = data.publicUrl;

    return `${publicUrl}?t=${new Date().getTime()}`;
  };

  // 最新の診断結果ステート
  const [latestDiagnosis, setLatestDiagnosis] =
    useState<DiagnosisResult | null>(null);

  // ブックマークステート
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  /**
   * DBから取得したアバターの値（パス or URL or null）を
   * 表示可能な完全なURLに変換するヘルパー関数
   */
  const resolveAvatarUrl = (rawUrl: string | null | undefined): string => {
    // 1. 値がない、または無効な文字列の場合はデフォルトを返す
    if (
      !rawUrl ||
      typeof rawUrl !== "string" ||
      rawUrl === "{}" ||
      rawUrl.trim() === ""
    ) {
      return DEFAULT_AVATAR_URL;
    }

    // 2. すでにhttpから始まる完全なURLならそのまま返す
    if (rawUrl.startsWith("http")) {
      return rawUrl;
    }

    // 3. パス形式（例: "avatars/uid/img.png"）ならPublicURLに変換する
    const { data } = supabase.storage.from("avatars").getPublicUrl(rawUrl);
    return data.publicUrl;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. ログインユーザー取得
        const {
          data: { user },
        } = await supabase.auth.getUser();

        // ログインしていない場合はサインイン画面へリダイレクト
        if (!user) {
          router.push("/signin");
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

        // Promise.allで並列取得
        // ユーザー情報と診断結果を同時に取得することで待ち時間を短縮、値を受け渡す
        const [profileRes, diagnosisRes] = await Promise.all([
          profilePromise,
          diagnosisPromise,
        ]);
        // --- 並列取得終了 ---

        // 2. プロフィールのセット
        // DBの値、Authメタデータ、デフォルト値の優先順位で解決
        const rawAvatar =
          profileRes.data?.avatar_url || user.user_metadata?.avatar_url;

        // ★ここで変換関数を通すことで、どんな値が来ても安全なURLにする
        const safeAvatarUrl = resolveAvatarUrl(rawAvatar);

        // 2. プロフィールのセット（DBになければAuth情報のメタデータやデフォルト値を使用）
        if (profileRes.data) {
          setProfile({
            id: profileRes.data.id || user.user_metadata?.id || "guest",
            name:
              profileRes.data.display_name ||
              user.user_metadata?.full_name ||
              "ゲスト",
            avatar: safeAvatarUrl,
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
            id: user.user_metadata?.id || "guest",
            avatar: safeAvatarUrl,
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
    uploadAvatar,
    getAvatarUrl,
    uploading,
  };
};
