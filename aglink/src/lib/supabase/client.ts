import { createBrowserClient } from "@supabase/ssr";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabaseの環境変数が設定されていません");
}

export const createClient = () => {
  return createBrowserClient(supabaseUrl, supabaseKey);
};
