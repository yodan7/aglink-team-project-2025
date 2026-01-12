"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();

  // 1. ログイン中のユーザーを取得
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return { error: "ユーザーが見つかりません" };
  }

  // 2. フォームから更新データを取得
  const name = formData.get("name") as string;
  // genderは select なので空文字も許容
  const gender = formData.get("gender") as string;
  // ageは数値変換。空文字ならnullにする
  const ageRaw = formData.get("age") as string;
  const age = ageRaw ? parseInt(ageRaw) : null;
  const address = formData.get("address") as string;

  // 【修正ポイント】
  // ここで formData.get("avatar") を取得して update に含めていたのが原因です。
  // input type="file" から送られるデータは「ファイルオブジェクト」であり、「URL文字列」ではありません。
  // これをDBに保存するとデータが壊れてしまいます。
  // 画像のURL更新はクライアント側の uploadAvatar 関数ですでに完了しているので、ここでは何もしなくてOKです。

  // 3. プロフィールテーブルを更新
  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: name,
      // avatar_url: avatar_url, // ← ★この行を削除しました！
      gender,
      age,
      address,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    console.error("Profile update error:", error);
    return { error: "プロフィールの更新に失敗しました" };
  }

  // 4. キャッシュを更新して画面に反映させる
  revalidatePath("/mypage");
  return { success: true };
}
