import { useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { AppRoute } from '@/types';
import { KEYBOARD_SHORTCUTS, isValidRoute } from '@/types';

/**
 * Configuration for keyboard shortcuts hook
 */
interface UseKeyboardShortcutsOptions {
  /** Whether shortcuts are enabled (default: true) */
  readonly enabled?: boolean;
  /** Additional custom shortcuts */
  readonly customShortcuts?: readonly {
    readonly key: string;
    readonly handler: () => void;
    readonly requiresModifier: boolean;
  }[];
}

/**
 * Hook for handling global keyboard shortcuts
 * @param options - Configuration options
 */
export function useKeyboardShortcuts(
  options: UseKeyboardShortcutsOptions = {}
): void {
  const { enabled = true, customShortcuts = [] } = options;
  const router = useRouter();
  const pathname = usePathname();

  /**
   * Check if the current target should ignore keyboard shortcuts
   */
  const shouldIgnoreTarget = useCallback((target: EventTarget | null): boolean => {
    if (!(target instanceof HTMLElement)) {
      return false;
    }

    return (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.tagName === 'SELECT' ||
      target.isContentEditable ||
      target.closest('[role="dialog"]') !== null ||
      target.closest('[role="menu"]') !== null
    );
  }, []);

  /**
   * Navigate to a route safely
   */
  const navigateTo = useCallback((route: AppRoute): void => {
    if (isValidRoute(route)) {
      router.push(route);
    }
  }, [router]);

  /**
   * Handle escape key behavior
   */
  const handleEscape = useCallback((): void => {
    if (pathname !== '/') {
      router.back();
    }
  }, [pathname, router]);

  /**
   * Main keyboard event handler
   */
  const handleKeyDown = useCallback((event: KeyboardEvent): void => {
    if (!enabled || shouldIgnoreTarget(event.target)) {
      return;
    }

    const { key, ctrlKey, metaKey } = event;
    const hasModifier = ctrlKey || metaKey;

    // Handle custom shortcuts first
    for (const shortcut of customShortcuts) {
      if (
        shortcut.key === key &&
        shortcut.requiresModifier === hasModifier
      ) {
        event.preventDefault();
        shortcut.handler();
        return;
      }
    }

    // Handle built-in shortcuts
    for (const shortcut of KEYBOARD_SHORTCUTS) {
      if (
        shortcut.key === key &&
        shortcut.requiresModifier === hasModifier
      ) {
        event.preventDefault();
        
        if (key === 'Escape') {
          handleEscape();
        } else {
          navigateTo(shortcut.route);
        }
        return;
      }
    }
  }, [enabled, shouldIgnoreTarget, customShortcuts, navigateTo, handleEscape]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, handleKeyDown]);
}
