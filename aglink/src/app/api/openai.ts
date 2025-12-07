import "server-only";
import OpenAI from "openai";

// 1. 環境変数が設定されているかチェック
if (!process.env.GPT_API_KEY) {
    // APIキーがない場合、サーバー側のエラーとして停止させます
    throw new Error("GPT_API_KEY 環境変数がサーバー環境に設定されていません。");
}

const openai = new OpenAI({
  apiKey: process.env.GPT_API_KEY.trim(),
  baseURL: "https://api.openai.iniad.org/api/v1",
});

export async function ask(content: string) {
  // メッセージを送信
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: content }],
    model: "gpt-4o",
  });
  // 回答結果を返却
  console.log(completion);
  const answer = completion.choices[0].message?.content
  return answer
}