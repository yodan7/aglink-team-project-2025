// src/app/(main)/diagnosis/page.tsx

import { DiagnosisForm } from '@/components/domain/diagnosis/DiagnosisForm';

// ★必ず React コンポーネントをデフォルトエクスポートする
export default function DiagnosisPage() {
  return (
    <main className="py-10">
      <DiagnosisForm /> 
    </main>
  );
}