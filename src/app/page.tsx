export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl w-full space-y-8 text-center">
        <h1 className="text-5xl font-bold text-primary-600">
          ベトナム語学習アプリ
        </h1>
        <p className="text-xl text-gray-600">
          Vietnamese Word Cards - 楽しく学ぼう！
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-lg font-semibold mb-2">アルファベット学習</h3>
            <p className="text-gray-600">29文字のベトナム語アルファベットと声調を学習</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🎴</div>
            <h3 className="text-lg font-semibold mb-2">単語カード</h3>
            <p className="text-gray-600">カテゴリー別に単語を楽しく覚えよう</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold mb-2">クイズ</h3>
            <p className="text-gray-600">4択クイズやリスニングで実力チェック</p>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          プロジェクトセットアップ完了 ✓
        </div>
      </div>
    </main>
  );
}
