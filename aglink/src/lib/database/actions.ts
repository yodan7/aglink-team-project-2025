"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginState = {
  error?: string | null;
  message?: string | null;
};

export type SignupState = {
  error?: string | null;
  message?: string | null;
};

// ログイン処理
export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // バリデーション（簡易）
  if (!email || !password) {
    return { error: "メールアドレスとパスワードを入力してください。" };
  }
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // エラーがある場合はリダイレクト先にパラメータをつける（簡易的なエラー表示のため）
      console.log("ログインエラーです");

      return { error: "メールアドレスかパスワードが間違っています" };
    }
  } catch (error) {
    console.error("Authentication error:", error);
    console.log(error?.toString());

    return { error: "認証中にエラーが発生しました。" };
  }
  // 成功したらマイページへ
  // リダイレクトは必ずエラーを投げるので、ここで関数を抜ける
  redirect("/mypage");
}

// 新規登録処理
export async function signup(
  prevState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // バリデーション（簡易）
  if (!email || !password) {
    return { error: "メールアドレスとパスワードを入力してください。" };
  }

  try {
    // ユーザー登録（Supabaseトリガーが自動的にprofilesテーブルにレコードを作成）
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return { error: "ユーザー登録に失敗しました。" };
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return { error: "認証中にエラーが発生しました。" };
  }
  // 成功時のリダイレクト（メール確認画面を挟むか、自動ログイン設定ならマイページへ）
  // ※ Supabase設定で「メール確認」がONの場合、ここで「メールを確認してください」画面へ飛ばすのが一般的です

  // リダイレクトは必ずエラーを投げるので、ここで関数を抜ける
  redirect("/signup/success");
}
