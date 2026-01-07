"use server";

import { createClient } from "@/lib/supabase/server";

export async function saveDiagnosisResult(code: string) {
  const supabase = await createClient();

  // 1. ログインユーザーを確認
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 2. ログインしていなければ何もせず終了（ゲストユーザー）
  if (!user) {
    return { success: true, saved: false };
  }

  // 3. ログインしていれば保存
  const { error } = await supabase.from("diagnosis_results").insert({
    user_id: user.id,
    code: code,
    // created_at はデフォルト値(now())が入るはずなので省略
  });

  if (error) {
    console.error("Diagnosis save error:", error);
    return { success: false, error: error.message };
  }

  return { success: true, saved: true };
}
