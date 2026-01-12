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
        // ★セキュリティ: サーバー側のログには詳細を記録
        console.error('API処理中にエラーが発生しました:', error);
        // ★セキュリティ: クライアントには一般的なメッセージのみ返す（詳細は隠す）
        return NextResponse.json({ 
            error: 'サーバー内部でエラーが発生しました。しばらく経ってから再度お試しください。'
        }, { status: 500 });
    }
}