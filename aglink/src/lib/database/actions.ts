"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// ログイン処理
export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // エラーがある場合はリダイレクト先にパラメータをつける（簡易的なエラー表示のため）
    console.log("ログインエラーです");

    return redirect("/signin?message=Could not authenticate user");
  }

  // 成功したらマイページへ
  redirect("/mypage");
}

// 新規登録処理
export async function signup(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string; // 登録時は名前も受け取る

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // ここで渡したデータが、SQLトリガー経由でprofilesテーブルに入ります
      data: {
        full_name: fullName,
        avatar_url: "", // 初期アイコンは空文字などでOK
      },
    },
  });

  if (error) {
    return redirect("/signin?message=Could not authenticate user");
  }

  // 成功時のリダイレクト（メール確認画面を挟むか、自動ログイン設定ならマイページへ）
  // ※ Supabase設定で「メール確認」がONの場合、ここで「メールを確認してください」画面へ飛ばすのが一般的です
  redirect("/mypage?message=Check email to continue sign in process");
}
