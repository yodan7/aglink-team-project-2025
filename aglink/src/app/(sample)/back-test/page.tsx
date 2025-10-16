"use client";

import React, { useState } from "react";

// 全てのlibフォルダの関数をインポート
import {
  getAllFarms,
  getFarmById,
  createFarm,
  getFarmsByCode,
} from "@/lib/database/farms";
import {
  saveDiagnosis,
  getUserDiagnosisHistory,
  getDiagnosisStats,
} from "@/lib/database/user_diagnosis";
import { getDiagnosisByCode } from "@/lib/database/diagnosis";
import { getAllQuestions } from "@/lib/database/questions";
import {
  signUp,
  signIn,
  sendPasswordResetEmail,
  updatePassword,
} from "@/lib/database/auth";
import { Diagnosis, Farm, NewFarmInput } from "@/types";

export default function SupabaseTestPage() {
  const [results, setResults] = useState<string[]>([]);
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("testpassword123");

  // 結果を画面に表示するためのヘルパー関数
  const addResult = (message: string) => {
    console.log(message);
    setResults((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

  // 結果をクリア
  const clearResults = () => {
    setResults([]);
  };

  // === 農地関連のテスト ===

  const testGetAllFarms = async () => {
    addResult("🌾 全ての農地を取得中...");
    const farms = await getAllFarms();
    if (farms) {
      addResult(`✅ 農地を${farms.length}件取得しました`);
    } else {
      addResult("❌ 農地の取得に失敗しました");
    }
  };

  const testGetFarmById = async () => {
    addResult("🌾 ID指定で農地を取得中...");
    // 実際のIDがないのでダミーIDでテスト
    const farm = await getFarmById("1");
    if (farm) {
      addResult(`✅ 農地を取得: ${farm.name}`);
    } else {
      addResult("❌ 指定IDの農地が見つかりません（正常な動作）");
    }
  };

  const testGetFarmsByCode = async () => {
    addResult("🌾 コード別農地を取得中...");
    const farms = await getFarmsByCode("AFHP");
    if (farms) {
      addResult(`✅ コードAFHPの農地を${farms.length}件取得しました`);
    } else {
      addResult("❌ コードAFHPの農地の取得に失敗しました");
    }
  };

  const testCreateFarm = async () => {
    addResult("🌾 新しい農地を作成中...");
    const farmData: NewFarmInput = [
      { name: `テスト農地 ${Date.now()}` },
      { location: "東京都" },
      { description: "テスト用に作成された農地です" },
      { imageUrl: "https://example.com/farm.jpg" },
      { code: "SCIP" },
      { type: "職人ファーマータイプ" },
    ];

    const newFarm = await createFarm(farmData);
    if (newFarm) {
      addResult(`✅ 新しい農地を作成: ${newFarm.name}`);
    } else {
      addResult("❌ 農地の作成に失敗しました");
    }
  };

  // === 診断関連のテスト ===

  const testSaveDiagnosis = async () => {
    addResult("🔍 診断結果を保存中...");
    const diagnosisData: Diagnosis = {
      code: "SCIP",
      type: "職人ファーマータイプ",
      description: `テスト診断結果 ${Date.now()}`,
    };
    const user_id = "test-user-id"; // テスト用のユーザーID

    const diagnosis = await saveDiagnosis(user_id, diagnosisData);
    if (diagnosis) {
      addResult(`✅ 診断結果を保存: ${diagnosis.type}`);
    } else {
      addResult("❌ 診断結果の保存に失敗しました");
    }
  };

  const testGetUserDiagnosisHistory = async () => {
    addResult("🔍 ユーザーの診断履歴を取得中...");
    const history = await getUserDiagnosisHistory("test-user-id");
    if (history) {
      addResult(`✅ 診断履歴を${history.length}件取得しました`);
    } else {
      addResult("❌ 診断履歴の取得に失敗しました");
    }
  };

  const testGetDiagnosisStats = async () => {
    addResult("🔍 診断統計を取得中...");
    const stats = await getDiagnosisStats();
    if (stats) {
      const statsText = Object.entries(stats)
        .map(([type, count]) => `${type}: ${count}件`)
        .join(", ");
      addResult(`✅ 診断統計: ${statsText}`);
    } else {
      addResult("❌ 診断統計の取得に失敗しました");
    }
  };

  const testGetDiagnosisByCode = async () => {
    addResult("🔍 コード指定で診断結果を取得中...");
    const diagnosis = await getDiagnosisByCode("SCIO");
    if (diagnosis) {
      addResult(`✅ 診断結果を取得: ${diagnosis.type} (${diagnosis.code})`);
    } else {
      addResult("❌ 指定コードの診断結果が見つかりません");
    }
  };

  // === 質問関連のテスト ===

  const testGetAllQuestions = async () => {
    addResult("❓ 全ての質問をランダム順で取得中...");
    const questions = await getAllQuestions();
    if (questions) {
      addResult(`✅ 質問を${questions.length}件取得しました（ランダム順）`);
      // 最初の質問の詳細を表示
      if (questions[0]) {
        addResult(
          `　　最初の質問: "${questions[0].questionText}" (ID: ${questions[0].id})`
        );
        addResult(`　　軸: ${questions[0].axis}, 極: ${questions[0].pole}`);
      }
    } else {
      addResult("❌ 質問の取得に失敗しました");
    }
  };

  // === 認証関連のテスト ===

  const testSignUp = async () => {
    addResult("🔐 ユーザー登録中...");
    const result = await signUp(email, password);
    if (result.success) {
      addResult("✅ ユーザー登録に成功しました");
    } else {
      addResult(`❌ ユーザー登録に失敗: ${result.error}`);
    }
  };

  const testSignIn = async () => {
    addResult("🔐 ログイン中...");
    const result = await signIn(email, password);
    if (result.success) {
      addResult("✅ ログインに成功しました");
    } else {
      addResult(`❌ ログインに失敗: ${result.error}`);
    }
  };

  const testSendPasswordResetEmail = async () => {
    addResult("🔐 パスワードリセットメール送信中...");
    const result = await sendPasswordResetEmail(email);
    if (result.success) {
      addResult("✅ パスワードリセットメールを送信しました");
    } else {
      addResult(`❌ パスワードリセットメール送信に失敗: ${result.error}`);
    }
  };

  const testUpdatePassword = async () => {
    addResult("🔐 パスワード更新中...");
    const result = await updatePassword("newpassword123");
    if (result.success) {
      addResult("✅ パスワードを更新しました");
    } else {
      addResult(`❌ パスワード更新に失敗: ${result.error}`);
    }
  };

  // 全てのテストを実行
  const runAllTests = async () => {
    clearResults();
    addResult("🚀 全てのテストを開始します...");

    // 農地関連テスト
    await testGetAllFarms();
    await testGetFarmById();
    await testGetFarmsByCode();
    // await testCreateFarm(); // DB書き込みテストは必要に応じて

    // 診断関連テスト
    // await testSaveDiagnosis(); // DB書き込みテストは必要に応じて
    await testGetUserDiagnosisHistory();
    await testGetDiagnosisStats();
    await testGetDiagnosisByCode();

    // 質問関連テスト
    await testGetAllQuestions();

    // 認証関連テスト（注意：実際の認証が発生します）
    // await testSignUp(); // 実際の登録処理になるので注意
    // await testSignIn(); // 実際のログイン処理になるので注意
    await testSendPasswordResetEmail();
    // await testUpdatePassword(); // ログイン状態が必要

    addResult("🎉 全てのテストが完了しました");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Supabase 関数テストページ</h1>
      <p className="text-gray-600 mb-8">
        libフォルダで定義された全ての関数をテストできます。結果はコンソールと画面に表示されます。
      </p>

      {/* 認証用の入力フィールド */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">認証テスト用設定</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      {/* テストボタン群 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* 農地関連テスト */}
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-3">🌾 農地関連</h3>
          <div className="space-y-2">
            <button
              onClick={testGetAllFarms}
              className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              🔥全農地取得
            </button>
            <button
              onClick={testGetFarmById}
              className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              ID指定取得
            </button>
            <button
              onClick={testGetFarmsByCode}
              className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              🔥コード別取得
            </button>
            <button
              onClick={testCreateFarm}
              className="w-full p-2 bg-green-700 text-white rounded hover:bg-green-800"
            >
              農地作成 ⚠️
            </button>
          </div>
        </div>

        {/* 診断関連テスト */}
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-3">🔍 診断関連</h3>
          <div className="space-y-2">
            <button
              onClick={testSaveDiagnosis}
              className="w-full p-2 bg-blue-700 text-white rounded hover:bg-blue-800"
            >
              診断保存 ⚠️
            </button>
            <button
              onClick={testGetUserDiagnosisHistory}
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              診断履歴取得
            </button>
            <button
              onClick={testGetDiagnosisStats}
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              診断統計取得
            </button>
            <button
              onClick={testGetDiagnosisByCode}
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              🔥コード別診断取得
            </button>
          </div>
        </div>

        {/* 認証関連テスト */}
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-3">🔐 認証関連</h3>
          <div className="space-y-2">
            <button
              onClick={testSignUp}
              className="w-full p-2 bg-red-700 text-white rounded hover:bg-red-800"
            >
              ユーザー登録 ⚠️
            </button>
            <button
              onClick={testSignIn}
              className="w-full p-2 bg-red-700 text-white rounded hover:bg-red-800"
            >
              ログイン ⚠️
            </button>
            <button
              onClick={testSendPasswordResetEmail}
              className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              PW リセット
            </button>
            <button
              onClick={testUpdatePassword}
              className="w-full p-2 bg-red-700 text-white rounded hover:bg-red-800"
            >
              PW 更新 ⚠️
            </button>
          </div>
        </div>

        {/* 質問関連テスト */}
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-3">❓ 質問関連</h3>
          <div className="space-y-2">
            <button
              onClick={testGetAllQuestions}
              className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              🔥全質問取得（ランダム順）
            </button>
          </div>
        </div>
      </div>

      {/* 一括実行ボタン */}
      <div className="mb-6 text-center">
        <button
          onClick={runAllTests}
          className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
        >
          🚀 全てのテストを実行（安全なもののみ）
        </button>
        <button
          onClick={clearResults}
          className="ml-4 px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          結果をクリア
        </button>
      </div>

      {/* 注意書き */}
      <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>⚠️ 注意:</strong>
          ⚠️マークの付いたボタンは実際にデータベースに書き込みや認証処理を行います。
          テスト環境でのみ使用してください。
        </p>
      </div>

      {/* 結果表示エリア */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">実行結果</h3>
        <div className="h-96 overflow-y-auto bg-white p-3 rounded border">
          {results.length === 0 ? (
            <p className="text-gray-500">
              テストを実行すると結果がここに表示されます
            </p>
          ) : (
            results.map((result, index) => (
              <div key={index} className="mb-1 text-sm font-mono">
                {result}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
