import { Phase1Data } from '@/types';

const STORAGE_KEY = 'reptory_phase1';

export const localStorage = {
  getData: (): Phase1Data | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      const data = window.localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  setData: (data: Phase1Data): void => {
    if (typeof window === 'undefined') return;
    
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },

  updateData: (updater: (data: Phase1Data) => Phase1Data): void => {
    const currentData = localStorage.getData();
    if (currentData) {
      localStorage.setData(updater(currentData));
    }
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(STORAGE_KEY);
  }
};