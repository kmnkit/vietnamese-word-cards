'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useOffline, type UseOfflineReturn } from '@/lib/hooks/useOffline';
import OfflineStatus from './OfflineStatus';
import OfflineSyncManager from './OfflineSyncManager';

const OfflineContext = createContext<UseOfflineReturn | null>(null);

interface OfflineProviderProps {
  children: ReactNode;
}

export function OfflineProvider({ children }: OfflineProviderProps) {
  const offline = useOffline();

  // Preload critical assets on app initialization
  useEffect(() => {
    offline.preloadCriticalAssets().catch(console.error);
  }, [offline]);

  return (
    <OfflineContext.Provider value={offline}>
      {children}
      <OfflineIndicator />
      <OfflineStatus />
      <OfflineSyncManager />
    </OfflineContext.Provider>
  );
}

function OfflineIndicator() {
  const offline = useContext(OfflineContext);

  if (!offline || offline.isOnline) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 bg-yellow-500 text-white text-center py-2 px-4 text-sm font-medium z-50"
      role="alert"
      aria-live="assertive"
    >
      <span className="inline-flex items-center gap-2">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
        オフラインモード - 保存されたコンテンツで学習を続けられます
      </span>
    </div>
  );
}

export function useOfflineContext(): UseOfflineReturn {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOfflineContext must be used within an OfflineProvider');
  }
  return context;
}