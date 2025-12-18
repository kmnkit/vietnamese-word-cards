/**
 * LocalStorage utility with type safety and error handling
 */

/** Current application storage version */
const STORAGE_VERSION = '1.0.0' as const;
/** Key for storing version information */
const VERSION_KEY = 'app_version' as const;

/**
 * Type for serializable values that can be stored in localStorage
 */
type SerializableValue = 
  | string 
  | number 
  | boolean 
  | null 
  | undefined
  | SerializableValue[]
  | { [key: string]: SerializableValue };

/**
 * Error types that can occur during localStorage operations
 */
export class LocalStorageError extends Error {
  constructor(
    message: string,
    public readonly operation: 'get' | 'set' | 'remove' | 'clear',
    public readonly key?: string
  ) {
    super(message);
    this.name = 'LocalStorageError';
  }
}

/**
 * Type-safe localStorage operations result
 */
export type StorageResult<T> = 
  | { success: true; data: T }
  | { success: false; error: LocalStorageError };

/**
 * Safely save data to localStorage with type checking
 * @param key - Storage key
 * @param value - Value to store (must be serializable)
 * @returns Result indicating success or failure
 */
export const setItem = <T extends SerializableValue>(
  key: string,
  value: T
): StorageResult<void> => {
  try {
    if (!isLocalStorageAvailable()) {
      return {
        success: false,
        error: new LocalStorageError('localStorage is not available', 'set', key),
      };
    }
    
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return { success: true, data: undefined };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: new LocalStorageError(`Failed to save data: ${message}`, 'set', key),
    };
  }
};

/**
 * Safely retrieve data from localStorage with type safety
 * @param key - Storage key
 * @param defaultValue - Value to return if key doesn't exist or parsing fails
 * @returns Result containing the parsed value or error
 */
export const getItem = <T extends SerializableValue>(
  key: string,
  defaultValue?: T
): StorageResult<T | null> => {
  try {
    if (!isLocalStorageAvailable()) {
      return {
        success: false,
        error: new LocalStorageError('localStorage is not available', 'get', key),
      };
    }

    const item = localStorage.getItem(key);
    if (item === null) {
      return { success: true, data: defaultValue ?? null };
    }
    
    const parsed = JSON.parse(item) as T;
    return { success: true, data: parsed };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: new LocalStorageError(`Failed to parse data: ${message}`, 'get', key),
    };
  }
};

/**
 * Simplified version of getItem that returns data directly (for backward compatibility)
 * @deprecated Use getItem for better error handling
 */
export const getItemUnsafe = <T extends SerializableValue>(
  key: string,
  defaultValue?: T
): T | null => {
  const result = getItem(key, defaultValue);
  return result.success ? result.data : defaultValue ?? null;
};

/**
 * Safely remove data from localStorage
 * @param key - Storage key to remove
 * @returns Result indicating success or failure
 */
export const removeItem = (key: string): StorageResult<void> => {
  try {
    if (!isLocalStorageAvailable()) {
      return {
        success: false,
        error: new LocalStorageError('localStorage is not available', 'remove', key),
      };
    }
    
    localStorage.removeItem(key);
    return { success: true, data: undefined };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: new LocalStorageError(`Failed to remove data: ${message}`, 'remove', key),
    };
  }
};

/**
 * Clear all localStorage data
 * @returns Result indicating success or failure
 */
export const clearAll = (): StorageResult<void> => {
  try {
    if (!isLocalStorageAvailable()) {
      return {
        success: false,
        error: new LocalStorageError('localStorage is not available', 'clear'),
      };
    }
    
    localStorage.clear();
    return { success: true, data: undefined };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: new LocalStorageError(`Failed to clear storage: ${message}`, 'clear'),
    };
  }
};

/**
 * Get current storage version
 * @returns Storage version string or null if not found
 */
export const getStorageVersion = (): string | null => {
  const result = getItem<string>(VERSION_KEY);
  return result.success ? result.data : null;
};

/**
 * Set storage version
 * @param version - Version string to set
 * @returns Result indicating success or failure
 */
