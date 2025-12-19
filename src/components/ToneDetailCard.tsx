'use client';

import { useAudioPlayer } from '@/lib/hooks/useAudioPlayer';

interface ToneExample {
  word: string;
  meaning: string;
  pronunciation: string;
}

interface Tone {
  id: string;
  name: string;
  vietnamese_name: string;
  symbol: string;
  description: string;
  audio_url: string;
  pattern: string;
  pitch_level: string;
  examples: ToneExample[];
}

interface ToneDetailCardProps {
  tone: Tone;
  onClose: () => void;
}

export default function ToneDetailCard({ tone, onClose }: ToneDetailCardProps) {
  const { play, isPlaying } = useAudioPlayer(tone.audio_url);

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 mb-8 border-2 border-primary-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-6">
          <div className="text-6xl">{tone.pattern}</div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">
              {tone.name}
            </h2>
            <p className="text-lg text-gray-600">{tone.vietnamese_name}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
        >
          ✕
        </button>
      </div>

      {/* Tone Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">記号</p>
          <p className="text-lg font-semibold text-gray-900">{tone.symbol}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">音の高さ</p>
          <p className="text-lg font-semibold text-gray-900">
            {tone.pitch_level}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">パターン</p>
          <p className="text-lg font-semibold text-gray-900">{tone.pattern}</p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">説明</h3>
        <p className="text-gray-900">{tone.description}</p>
      </div>

      {/* Audio Player */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">音声</h3>
        <button
          onClick={play}
          disabled={isPlaying}
          className={`
            w-full md:w-auto px-6 py-3 rounded-lg font-medium transition-all
            ${
              isPlaying
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-md'
            }
          `}
        >
          {isPlaying ? '🔊 再生中...' : '🔊 音声を聞く'}
        </button>
      </div>

      {/* Examples */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          例（この声調を使う単語）
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {tone.examples.map((example, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors"
            >
              <p className="text-xl font-bold text-primary-600 mb-1">
                {example.word}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                発音: {example.pronunciation}
              </p>
              <p className="text-sm text-gray-900">意味: {example.meaning}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Hint */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500 text-center">
          💡 ヒント: 同じ音「ma」で声調を変えると意味が変わります。他の声調カードと比較してみましょう
        </p>
      </div>
    </div>
  );
}
