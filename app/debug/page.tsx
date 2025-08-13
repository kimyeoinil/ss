'use client';

import { useEffect, useState } from 'react';
import { allAnimals } from '@/lib/mockData/initialData';
import { breederAnimals } from '@/lib/mockData/breederData';

export default function DebugPage() {
  interface LocalStorageData {
    animals?: Array<{id: string; title: string}>;
  }
  const [localData, setLocalData] = useState<LocalStorageData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('reptory_data');
    if (data) {
      setLocalData(JSON.parse(data));
    }
  }, []);

  const resetLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Debug Page</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">브리더 동물 IDs:</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(Object.keys(breederAnimals).map(breederId => ({
            breederId,
            animalIds: breederAnimals[breederId].map(a => a.id)
          })), null, 2)}
        </pre>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">전체 동물 IDs (allAnimals):</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
          {JSON.stringify(allAnimals.map(a => ({ id: a.id, title: a.title })), null, 2)}
        </pre>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">LocalStorage 동물 IDs:</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
          {localData ? JSON.stringify(localData.animals?.map((a) => ({ id: a.id, title: a.title })), null, 2) : 'No data'}
        </pre>
      </div>

      <button
        onClick={resetLocalStorage}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        LocalStorage 초기화
      </button>
    </div>
  );
}