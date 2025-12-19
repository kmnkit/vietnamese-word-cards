'use client';

import { useEffect, useState } from 'react';
import { useOfflineContext } from './OfflineProvider';
import type { OfflineCapabilityStatus } from '@/lib/hooks/useOffline';

export default function OfflineStatus() {
  const { isOffline, getOfflineCapabilities } = useOfflineContext();
  const [capabilities, setCapabilities] = useState<OfflineCapabilityStatus | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const updateCapabilities = async () => {
      const caps = await getOfflineCapabilities();
      setCapabilities(caps);
    };

    updateCapabilities();
    
    // Update capabilities every 30 seconds when offline
    const interval = isOffline ? setInterval(updateCapabilities, 30000) : null;
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [getOfflineCapabilities, isOffline]);

  if (!capabilities || !isOffline) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-blue-600 text-white rounded-lg shadow-lg overflow-hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-blue-700 transition-colors"
          aria-expanded={isExpanded}
          aria-controls="offline-details"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="font-medium">オフラインモード</span>
          </div>
          <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        
        {isExpanded && (
          <div id="offline-details" className="px-4 pb-4 border-t border-blue-500">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>音声ファイル:</span>
                <span className="font-medium">{capabilities.audioCache} 個</span>
              </div>
              <div className="flex justify-between">
                <span>データファイル:</span>
                <span className="font-medium">{capabilities.dataCache} 個</span>
              </div>
              <div className="flex justify-between">
                <span>学習可能時間:</span>
                <span className="font-medium text-green-300">
                  約 {capabilities.estimatedOfflineTime} 分
                </span>
              </div>
              {capabilities.lastSync && (
                <div className="flex justify-between text-xs text-blue-200">
                  <span>最終同期:</span>
                  <span>{new Date(capabilities.lastSync).toLocaleString('ja-JP')}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}