// src/app/farm/[id]/page.tsx (Server Component)

// Client Componentをインポート
import FarmApplicationClient from './FarmApplicationClient'; 

// async関数として定義し、paramsのPromiseを解決
export default async function FarmApplicationPage({ params }: { params: Promise<{ id: string }> }) {
    
    // サーバー側で await を使用し、Promiseを解決
    const resolvedParams = await params;
    const farmId = resolvedParams.id;
    
    // Hookを使用するClient Componentを呼び出し、必要な値 (farmId) をPropsとして渡す
    return <FarmApplicationClient farmId={farmId} />;
}
