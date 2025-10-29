// src/app/farm/[id]/page.tsx (Server Component/Wrapper)


import FarmApplicationClient from './FarmApplicationClient'; 

// asyncではない同期関数として定義。paramsは受け取らない。
export default function FarmApplicationPage() {
    
    // Client Componentにレンダリングを委譲
    return <FarmApplicationClient />;
}
