'use client';

import { useOfflineSync } from '@/hooks/useOfflineSync';

/**
 * Client-side component that manages background sync
 * This is separated to avoid SSR issues
 */
export default function OfflineSyncManager() {
  // Initialize background sync (PWA-003)
  useOfflineSync();

  // This component renders nothing but manages the sync in the background
  return null;
}