'use client';

import { useEffect, useCallback } from 'react';
import { useUserProgressActions, useSyncStatus } from '@/stores/userProgressStore';
import { useOfflineContext } from '@/components/OfflineProvider';

/**
 * Hook that manages automatic background sync for offline/online state changes
 * Implements PWA-003 background sync functionality
 */
export const useOfflineSync = () => {
  const { isOnline, isOffline } = useOfflineContext();
  const { syncWithBackend, setSyncStatus } = useUserProgressActions();
  const { syncStatus, lastSyncTime } = useSyncStatus();

  // Background sync function
  const handleBackgroundSync = useCallback(async () => {
    if (isOffline || syncStatus === 'syncing') {
      return; // Skip if offline or already syncing
    }

    try {
      console.log('Starting background sync...');
      await syncWithBackend();
      console.log('Background sync completed successfully');
    } catch (error) {
      console.error('Background sync failed:', error);
      // Keep trying to sync on subsequent online events
    }
  }, [isOffline, syncStatus, syncWithBackend]);

  // Handle online/offline state changes
  useEffect(() => {
    if (isOffline) {
      // Set offline status when going offline
      setSyncStatus('offline');
    } else if (isOnline && syncStatus === 'offline') {
      // Attempt background sync when coming back online
      handleBackgroundSync();
    }
  }, [isOnline, isOffline, syncStatus, setSyncStatus, handleBackgroundSync]);

  // Manual sync function for user-initiated sync
  const forceSync = useCallback(async () => {
    if (isOffline) {
      throw new Error('Cannot sync while offline');
    }

    return handleBackgroundSync();
  }, [isOffline, handleBackgroundSync]);

  // Check if sync is needed (more than 5 minutes since last sync)
  const isSyncNeeded = useCallback(() => {
    if (!lastSyncTime || isOffline) return false;
    
    const lastSync = new Date(lastSyncTime);
    const now = new Date();
    const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
    
    return (now.getTime() - lastSync.getTime()) > fiveMinutes;
  }, [lastSyncTime, isOffline]);

  // Auto-sync every 5 minutes when online
  useEffect(() => {
    if (isOffline || syncStatus === 'syncing') {
      return;
    }

    const interval = setInterval(() => {
      if (isSyncNeeded()) {
        handleBackgroundSync();
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(interval);
  }, [isOffline, syncStatus, isSyncNeeded, handleBackgroundSync]);

  return {
    isOnline,
    isOffline,
    syncStatus,
    lastSyncTime,
    forceSync,
    isSyncNeeded: isSyncNeeded(),
  };
};