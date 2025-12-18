'use client';

import { useState, useEffect } from 'react';
import { PerformanceMonitor, getPerformanceSummary, PERFORMANCE_BUDGETS } from '@/lib/performance-monitor';

/**
 * Performance monitoring dashboard component
 * Displays real-time performance metrics and budget status
 */
export const PerformanceMonitorDashboard: React.FC<{ enabled?: boolean }> = ({ 
  enabled = process.env.NODE_ENV === 'development' 
}) => {
  const [summary, setSummary] = useState<ReturnType<typeof getPerformanceSummary> | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    // Initialize monitoring
    PerformanceMonitor.init();

    // Update summary every 5 seconds
    const interval = setInterval(() => {
      setSummary(getPerformanceSummary());
    }, 5000);

    return () => clearInterval(interval);
  }, [enabled]);

  if (!enabled || !summary) {
    return null;
  }

  const getMetricStatus = (value: number, budget: number): 'good' | 'warning' | 'bad' => {
    if (value <= budget) return 'good';
    if (value <= budget * 1.2) return 'warning';
    return 'bad';
  };

  const formatMetricValue = (name: string, value: number): string => {
    if (name === 'CLS') return value.toFixed(3);
    if (name.includes('Time') || name === 'LCP' || name === 'FCP' || name === 'TTFB') {
      return value > 1000 ? `${(value / 1000).toFixed(1)}s` : `${Math.round(value)}ms`;
    }
    if (name === 'memoryUsage') {
      return `${(value / (1024 * 1024)).toFixed(1)}MB`;
    }
    return Math.round(value).toString();
  };

  const getStatusColor = (status: 'good' | 'warning' | 'bad'): string => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'bad': return 'text-red-600 bg-red-50';
    }
  };

  const getBudgetStatusColor = (status: 'passing' | 'warning' | 'failing'): string => {
    switch (status) {
      case 'passing': return 'text-green-700 bg-green-100 border-green-200';
      case 'warning': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'failing': return 'text-red-700 bg-red-100 border-red-200';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className={`
          mb-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
          ${summary.budgetStatus === 'passing' 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : summary.budgetStatus === 'warning'
            ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
            : 'bg-red-600 hover:bg-red-700 text-white'
          }
        `}
      >
        📊 Performance {summary.budgetStatus === 'failing' && '⚠️'}
      </button>

      {/* Dashboard Panel */}
      {isVisible && (
        <div className="w-96 max-h-96 overflow-y-auto bg-white rounded-lg shadow-xl border p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Performance Monitor
            </h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Budget Status */}
          <div className={`p-3 rounded-lg border mb-4 ${getBudgetStatusColor(summary.budgetStatus)}`}>
            <div className="flex justify-between items-center">
              <span className="font-medium">
                Budget Status: {summary.budgetStatus.toUpperCase()}
              </span>
              <span className="text-sm">
                {summary.violations.length} violations
              </span>
            </div>
            <div className="text-sm mt-1">
              Session: {(summary.sessionDuration / 60).toFixed(1)} min
            </div>
          </div>

          {/* Core Web Vitals */}
          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Core Web Vitals</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(summary.coreVitals).map(([name, value]) => {
                const budget = PERFORMANCE_BUDGETS[name as keyof typeof PERFORMANCE_BUDGETS];
                const status = budget ? getMetricStatus(value, budget) : 'good';
                
                return (
                  <div
                    key={name}
                    className={`p-2 rounded text-sm ${getStatusColor(status)}`}
                  >
                    <div className="font-medium">{name}</div>
                    <div>{formatMetricValue(name, value)}</div>
                    {budget && (
                      <div className="text-xs opacity-75">
                        Target: {formatMetricValue(name, budget)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom Metrics */}
          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">App Metrics</h4>
            <div className="space-y-1">
              {Object.entries(summary.customMetrics).map(([name, value]) => {
                const budget = PERFORMANCE_BUDGETS[name as keyof typeof PERFORMANCE_BUDGETS];
                const status = budget ? getMetricStatus(value, budget) : 'good';
                
                return (
                  <div key={name} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      {name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                    <span className={`font-medium ${status === 'good' ? 'text-green-600' : status === 'warning' ? 'text-yellow-600' : 'text-red-600'}`}>
                      {formatMetricValue(name, value)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Violations */}
          {summary.violations.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-700 mb-2">
                Recent Issues ({summary.violations.length})
              </h4>
              <div className="space-y-1 max-h-24 overflow-y-auto">
                {summary.violations.slice(-3).map((violation, index) => (
                  <div
                    key={index}
                    className="text-xs text-red-600 bg-red-50 p-2 rounded"
                  >
                    {violation}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Performance Tips */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-1">Quick Tips</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Target: LCP &lt;2.5s, FID &lt;100ms, CLS &lt;0.1</li>
              <li>• Audio: Load in &lt;3s, subsequent &lt;500ms</li>
              <li>• Gestures: Respond in &lt;100ms</li>
              <li>• Memory: Keep under 50MB</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Lightweight performance indicator for production
 */
export const PerformanceIndicator: React.FC = () => {
  const [status, setStatus] = useState<'good' | 'warning' | 'error'>('good');
  
  useEffect(() => {
    const interval = setInterval(() => {
      const summary = getPerformanceSummary();
      
      if (summary.budgetStatus === 'failing' || summary.violations.length > 10) {
        setStatus('error');
      } else if (summary.budgetStatus === 'warning' || summary.violations.length > 0) {
        setStatus('warning');
      } else {
        setStatus('good');
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const getIndicatorColor = (): string => {
    switch (status) {
      case 'good': return 'bg-green-400';
      case 'warning': return 'bg-yellow-400';
      case 'error': return 'bg-red-400';
    }
  };

  return (
    <div 
      className={`fixed top-4 right-4 w-3 h-3 rounded-full ${getIndicatorColor()} transition-colors z-50`}
      title={`Performance status: ${status}`}
    />
  );
};