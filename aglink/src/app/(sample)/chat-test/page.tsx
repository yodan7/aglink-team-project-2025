"use client";

import React, {useState} from "react";
// import {ask} from "@/app/api/openai"; // ❌ サーバーサイドの関数はクライアントコンポーネントから直接インポートしない

const Chat: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 通信状態を管理する

  // フォーム送信時にAPIルートにfetchで通信するよう修正
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return; // プロンプトが空または通信中の場合は処理しない

    setIsLoading(true);
    setResponse("質問を処理中です..."); // ローディングメッセージを表示

    try {
      // APIルート（例: /api/debug-env）に質問内容を送信する
      const res = await fetch('/api/debug-env', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt })
      });

      if (!res.ok) {
        throw new Error(`APIリクエストが失敗しました: ${res.statusText}`);
      }

      const data = await res.json();
      const t = data.text ?? "応答がありませんでした。";
      setResponse(t);

    } catch (error) {
      console.error("Chat error:", error);
      setResponse("エラーが発生しました。コンソールを確認してください。");
    } finally {
      setIsLoading(false);
    }
  };

  /** ユーザのメッセージ投稿と回答
   */
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 質問フォーム */}
        <div className="mt-3">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-4">
              <label htmlFor="Prompt" className="block text-lg font-bold text-gray-800">
                質問文
              </label>
              <div>
                <textarea
                  rows={5}
                  className="mt-1 px-3 block w-full rounded-lg border border-gray-300 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
                  placeholder="ここに質問を入れてください"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className={`w-full inline-flex justify-center rounded-lg py-3 px-4 text-base font-semibold text-white shadow-md transition duration-150 ease-in-out ${
                    isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? '処理中...' : '質問する'}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* 質問の答え */}
        <div className="mt-3 md:mt-0">
          <div className="bg-gray-50 rounded-xl shadow-lg p-6 min-h-[200px]">
            <h2 className="text-lg font-bold leading-6 text-gray-800 border-b pb-2 mb-4">質問の答え</h2>
            <div className="text-sm text-gray-700 whitespace-pre-wrap">
                {response || "まだ応答がありません。"}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Chat;