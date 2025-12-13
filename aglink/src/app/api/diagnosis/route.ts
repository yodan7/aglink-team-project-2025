// /app/api/diagnose/route.ts

import { NextResponse } from 'next/server';
import { getAiFeedback } from '../openai'
import "server-only";
// 💡 Supabaseの質問データの型を定義
type QuestionMetadata = {
    id: number;
    question_text: string;
    axis: 'Motivation' | 'Scale' | 'Stance' | 'Approach'; // 軸名はリテラル型で厳密に
    pole: string; // A, Sなどの極性
};

// 💡 ユーザーの回答データの型を定義 (CurrentValue形式)
type CurrentValue = {
    Motivation: Record<number, number>; // {質問ID: 回答値(-2～+2)}
    Scale: Record<number, number>;
    Approach: Record<number, number>;
    Stance: Record<number, number>;
};

// 💡 AIへの送信形式（前回成功した形式）
type AnswerDetail = {
    id: string; // AIに渡す際は文字列ID
    question: string;
    value: number;
    axis: string;
    pole: string; // 💡 poleもAIに渡せるように追加
};

// 💡 フロントエンドから受け取るリクエストボディの型
type DiagnosisRequest = {
    userAnswers: CurrentValue; // 👈 ユーザーの回答
    finalType: string;
};

// 💡 Supabaseから質問メタデータを取得する仮の関数 (※別途実装が必要です)
// 実際には、Supabaseのclientを使ってデータベースから全質問を取得します。
async function getQuestionsFromSupabase(): Promise<QuestionMetadata[]> {
    const allQuestions: QuestionMetadata[] = [
        // Motivation (ID 1-5)
        { id: 1, question_text: "育てる野菜は、ちょっと形が変わった個性的な品種に魅力を感じる。", axis: 'Motivation', pole: 'A' },
        { id: 2, question_text: "農業を始める前に、費用対効果や収益の見込みを最初に計算したい。", axis: 'Motivation', pole: 'S' },
        { id: 3, question_text: "畑で一番やりがいを感じるのは、自分のアイデアやセンスが形になった時だ。", axis: 'Motivation', pole: 'A' },
        { id: 4, question_text: "農業の情報は、論理的でデータに基づいた客観的な情報を信頼する。", axis: 'Motivation', pole: 'S' },
        { id: 5, question_text: "育てた野菜は、味だけでなく、見た目の美しさやユニークさも大切にしたい。", axis: 'Motivation', pole: 'A' },
        
        // Scale (ID 6-10)
        { id: 6, question_text: "収穫した野菜は、自分で食べたり、おすそ分けして喜んでもらいたい。", axis: 'Scale', pole: 'F' },
        { id: 7, question_text: "農業を、将来的に収入を得るためのビジネスとして考えている。", axis: 'Scale', pole: 'C' },
        { id: 8, question_text: "家族や友人に「すごいね!」と褒めてもらうことが、大きなモチベーションになる。", axis: 'Scale', pole: 'F' },
        { id: 9, question_text: "農業に使うお金は、将来の独立も見据えてしっかり投資しても良いと考えている。", axis: 'Scale', pole: 'C' },
        { id: 10, question_text: "大きな畑を借りるチャンスがあったら、自分の事業として収益化を検討したい。", axis: 'Scale', pole: 'C' },
        
        // Approach (ID 11-15)
        { id: 11, question_text: "苗を植えたり、土をいじったり、直接身体を動かす作業が好きだ。", axis: 'Approach', pole: 'H' },
        { id: 12, question_text: "畑の状態は、センサーやアプリなどの最新ツールで管理したい。", axis: 'Approach', pole: 'I' },
        { id: 13, question_text: "農業の知識は、経験豊かな農家さんのもとで、お手伝いをしながら学ぶのが一番だと思う。", axis: 'Approach', pole: 'H' },
        { id: 14, question_text: "農業で困ったら、まずはAIやインターネットで原因や対策を調べたい。", axis: 'Approach', pole: 'I' },
        { id: 15, question_text: "農業は、新しい技術や知識を取り入れて、スマートに進めていきたい。", axis: 'Approach', pole: 'I' },
        
        // Stance (ID 16-20)
        { id: 16, question_text: "農業で失敗しても、「新しい発見があった」と前向きに捉えることができる。", axis: 'Stance', pole: 'O' },
        { id: 17, question_text: "育てた作物は、昔からある伝統品種のほうが安心感がある。", axis: 'Stance', pole: 'P' },
        { id: 18, question_text: "農業を通じて、IT企業やデザイナーなど異分野の人と繋がりたい。", axis: 'Stance', pole: 'O' },
        { id: 19, question_text: "計画通りに進まない時は、一度立ち止まり、計画を細かく見直してから次の行動を決めたい。", axis: 'Stance', pole: 'P' },
        { id: 20, question_text: "農業を始めた最終的な目標は、新しい価値を生み出し、可能性を広げることだ。", axis: 'Stance', pole: 'O' },
    ];
    return allQuestions;
}

