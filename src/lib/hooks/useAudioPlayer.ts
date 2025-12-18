import { useCallback, useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';

/**
 * Configuration options for the audio player hook
 */
interface UseAudioPlayerOptions {
  /** Whether to preload the audio file (default: true) */
  readonly preload?: boolean;
  /** Initial volume level (0.0 to 1.0, default: 1.0) */
  readonly volume?: number;
  /** Callback fired when audio playback ends */
  readonly onEnd?: () => void;
  /** Callback fired when an error occurs */
  readonly onError?: (error: AudioError) => void;
  /** Callback fired when audio starts playing */
  readonly onPlay?: () => void;
  /** Callback fired when audio is paused */
  readonly onPause?: () => void;
  /** Callback fired when audio loading starts */
  readonly onLoadStart?: () => void;
  /** Callback fired when audio is successfully loaded */
  readonly onLoadEnd?: () => void;
}

/**
 * Audio-specific error with additional context
 */
export class AudioError extends Error {
  constructor(
    message: string,
    public readonly audioUrl: string,
    public readonly errorType: 'load' | 'play' | 'network' | 'decode',
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'AudioError';
  }
}

/**
 * Audio player state
 */
export interface AudioPlayerState {
  readonly isPlaying: boolean;
  readonly isLoading: boolean;
  readonly error: AudioError | null;
  readonly duration: number | null;
  readonly currentTime: number;
}

/**
 * Audio player controls
 */
export interface AudioPlayerControls {
  readonly play: () => Promise<void>;
  readonly pause: () => void;
  readonly stop: () => void;
  readonly setVolume: (volume: number) => void;
  readonly seek: (time: number) => void;
  readonly getCurrentTime: () => number;
  readonly getDuration: () => number | null;
}

/**
 * Return type of useAudioPlayer hook
 */
export interface UseAudioPlayerReturn extends AudioPlayerState, AudioPlayerControls {}

/**
 * Custom hook for audio playback with comprehensive controls and state management
 * @param audioUrl - URL of the audio file to play
 * @param options - Configuration options
 * @returns Audio player state and controls
 */
export const useAudioPlayer = (
  audioUrl: string,
  options: UseAudioPlayerOptions = {}
): UseAudioPlayerReturn => {
  const {
    preload = true,
    volume = 1.0,
    onEnd,
    onError,
    onPlay,
    onPause,
    onLoadStart,
    onLoadEnd,
  } = options;

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AudioError | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const soundRef = useRef<Howl | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Update current time during playback
  const updateCurrentTime = useCallback(() => {
    if (soundRef.current && soundRef.current.playing()) {
      setCurrentTime(soundRef.current.seek() as number || 0);
      animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
    }
  }, []);

  // Stop time updates
  const stopTimeUpdates = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  // Audio file loading and setup
  useEffect(() => {
    if (!audioUrl.trim()) {
      setError(new AudioError('Empty audio URL provided', audioUrl, 'load'));
      return;
    }

    setIsLoading(true);
    setError(null);
    setCurrentTime(0);
    onLoadStart?.();

    const sound = new Howl({
      src: [audioUrl],
      html5: true,
      preload,
      volume: Math.max(0, Math.min(1, volume)), // Clamp volume
      onload: () => {
        setIsLoading(false);
        setDuration(sound.duration() || null);
        onLoadEnd?.();
      },
      onplay: () => {
        setIsPlaying(true);
        updateCurrentTime();
        onPlay?.();
      },
      onend: () => {
        setIsPlaying(false);
        setCurrentTime(0);
        stopTimeUpdates();
        onEnd?.();
      },
      onstop: () => {
        setIsPlaying(false);
        setCurrentTime(0);
        stopTimeUpdates();
      },
      onpause: () => {
        setIsPlaying(false);
        stopTimeUpdates();
        onPause?.();
      },
      onloaderror: (_id, err) => {
        const audioError = new AudioError(
          `Failed to load audio file: ${err}`,
          audioUrl,
          'load',
          err
        );
        setError(audioError);
        setIsLoading(false);
        onError?.(audioError);
      },
      onplayerror: (_id, err) => {
        const audioError = new AudioError(
          `Failed to play audio: ${err}`,
          audioUrl,
          'play',
          err
        );
        setError(audioError);
        setIsPlaying(false);
        stopTimeUpdates();
        onError?.(audioError);
      },
    });

    soundRef.current = sound;

    return () => {
      stopTimeUpdates();
      sound.unload();
    };
  }, [audioUrl, preload, volume, onEnd, onError, onPlay, onPause, onLoadStart, onLoadEnd, updateCurrentTime, stopTimeUpdates]);

  // Play audio with promise support
  const play = useCallback(async (): Promise<void> => {
    if (!soundRef.current) {
      throw new AudioError('Audio not initialized', audioUrl, 'play');
    }
    
    if (isPlaying) {
      return; // Already playing
    }

    if (error) {
      throw error; // Don't play if there's an error
    }

    try {
      soundRef.current.play();
    } catch (err) {
      const audioError = new AudioError(
        'Failed to start playback',
        audioUrl,
        'play',
        err
      );
      setError(audioError);
      throw audioError;
    }
  }, [isPlaying, error, audioUrl]);

  // Pause playback
  const pause = useCallback((): void => {
    if (soundRef.current && isPlaying) {
      soundRef.current.pause();
    }
  }, [isPlaying]);

  // Stop playback
  const stop = useCallback((): void => {
    if (soundRef.current) {
      soundRef.current.stop();
    }
  }, []);

  // Set volume level
  const setVolume = useCallback((newVolume: number): void => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    if (soundRef.current) {
      soundRef.current.volume(clampedVolume);
    }
  }, []);

  // Seek to specific time
  const seek = useCallback((time: number): void => {
    if (soundRef.current && duration !== null) {
      const clampedTime = Math.max(0, Math.min(duration, time));
      soundRef.current.seek(clampedTime);
      setCurrentTime(clampedTime);
    }
  }, [duration]);

  // Get current playback time
  const getCurrentTime = useCallback((): number => {
    if (soundRef.current) {
      return soundRef.current.seek() as number || 0;
    }
    return 0;
  }, []);

  // Get audio duration
  const getDuration = useCallback((): number | null => {
    if (soundRef.current) {
      return soundRef.current.duration() || null;
    }
    return null;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTimeUpdates();
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, [stopTimeUpdates]);

  return {
    // State
    isPlaying,
    isLoading,
    error,
    duration,
    currentTime,
    // Controls
    play,
    pause,
    stop,
    setVolume,
    seek,
    getCurrentTime,
    getDuration,
  } as const;
};
