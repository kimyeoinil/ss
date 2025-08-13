'use client';

import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import FilterModal from './FilterModal';

export default function SearchSection() {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    species: '전체',
    morph: '전체',
    gender: '전체',
    size: '전체',
    price: '전체',
    location: '전체',
  });

  const filterOptions = {
    species: ['전체', '볼파이톤', '레오파드게코', '크레스티드게코', '비어디드래곤'],
    morph: ['전체', '노말', '모하비', '파스텔', '알비노', '기타'],
    gender: ['전체', '수컷', '암컷', '미구분'],
    size: ['전체', '베이비', '준성체', '성체'],
    price: ['전체', '10만원 이하', '10-30만원', '30-50만원', '50만원 이상'],
    location: ['전체', '서울', '경기', '인천', '부산', '대구', '기타'],
  };

  return (
    <section className="px-4 py-6 bg-white border-b border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="어떤 동물을 찾으시나요?"
            className="input w-full pl-12"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-3 bg-gray-100 rounded-2xl"
        >
          <ChevronDown className={`h-5 w-5 text-gray-700 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {showFilters && (
        <div className="space-y-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {Object.entries(filters).map(([key, value]) => (
              <button
                key={key}
                className="flex items-center gap-1 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 whitespace-nowrap"
                onClick={() => setActiveFilter(key)}
              >
                {key === 'species' && '종류'}
                {key === 'morph' && '모프'}
                {key === 'gender' && '성별'}
                {key === 'size' && '크기'}
                {key === 'price' && '가격'}
                {key === 'location' && '지역'}
                : {value}
                <ChevronDown className="h-3 w-3" />
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* 필터 모달 */}
      {activeFilter && (
        <FilterModal
          isOpen={!!activeFilter}
          onClose={() => setActiveFilter(null)}
          filterType={activeFilter}
          options={filterOptions[activeFilter as keyof typeof filterOptions]}
          selectedValue={filters[activeFilter as keyof typeof filters]}
          onSelect={(value) => {
            setFilters({ ...filters, [activeFilter]: value });
          }}
        />
      )}
    </section>
  );
}