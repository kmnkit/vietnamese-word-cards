import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProgress, StudySession } from '@/types';

interface UserProgressState extends UserProgress {
  // Actions
  addLearnedWord: (wordId: string) => void;
  removeLearnedWord: (wordId: string) => void;
  addExperiencePoints: (points: number) => void;
  updateStreak: () => void;
  addStudySession: (session: StudySession) => void;
  resetProgress: () => void;
  isWordLearned: (wordId: string) => boolean;
}

const POINTS_PER_LEVEL = 100;

// デフォルトのユーザー進捗データ
const defaultUserProgress: UserProgress = {
  user_id: 'default_user',
  learned_words: [],
  current_level: 1,
  experience_points: 0,
  streak_days: 0,
  last_study_date: '',
  study_sessions: [],
};

export const useUserProgressStore = create<UserProgressState>()(
  persist(
    (set, get) => ({
      ...defaultUserProgress,

      // 単語を習得済みに追加
      addLearnedWord: (wordId: string) => {
        const { learned_words } = get();
        if (!learned_words.includes(wordId)) {
          set({
            learned_words: [...learned_words, wordId],
          });
        }
      },

      // 単語を習得済みから削除
      removeLearnedWord: (wordId: string) => {
        set({
          learned_words: get().learned_words.filter((id) => id !== wordId),
        });
      },

      // 経験値を追加してレベルアップ判定
      addExperiencePoints: (points: number) => {
        const { experience_points, current_level } = get();
        const newXP = experience_points + points;
        const newLevel = Math.floor(newXP / POINTS_PER_LEVEL) + 1;

        set({
          experience_points: newXP,
          current_level: newLevel,
        });
      },

      // ストリーク（連続学習日数）を更新
      updateStreak: () => {
        const { last_study_date, streak_days } = get();
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

        if (last_study_date === today) {
          // 今日既に学習済み
          return;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (last_study_date === yesterdayStr) {
          // 昨日から連続
          set({
            streak_days: streak_days + 1,
            last_study_date: today,
          });
        } else {
          // 連続が途切れた
          set({
            streak_days: 1,
            last_study_date: today,
          });
        }
      },

      // 学習セッションを追加
      addStudySession: (session: StudySession) => {
        set({
          study_sessions: [...get().study_sessions, session],
        });
      },

      // 進捗をリセット
      resetProgress: () => {
        set(defaultUserProgress);
      },

      // 単語が習得済みかチェック
      isWordLearned: (wordId: string) => {
        return get().learned_words.includes(wordId);
      },
    }),
    {
      name: 'user-progress-storage', // localStorageのキー
    }
  )
);
