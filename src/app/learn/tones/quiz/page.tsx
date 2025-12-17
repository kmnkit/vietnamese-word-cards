'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import tonesData from '@/data/tones.json';
import { useAudioPlayer } from '@/lib/hooks/useAudioPlayer';

interface Tone {
  id: string;
  name: string;
  vietnamese_name: string;
  symbol: string;
  description: string;
  audio_url: string;
  pattern: string;
  pitch_level: string;
}

interface QuizState {
  currentQuestion: number;
  score: number;
  showFeedback: boolean;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
}

export default function ToneQuizPage() {
  const router = useRouter();
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    showFeedback: false,
    selectedAnswer: null,
    isCorrect: null,
  });

  const [questionOrder, setQuestionOrder] = useState<Tone[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  // Initialize quiz with shuffled tones
  useEffect(() => {
    const shuffled = [...tonesData].sort(() => Math.random() - 0.5);
    setQuestionOrder(shuffled);
  }, []);

  const currentTone = questionOrder[quizState.currentQuestion];
  const { play } = useAudioPlayer(currentTone?.audio_url || '');

  // Auto-play audio when question changes
  useEffect(() => {
    if (currentTone && !quizState.showFeedback) {
      const timer = setTimeout(() => {
        play();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentTone, quizState.showFeedback, play]);

  const handleAnswer = (selectedToneId: string) => {
    if (quizState.showFeedback) return;

    const isCorrect = selectedToneId === currentTone.id;
    setQuizState({
      ...quizState,
      selectedAnswer: selectedToneId,
      showFeedback: true,
      isCorrect,
      score: isCorrect ? quizState.score + 1 : quizState.score,
    });
  };

  const handleNext = () => {
    if (quizState.currentQuestion + 1 >= questionOrder.length) {
      setQuizComplete(true);
    } else {
      setQuizState({
        currentQuestion: quizState.currentQuestion + 1,
        score: quizState.score,
        showFeedback: false,
        selectedAnswer: null,
        isCorrect: null,
      });
    }
  };

  const handleReplay = () => {
    play();
  };

  const handleRestart = () => {
    const shuffled = [...tonesData].sort(() => Math.random() - 0.5);
    setQuestionOrder(shuffled);
    setQuizState({
      currentQuestion: 0,
      score: 0,
      showFeedback: false,
      selectedAnswer: null,
      isCorrect: null,
    });
    setQuizComplete(false);
  };

  if (!currentTone || questionOrder.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <p className="text-gray-600">クイズを読み込み中...</p>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    const percentage = Math.round((quizState.score / questionOrder.length) * 100);
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            クイズ完了！
          </h1>
          <div className="mb-8">
            <div className="text-6xl mb-4">
              {percentage >= 80 ? '🎉' : percentage >= 60 ? '👏' : '📚'}
            </div>
            <p className="text-5xl font-bold text-primary-600 mb-2">
              {quizState.score} / {questionOrder.length}
            </p>
            <p className="text-xl text-gray-600">正解率: {percentage}%</p>
          </div>

          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            {percentage >= 80 ? (
              <p className="text-lg text-gray-700">
                素晴らしい！声調の理解が深まっていますね！
              </p>
            ) : percentage >= 60 ? (
              <p className="text-lg text-gray-700">
                いい調子です！もう少し練習すればマスターできそうです。
              </p>
            ) : (
              <p className="text-lg text-gray-700">
                声調は難しいですが、何度も聞いて慣れていきましょう。
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              もう一度挑戦
            </button>
            <button
              onClick={() => router.push('/learn/tones')}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              声調ページに戻る
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">声調クイズ</h1>
          <button
            onClick={() => router.push('/learn/tones')}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕ 終了
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>
              問題 {quizState.currentQuestion + 1} / {questionOrder.length}
            </span>
            <span>正解: {quizState.score}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all"
              style={{
                width: `${((quizState.currentQuestion + 1) / questionOrder.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Quiz Card */}
      <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
        {/* Audio Section */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-700 mb-4">
            音声を聞いて、正しい声調を選んでください
          </p>
          <button
            onClick={handleReplay}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            🔊 もう一度聞く
          </button>
        </div>

        {/* Answer Choices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tonesData.map((tone) => {
            const isSelected = quizState.selectedAnswer === tone.id;
            const isCorrectAnswer = tone.id === currentTone.id;
            const showCorrect = quizState.showFeedback && isCorrectAnswer;
            const showIncorrect = quizState.showFeedback && isSelected && !isCorrectAnswer;

            return (
              <button
                key={tone.id}
                onClick={() => handleAnswer(tone.id)}
                disabled={quizState.showFeedback}
                className={`
                  p-4 rounded-lg border-2 text-left transition-all
                  ${
                    showCorrect
                      ? 'bg-green-100 border-green-500 ring-2 ring-green-300'
                      : showIncorrect
                      ? 'bg-red-100 border-red-500 ring-2 ring-red-300'
                      : isSelected
                      ? 'bg-blue-50 border-blue-400'
                      : 'bg-white border-gray-200 hover:border-primary-400 hover:bg-gray-50'
                  }
                  ${quizState.showFeedback ? 'cursor-default' : 'cursor-pointer'}
                `}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-lg text-gray-900">
                      {tone.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {tone.vietnamese_name}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{tone.pattern}</span>
                    {showCorrect && <span className="text-2xl">✓</span>}
                    {showIncorrect && <span className="text-2xl">✗</span>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        {quizState.showFeedback && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div
              className={`p-4 rounded-lg mb-4 ${
                quizState.isCorrect ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <p
                className={`text-lg font-semibold mb-2 ${
                  quizState.isCorrect ? 'text-green-700' : 'text-red-700'
                }`}
              >
                {quizState.isCorrect ? '🎉 正解！' : '❌ 不正解'}
              </p>
              <div className="text-gray-700">
                <p className="mb-1">
                  <strong>正解:</strong> {currentTone.name} ({currentTone.pattern})
                </p>
                <p className="text-sm">{currentTone.description}</p>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              次の問題へ →
            </button>
          </div>
        )}
      </div>

      {/* Help Text */}
      <div className="text-center text-sm text-gray-500">
        💡 ヒント: 何度も音声を聞いて、パターンを覚えましょう
      </div>
    </div>
  );
}
