"use client";

import React, { useState, useEffect } from "react"; 
import { getAllQuestions } from "@/lib/database/questions"; 
import { GroupedQuestions } from "@/types";


// 💡 必要な型定義の追加
type CurrentValue = {
    Motivation: Record<number, number>;
    Scale: Record<number, number>;
    Approach: Record<number, number>;
    Stance: Record<number, number>;
};


const Chat: React.FC = () => {
    // 汎用チャット機能のステート
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false); // 通信状態を管理する 
    const [realAnswers, setRealAnswers] = useState<CurrentValue | null>(null);
    const [realType, setRealType] = useState<string>("");

    // 質問データ関連のステートは元のコードからそのまま残します
    const [questions, setQuestions] = useState<GroupedQuestions | null>(null);
    const [error, setError] = useState<string | null>(null);

    // --------------------------------------------------------
    // 💡 診断フィードバックテスト用の静的データ (CurrentValue形式)
    // --------------------------------------------------------
    // 全20問の回答を CurrentValue 形式で定義します
    const TEST_USER_ANSWERS: CurrentValue = {
        Motivation: {
            1: 2, // 育てる野菜は、ちょっと形が変わった個性的な品種に魅力を感じる。
            2: -1, // 農業を始める前に、費用対効果や収益の見込みを最初に計算したい。
            3: 2, // 畑で一番やりがいを感じるのは、自分のアイデアやセンスが形になった時だ。
            4: -2, // 農業の情報は、論理的でデータに基づいた客観的な情報を信頼する。
            5: 1, // 育てた野菜は、味だけでなく、見た目の美しさやユニークさも大切にしたい。
        },
        Scale: {
            6: 2, // 収穫した野菜は、自分で食べたり、おすそ分けして喜んでもらいたい。
            7: 0, // 農業を、将来的に収入を得るためのビジネスとして考えている。
            8: 1, // 家族や友人に「すごいね!」と褒めてもらうことが、大きなモチベーションになる。
            9: -1, // 農業に使うお金は、将来の独立も見据えてしっかり投資しても良いと考えている。
            10: 0, // 大きな畑を借りるチャンスがあったら、自分の事業として収益化を検討したい。
        },
        Approach: {
            11: 2, // 苗を植えたり、土をいじったり、直接身体を動かす作業が好きだ。
            12: -1, // 畑の状態は、センサーやアプリなどの最新ツールで管理したい。
            13: 2, // 農業の知識は、経験豊かな農家さんのもとで、お手伝いをしながら学ぶのが一番だと思う。
            14: -2, // 農業で困ったら、まずはAIやインターネットで原因や対策を調べたい。
            15: -1, // 農業は、新しい技術や知識を取り入れて、スマートに進めていきたい。
        },
        Stance: {
            16: 2, // 農業で失敗しても、「新しい発見があった」と前向きに捉えることができる。
            17: -2, // 育てた作物は、昔からある伝統品種のほうが安心感がある。
            18: 1, // 農業を通じて、IT企業やデザイナーなど異分野の人と繋がりたい。
            19: -1, // 計画通りに進まない時は、一度立ち止まり、計画を細かく見直してから次の行動を決めたい。
            20: 2, // 農業を始めた最終的な目標は、新しい価値を生み出し、可能性を広げることだ。
        },
    };

    const TEST_FINAL_TYPE: string = "AHOF"; 
    
    // --------------------------------------------------------

    // /app/(sample)/chat-test/page.tsx 内

useEffect(() => {
        const savedData = sessionStorage.getItem("debug_diagnosis_data");
        if (savedData) {
            try {
                const { userAnswers, finalType } = JSON.parse(savedData);
                // 💡 コンソールだけでなく、送信で使うためのステートにしっかり保存
                setRealAnswers(userAnswers); 
                setRealType(finalType);
                console.log("✅ 診断画面からのデータを保持しました:", userAnswers);
            } catch (e) {
                console.error("❌ データ解析失敗:", e);
            }
        }
    }, []);

    // 質問データを取得する useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const questions = await getAllQuestions();
                console.log("取得した質問データ:", questions);
                setQuestions(questions);
            } catch (err) {
                console.error("質問データの取得に失敗:", err);
                setError("質問データの読み込みに失敗しました。");
            }
        };
        fetchData();
    }, []);


    // 既存の handleSubmit (汎用チャット) - ロジック
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return; 
        
        setIsLoading(true);
        setResponse("質問を処理中です..."); 

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

    // 💡 診断フィードバックテスト送信関数 (修正済み)
const handleDiagnosisTest = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLoading) return;

        // 💡 保持している「本物のデータ」があれば優先、なければ「TEST_USER_ANSWERS」を使用
        const targetData = realAnswers || TEST_USER_ANSWERS;
        const targetType = realType || TEST_FINAL_TYPE;

        setIsLoading(true);
        // 💡 初期メッセージをここで上書きし、ユーザーに状況を伝えます
        setResponse("📡 AIに診断データを送信しています...");

        try {
            const res = await fetch('/api/diagnosis', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userAnswers: targetData, 
                    finalType: targetType, 
                })
            });

            if (!res.ok) {
                const errorBody = await res.text();
                throw new Error(`サーバーエラー (${res.status}): ${errorBody}`);
            }

            setResponse("⏳ AIが深掘り分析を行っています。そのまま30秒ほどお待ちください...");

            const data = await res.json();
            
            if (data.success) {
                // 💡 AIの回答を最終セット
                setResponse(`### 最終診断タイプ: ${data.finalType}\n\n${data.aiFeedback}`);
            } else {
                setResponse(`⚠️ エラー: ${data.message}`);
            }

        } catch (error) {
            console.error("Diagnosis Submission Error:", error);
            setResponse(`❌ 送信失敗: ${error instanceof Error ? error.message : "不明なエラー"}`);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
             <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">APIテストハブ (page.tsx)</h1>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* 既存の質問フォーム (汎用チャット) */}
                <div className="mt-3 lg:col-span-1">
                    {/* 1. 汎用チャットフォーム */}
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4 text-indigo-600">
                            1. 汎用チャットテスト
                        </h2>
                        {/* フォームUI */}
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

                    {/* 2. 診断フィードバックテストフォーム */}
                    <form onSubmit={handleDiagnosisTest} className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-amber-500">
                        <h2 className="text-xl font-semibold mb-4 text-amber-600">
                            2. 診断フィードバックテスト
                        </h2>
                        <p className="text-sm text-gray-600">
                            以下の**全20問の静的テストデータ**を `/api/diagnosis` に送信し、AI連携を確認します。
                        </p>
                         {/* データサマリーのUIは省略 */}
                        <div>
                            <button
                                type="submit"
                                className={`w-full inline-flex justify-center rounded-lg py-3 px-4 text-base font-semibold text-white shadow-md transition duration-150 ease-in-out ${
                                    isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700'
                                }`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'AI分析中...' : '診断データを送信'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* 質問の答え (共通) */}
                <div className="mt-3 lg:col-span-2">
                     <div className="bg-gray-50 rounded-xl shadow-lg p-6 min-h-[400px]">
                        <h2 className="text-lg font-bold leading-6 text-gray-800 border-b pb-2 mb-4">AIの応答</h2>
                        <div className="text-sm text-gray-700 whitespace-pre-wrap">
                            {response || "応答がありません。左側のフォームのいずれかから送信してください。"}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Chat;