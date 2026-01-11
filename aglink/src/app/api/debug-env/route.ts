import { NextResponse } from 'next/server';
// 必要なask関数をインポート
import { ask } from '../openai'; 

/**
 * このファイルは、クライアント (fetch('/api') POST) からの通信を受け付ける窓口です。
 * Next.jsのルール上、この場所にこの名前のファイルが必要です。
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const prompt: string = body.prompt;

        if (!prompt || typeof prompt !== 'string') {
            return NextResponse.json({ error: '質問 (prompt) が無効です' }, { status: 400 });
        }

        // サーバーサイドの ask 関数を実行
        const answerText = await ask(prompt);

        return NextResponse.json({ text: answerText });

    } catch (error) {
        // エラー詳細をコンソールに出力し、クライアントに具体的なエラーメッセージを返す
        console.error('API処理中にエラーが発生しました:', error);
        return NextResponse.json({ 
            error: `サーバー内部でエラーが発生しました。詳細: ${error instanceof Error ? error.message : String(error)}`
        }, { status: 500 });
    }
}