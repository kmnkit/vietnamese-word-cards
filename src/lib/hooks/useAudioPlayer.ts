import { useCallback, useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';

interface UseAudioPlayerOptions {
  preload?: boolean;
  volume?: number;
  onEnd?: () => void;
  onError?: (error: Error) => void;
}

export const useAudioPlayer = (audioUrl: string, options: UseAudioPlayerOptions = {}) => {
  const {
    preload = true,
    volume = 1.0,
    onEnd,
    onError,
  } = options;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const soundRef = useRef<Howl | null>(null);

  // 音声ファイルのロード
  useEffect(() => {
    if (!audioUrl) return;

    setIsLoading(true);
    setError(null);

    const sound = new Howl({
      src: [audioUrl],
      html5: true,
      preload,
      volume,
      onload: () => {
        setIsLoading(false);
      },
      onplay: () => {
        setIsPlaying(true);
      },
      onend: () => {
        setIsPlaying(false);
        onEnd?.();
      },
      onstop: () => {
        setIsPlaying(false);
      },
      onpause: () => {
        setIsPlaying(false);
      },
      onloaderror: (_id, err) => {
        const error = new Error(`音声ファイルの読み込みに失敗しました: ${err}`);
        setError(error);
        setIsLoading(false);
        onError?.(error);
      },
      onplayerror: (_id, err) => {
        const error = new Error(`音声の再生に失敗しました: ${err}`);
        setError(error);
        setIsPlaying(false);
        onError?.(error);
      },
    });

    soundRef.current = sound;

    return () => {
      sound.unload();
    };
  }, [audioUrl, preload, volume, onEnd, onError]);

  // 再生
  const play = useCallback(() => {
    if (soundRef.current && !isPlaying) {
      soundRef.current.play();
    }
  }, [isPlaying]);

  // 一時停止
  const pause = useCallback(() => {
    if (soundRef.current && isPlaying) {
      soundRef.current.pause();
    }
  }, [isPlaying]);

  // 停止
  const stop = useCallback(() => {
    if (soundRef.current) {
      soundRef.current.stop();
    }
  }, []);

  // 音量変更
  const setVolumeLevel = useCallback((newVolume: number) => {
    if (soundRef.current) {
      soundRef.current.volume(Math.max(0, Math.min(1, newVolume)));
    }
  }, []);

  return {
    play,
    pause,
    stop,
    setVolume: setVolumeLevel,
    isPlaying,
    isLoading,
    error,
  };
};
