import { createClient } from "@/lib/supabase/client";

/* 
=== 今後の展望：より厳密な型定義とエラーハンドリング ===

import { AuthResponse, AuthError, User } from "@supabase/supabase-js";

export type AuthResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  errorCode?: string;
};

const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < 8) {
    return { isValid: false, message: "パスワードは8文字以上である必要があります" };
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return { 
      isValid: false, 
      message: "パスワードには大文字、小文字、数字を含む必要があります" 
    };
  }
  return { isValid: true };
};

const validateEmail = (email: string): { isValid: boolean; message?: string } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: "有効なメールアドレスを入力してください" };
  }
  return { isValid: true };
};

const getErrorMessage = (error: AuthError): string => {
  switch (error.message) {
    case "Invalid login credentials":
      return "メールアドレスまたはパスワードが間違っています";
    case "Email not confirmed":
      return "メールアドレスの確認が完了していません";
    case "User already registered":
      return "このメールアドレスは既に登録されています";
    default:
      return error.message || "認証エラーが発生しました";
  }
};
*/

/**
 * ユーザー登録（シンプル版）
 */
export const signUp = async (email: string, password: string) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "https://example.com/welcome",
      },
    });

    if (error) {
      console.error("サインアップエラー:", error.message);
      return { success: false, error: error.message };
    }

    console.log("サインアップ成功:", data);
    return { success: true, data };
  } catch (error) {
    console.error("予期しないエラー:", error);
    return { success: false, error: "システムエラーが発生しました" };
  }
};

/**
 * ログイン（シンプル版）
 */
export const signIn = async (email: string, password: string) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error("サインインエラー:", error.message);
      return { success: false, error: error.message };
    }

    console.log("サインイン成功:", data);
    return { success: true, data };
  } catch (error) {
    console.error("予期しないエラー:", error);
    return { success: false, error: "システムエラーが発生しました" };
  }
};

/**
 * パスワードリセット用メール送信（シンプル版）
 */
export const sendPasswordResetEmail = async (email: string) => {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://example.com/account/update-password",
    });

    if (error) {
      console.error("パスワードリセットエラー:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("予期しないエラー:", error);
    return { success: false, error: "システムエラーが発生しました" };
  }
};

/**
 * パスワード更新（シンプル版）
 */
export const updatePassword = async (password: string) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      console.error("パスワード更新エラー:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("予期しないエラー:", error);
    return { success: false, error: "システムエラーが発生しました" };
  }
};

/*
=== 今後の展望：追加する予定の機能 ===

// ログアウト
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// 現在のユーザー情報を取得
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// 認証状態の監視
export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user ?? null);
  });
};
*/

// デフォルトエクスポート
const authService = {
  signUp,
  signIn,
  sendPasswordResetEmail,
  updatePassword,
};

export default authService;
