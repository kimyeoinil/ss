'use client';

import { X } from 'lucide-react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterType: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default function FilterModal({
  isOpen,
  onClose,
  filterType,
  options,
  selectedValue,
  onSelect,
}: FilterModalProps) {
  if (!isOpen) return null;

  const getFilterTitle = (type: string) => {
    const titles: { [key: string]: string } = {
      species: '종류',
      morph: '모프',
      gender: '성별',
      size: '크기',
      price: '가격',
      location: '지역',
    };
    return titles[type] || type;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-3xl p-6 pb-safe-offset-ios animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">{getFilterTitle(filterType)} 선택</h3>
          <button onClick={onClose} className="p-2">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect(option);
                onClose();
              }}
              className={`w-full p-4 rounded-2xl text-left font-medium transition-colors ${
                selectedValue === option
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}