export const setStorageVersion = (version: string): StorageResult<void> => {
  return setItem(VERSION_KEY, version);
};

/**
 * Migration result type
 */
export type MigrationResult = 
  | { success: true; migrated: boolean; fromVersion?: string }
  | { success: false; error: LocalStorageError };

/**
 * Perform data migration when app version changes
 * @returns Migration result
 */
export const migrateData = (): MigrationResult => {
  try {
    const currentVersion = getStorageVersion();

    if (!currentVersion) {
      // First time setup
      const setResult = setStorageVersion(STORAGE_VERSION);
      if (!setResult.success) {
        return { success: false, error: setResult.error };
      }
      return { success: true, migrated: false };
    }

    if (currentVersion === STORAGE_VERSION) {
      // Version matches, no migration needed
      return { success: true, migrated: false };
    }

    // Version-specific migration logic
    console.log(`Migrating data from version ${currentVersion} to ${STORAGE_VERSION}`);

    // Future migration logic goes here:
    // if (currentVersion === '1.0.0' && STORAGE_VERSION === '1.1.0') {
    //   // Perform 1.0.0 → 1.1.0 migration
    // }

    const setResult = setStorageVersion(STORAGE_VERSION);
    if (!setResult.success) {
      return { success: false, error: setResult.error };
    }
    
    return { success: true, migrated: true, fromVersion: currentVersion };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown migration error';
    return {
      success: false,
      error: new LocalStorageError(message, 'set'),
    };
  }
};

/**
 * Check if localStorage is available and functional
 * @returns true if localStorage is available and working
 */
export const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__storage_test__';
    const testValue = 'test';
    localStorage.setItem(testKey, testValue);
    const retrieved = localStorage.getItem(testKey);
    localStorage.removeItem(testKey);
    return retrieved === testValue;
  } catch {
    return false;
  }
};

/**
 * Storage size information
 */
export interface StorageInfo {
  readonly totalSizeBytes: number;
  readonly itemCount: number;
  readonly availabilityStatus: 'available' | 'unavailable' | 'quota_exceeded';
}

/**
 * Get localStorage usage information
 * @returns Storage size and item count in bytes
 */
export const getStorageInfo = (): StorageInfo => {
  if (!isLocalStorageAvailable()) {
    return {
      totalSizeBytes: 0,
      itemCount: 0,
      availabilityStatus: 'unavailable',
    };
  }

  try {
    let totalSize = 0;
    let itemCount = 0;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key) || '';
        totalSize += key.length + value.length;
        itemCount++;
      }
    }

    return {
      totalSizeBytes: totalSize,
      itemCount,
      availabilityStatus: 'available',
    };
  } catch {
    return {
      totalSizeBytes: 0,
      itemCount: 0,
      availabilityStatus: 'quota_exceeded',
    };
  }
};

/**
 * Get storage size (backward compatibility)
 * @deprecated Use getStorageInfo for more detailed information
 */
export const getStorageSize = (): number => {
  return getStorageInfo().totalSizeBytes;
};

/**
 * Format storage size in human-readable format
 * @param bytes - Size in bytes
 * @returns Formatted size string
 */
const formatBytes = (bytes: number): string => {
  const kb = bytes / 1024;
  const mb = kb / 1024;
  const gb = mb / 1024;

  if (gb >= 1) {
    return `${gb.toFixed(2)} GB`;
  } else if (mb >= 1) {
    return `${mb.toFixed(2)} MB`;
  } else if (kb >= 1) {
    return `${kb.toFixed(2)} KB`;
  } else {
    return `${bytes} bytes`;
  }
};

/**
 * Get formatted storage usage information
 * @returns Human-readable storage information
 */
export const getStorageSizeFormatted = (): string => {
  const info = getStorageInfo();
  
  if (info.availabilityStatus !== 'available') {
    return info.availabilityStatus === 'unavailable' 
      ? 'Storage unavailable' 
      : 'Storage quota exceeded';
  }
  
  return `${formatBytes(info.totalSizeBytes)} (${info.itemCount} items)`;
};
