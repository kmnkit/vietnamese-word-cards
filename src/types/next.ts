/**
 * Next.js specific types and utilities
 */

import type { CategoryId, QuizType } from './index';

/**
 * Next.js page props with params
 */
export interface NextPageProps<
  TParams extends Record<string, string | string[] | undefined> = Record<string, never>,
  TSearchParams extends Record<string, string | string[] | undefined> = Record<string, never>
> {
  params: TParams;
  searchParams: TSearchParams;
}

/**
 * Dynamic route parameters for flashcard pages
 */
export interface FlashcardParams {
  readonly category: CategoryId;
}

/**
 * Dynamic route parameters for quiz pages
 */
export interface QuizParams {
  readonly type: QuizType;
}

/**
 * Valid route paths in the application
 */
export type AppRoute = 
  | '/'
  | '/flashcards'
  | `/flashcards/${CategoryId}`
  | '/quiz'
  | `/quiz/${QuizType}`
  | '/learn/alphabet'
  | '/learn/tones'
  | '/learn/tones/quiz'
  | '/progress';

/**
 * Type guard to check if a path is a valid app route
 */
export const isValidRoute = (path: string): path is AppRoute => {
  const validPaths = [
    '/',
    '/flashcards',
    '/flashcards/greetings',
    '/flashcards/numbers', 
    '/flashcards/daily',
    '/flashcards/food',
    '/flashcards/business',
    '/quiz',
    '/quiz/ja-to-vi',
    '/quiz/vi-to-ja',
    '/quiz/listening',
    '/learn/alphabet',
    '/learn/tones',
    '/learn/tones/quiz',
    '/progress',
  ];
  
  return validPaths.includes(path as AppRoute);
};

/**
 * Keyboard shortcut configuration
 */
export interface KeyboardShortcut {
  readonly key: string;
  readonly route: AppRoute;
  readonly description: string;
  readonly requiresModifier: boolean;
}

/**
 * Available keyboard shortcuts
 */
export const KEYBOARD_SHORTCUTS: readonly KeyboardShortcut[] = [
  {
    key: 'h',
    route: '/',
    description: 'ホームに移動',
    requiresModifier: true,
  },
  {
    key: 'f',
    route: '/flashcards',
    description: '単語カードに移動',
    requiresModifier: true,
  },
  {
    key: 'q',
    route: '/quiz',
    description: 'クイズに移動',
    requiresModifier: true,
  },
  {
    key: 'p',
    route: '/progress',
    description: '学習統計に移動',
    requiresModifier: true,
  },
  {
    key: 'Escape',
    route: '/',
    description: '戻る/閉じる',
    requiresModifier: false,
  },
] as const;

/**
 * Next.js error page props
 */
export interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Layout component props
 */
export interface LayoutProps {
  children: React.ReactNode;
  params?: Record<string, string>;
}

/**
 * Page metadata type
 */
export interface PageMetadata {
  readonly title: string;
  readonly description: string;
  readonly keywords?: readonly string[];
  readonly openGraph?: {
    readonly title?: string;
    readonly description?: string;
    readonly image?: string;
  };
}

/**
 * Component props that include common Next.js page functionality
 */
export interface BasePageProps {
  readonly className?: string;
  readonly children?: React.ReactNode;
}

/**
 * Type for Next.js generateMetadata function
 */
export type GenerateMetadata<TParams = Record<string, never>> = (props: {
  params: TParams;
  searchParams: Record<string, string | string[] | undefined>;
}) => PageMetadata | Promise<PageMetadata>;