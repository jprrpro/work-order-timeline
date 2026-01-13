import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  // Optional: A signal to track storage changes across the app reactively
  storageChange = signal<string | null>(null);

  /**
   * Save data to local storage
   */
  setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
      this.storageChange.set(key); // Notify listeners
    } catch (error) {
      console.error(`Error saving to localStorage: ${key}`, error);
    }
  }

  /**
   * Retrieve data from local storage
   */
  getItem<T>(key: string): T | null {
    try {
      const data = localStorage.getItem(key);
      return data ? (JSON.parse(data) as T) : null;
    } catch (error) {
      console.error(`Error reading from localStorage: ${key}`, error);
      return null;
    }
  }

  /**
   * Remove a specific item
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
    this.storageChange.set(key);
  }

  /**
   * Clear all local storage data for this domain
   */
  clear(): void {
    localStorage.clear();
    this.storageChange.set('__ALL_CLEARED__');
  }

  /**
   * Check if a key exists
   */
  exists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
