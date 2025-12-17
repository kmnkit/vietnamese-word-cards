// ローカルストレージのバージョン管理
const STORAGE_VERSION = '1.0.0';
const VERSION_KEY = 'app_version';

/**
 * ローカルストレージにデータを保存
 */
export const setItem = <T>(key: string, value: T): void => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Error saving to localStorage (key: ${key}):`, error);
  }
};

/**
 * ローカルストレージからデータを取得
 */
export const getItem = <T>(key: string, defaultValue?: T): T | null => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue ?? null;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading from localStorage (key: ${key}):`, error);
    return defaultValue ?? null;
  }
};

/**
 * ローカルストレージからデータを削除
 */
export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage (key: ${key}):`, error);
  }
};

/**
 * ローカルストレージを全てクリア
 */
export const clearAll = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

/**
 * ストレージのバージョンを取得
 */
export const getStorageVersion = (): string | null => {
  return getItem<string>(VERSION_KEY);
};

/**
 * ストレージのバージョンを設定
 */
export const setStorageVersion = (version: string): void => {
  setItem(VERSION_KEY, version);
};

/**
 * データマイグレーション
 * アプリのバージョンアップ時にデータ構造が変わった場合の対応
 */
export const migrateData = (): void => {
  const currentVersion = getStorageVersion();

  if (!currentVersion) {
    // 初回起動
    setStorageVersion(STORAGE_VERSION);
    return;
  }

  if (currentVersion === STORAGE_VERSION) {
    // バージョン一致、マイグレーション不要
    return;
  }

  // バージョン別のマイグレーション処理
  console.log(`Migrating data from version ${currentVersion} to ${STORAGE_VERSION}`);

  // 将来的にバージョンアップ時のマイグレーションロジックをここに追加
  // 例:
  // if (currentVersion === '1.0.0' && STORAGE_VERSION === '1.1.0') {
  //   // 1.0.0 → 1.1.0 のマイグレーション処理
  // }

  setStorageVersion(STORAGE_VERSION);
};

/**
 * ストレージの使用可能性をチェック
 */
export const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

/**
 * ストレージの使用量を取得（概算、バイト単位）
 */
export const getStorageSize = (): number => {
  let total = 0;
  for (const key in localStorage) {
    if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
      total += localStorage[key].length + key.length;
    }
  }
  return total;
};

/**
 * ストレージの使用量を人間が読みやすい形式で取得
 */
export const getStorageSizeFormatted = (): string => {
  const bytes = getStorageSize();
  const kb = bytes / 1024;
  const mb = kb / 1024;

  if (mb >= 1) {
    return `${mb.toFixed(2)} MB`;
  } else if (kb >= 1) {
    return `${kb.toFixed(2)} KB`;
  } else {
    return `${bytes} bytes`;
  }
};
