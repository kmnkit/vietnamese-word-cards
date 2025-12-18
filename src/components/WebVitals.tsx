'use client';

import { useEffect } from 'react';
import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from 'web-vitals';
import { reportWebVitals } from '@/lib/web-vitals';

/**
 * Web Vitals コンポーネント
 *
 * Core Web Vitals とその他のパフォーマンスメトリクスを追跡します。
 * layout.tsx に配置して全ページで使用します。
 *
 * @example
 * ```tsx
 * // src/app/layout.tsx
 * import WebVitals from '@/components/WebVitals';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <WebVitals />
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export default function WebVitals() {
  useEffect(() => {
    // Core Web Vitals
    onCLS(reportWebVitals); // Cumulative Layout Shift
    onFID(reportWebVitals); // First Input Delay
    onLCP(reportWebVitals); // Largest Contentful Paint

    // Additional Metrics
    onFCP(reportWebVitals); // First Contentful Paint
    onTTFB(reportWebVitals); // Time to First Byte
    onINP(reportWebVitals); // Interaction to Next Paint
  }, []);

  // このコンポーネントは何もレンダリングしない
  return null;
}
