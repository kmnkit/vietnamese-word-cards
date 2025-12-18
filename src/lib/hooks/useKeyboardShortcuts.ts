import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function useKeyboardShortcuts() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      // Global shortcuts (Ctrl/Cmd + Key)
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'h':
            e.preventDefault();
            router.push('/');
            break;
          case 'f':
            e.preventDefault();
            router.push('/flashcards');
            break;
          case 'q':
            e.preventDefault();
            router.push('/quiz');
            break;
          case 'p':
            e.preventDefault();
            router.push('/progress');
            break;
          default:
            break;
        }
      }

      // Escape key - go back or close
      if (e.key === 'Escape') {
        // If not on home page, go back
        if (pathname !== '/') {
          e.preventDefault();
          router.back();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, pathname]);
}
