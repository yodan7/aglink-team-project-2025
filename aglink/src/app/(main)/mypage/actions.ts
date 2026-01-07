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
  const avatar_url = formData.get("avatar") as string;
  // genderは select なので空文字も許容
  const gender = formData.get("gender") as string;
  // ageは数値変換。空文字ならnullにする
  const ageRaw = formData.get("age") as string;
  const age = ageRaw ? parseInt(ageRaw) : null;
  const address = formData.get("address") as string;

  // 3. プロフィールテーブルを更新
  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: name, // DBのカラム名は display_name
      avatar_url: avatar_url,
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