/**
 * データを AI の systemPrompt に適した User Content 文字列に変換する核心ロジック
 */
function buildAiUserContent(
    userAnswers: CurrentValue, 
    metadata: QuestionMetadata[], 
    finalType: string
): string {
    
    // 質問メタデータを検索しやすい Map に変換
    const metadataMap = new Map(metadata.map(q => [q.id, q]));

    const answersForAI: AnswerDetail[] = [];
    
    // CurrentValue（軸ごとのオブジェクト）を展開
    (Object.keys(userAnswers) as (keyof CurrentValue)[]).forEach(axisName => {
        const answersByAxis = userAnswers[axisName];
        
        Object.entries(answersByAxis).forEach(([idStr, value]) => {
            const questionId = parseInt(idStr, 10);
            const questionMeta = metadataMap.get(questionId);
            
            if (questionMeta) {
                answersForAI.push({
                    id: idStr,
                    question: questionMeta.question_text,
                    value: value,
                    axis: axisName,
                    pole: questionMeta.pole // 極性も追加
                });
            }
        });
    });

    // ここから前回成功したプロンプト構築ロジック
    let content = "### 診断データ\n";
    content += `* **最終診断タイプ**: ${finalType}\n`;
    content += `* **回答スケール**: -2（強く否定）から +2（強く肯定）\n\n`;

    content += "**### 質問と回答の詳細 (AI分析用)**\n";

    answersForAI.forEach(item => {
        const sign = item.value > 0 ? '+' : '';
        // 軸名、質問文、回答値、極性がすべて含まれる
        content += `- [${item.axis} / ${item.pole}] Q${item.id} (${item.question}): ${sign}${item.value}\n`;
    });
    
    content += "\n上記データに基づき、指示に従い分析とアドバイスを生成してください。";
    
    return content;
}


export async function POST(request: Request) {
    try {
        // 1. 質問メタデータを取得
        const questionsMetadata = await getQuestionsFromSupabase();
        
        // 2. データを JSON 形式で受け取る
        const body: DiagnosisRequest = await request.json();
        
        // 3. 受け取った回答データと質問メタデータを結合し、AIプロンプト文字列に変換
        const userContent = buildAiUserContent(
            body.userAnswers, 
            questionsMetadata, 
            body.finalType
        ); 
        
        // 4. 変換したプロンプトを AI 関数に渡し、フィードバックを取得
        const aiFeedback = await getAiFeedback(userContent);
        
        // 5. 結果をクライアントに返却
        return NextResponse.json({ 
            success: true,
            finalType: body.finalType,
            aiFeedback: aiFeedback 
        });
        
    } catch (error) {
        console.error("診断フィードバック処理中にエラーが発生しました:", error);
        const errorMessage = error instanceof Error ? error.message : "内部サーバーエラー";
        return NextResponse.json({ 
            success: false, 
            message: `フィードバックの取得中にエラーが発生しました: ${errorMessage}` 
        }, { status: 500 });
    }
}