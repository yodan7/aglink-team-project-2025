// login.tsx
export default function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50 p-5">
      <div className="w-full max-w-md text-center">
        {/* アプリタイトル */}
        <h1 className="text-3xl font-bold text-green-700 mb-8">Aglink</h1>

        {/* ログインフォームボックス */}
        <div className="bg-white p-8 rounded-xl shadow-md mb-6">
          <h2 className="text-2xl font-bold text-green-700 mb-6">ログイン</h2>

          <form className="flex flex-col">
            <input
              type="text"
              placeholder="メールアドレス"
              className="w-full p-3 mb-4 border rounded text-center text-lg"
            />
            <input
              type="password"
              placeholder="パスワード"
              className="w-full p-3 mb-4 border rounded text-center text-lg"
            />
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 mb-2"
            >
              ログイン
            </button>
            <button
              type="button"
              className="w-full py-3 px-4 rounded-lg border-2 border-green-500 text-green-700 font-bold hover:bg-green-100"
            >
              会員登録
            </button>
          </form>

          <a
            href="#"
            className="block text-gray-600 text-sm mt-4 hover:underline hover:text-green-600"
          >
            パスワードを忘れた場合
          </a>
        </div>
      </div>
    </div>
  );
}
