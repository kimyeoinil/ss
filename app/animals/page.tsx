'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, ChevronDown, Search } from 'lucide-react';
import AnimalCard from '@/components/features/animals/AnimalCard';
import { allAnimals } from '@/lib/mockData/initialData';
import { SPECIES } from '@/types';
import { localStorage } from '@/lib/localStorage/storage';

export default function AnimalsPage() {
  const searchParams = useSearchParams();
  const initialSpecies = searchParams.get('species') || 'all';
  
  const [animals, setAnimals] = useState(allAnimals);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<string>(initialSpecies);
  const [sortBy, setSortBy] = useState<string>('latest');
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // 백스페이스 키 방지
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace' || e.keyCode === 8) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' && !target.isContentEditable) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const data = localStorage.getData();
    if (data) {
      setAnimals(data.animals);
      setFavorites(data.favorites);
    } else {
      localStorage.setData({
        animals: allAnimals,
        favorites: [],
        viewHistory: []
      });
    }
  }, []);

  const handleFavorite = (animalId: string) => {
    const newFavorites = favorites.includes(animalId)
      ? favorites.filter(id => id !== animalId)
      : [...favorites, animalId];
    
    setFavorites(newFavorites);
    localStorage.updateData(data => ({
      ...data,
      favorites: newFavorites
    }));
  };

  const filteredAndSortedAnimals = animals
    .filter(animal => {
      const matchesSpecies = selectedSpecies === 'all' || animal.species === selectedSpecies;
      const matchesSearch = searchTerm === '' || 
        animal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSpecies && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 스티키 필터 헤더 */}
      <div className="sticky top-14 z-40 bg-white border-b border-gray-100">
        <div className="px-4 py-3">
          {/* 검색창 */}
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="어떤 동물을 찾으시나요?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-12"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          
          {/* 카테고리 필터 - 가로 스크롤 */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 mb-3">
            <button
              onClick={() => setSelectedSpecies('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedSpecies === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              전체
            </button>
            {Object.entries(SPECIES).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSelectedSpecies(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedSpecies === key
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {value}
              </button>
            ))}
          </div>

          {/* 정렬 및 필터 */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <SlidersHorizontal className="h-4 w-4" />
              필터
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm font-medium text-gray-700 bg-transparent focus:outline-none"
            >
              <option value="latest">최신순</option>
              <option value="price-low">가격 낮은순</option>
              <option value="price-high">가격 높은순</option>
            </select>
          </div>
        </div>

        {/* 상세 필터 (토글) */}
        {showFilters && (
          <div className="px-4 py-4 border-t bg-gray-50">
            <p className="text-sm text-gray-600">
              모프, 성별, 크기, 가격, 지역 필터가 곧 추가됩니다.
            </p>
          </div>
        )}
      </div>

      {/* 결과 정보 */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-sm text-gray-600">
          총 <span className="font-semibold text-gray-900">{filteredAndSortedAnimals.length}개</span>의 동물
        </p>
      </div>

      {/* 동물 리스트 그리드 - 모바일 최적화 */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-3">
          {filteredAndSortedAnimals.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              onFavorite={handleFavorite}
              isFavorite={favorites.includes(animal.id)}
            />
          ))}
        </div>
      </div>

      {/* 빈 상태 */}
      {filteredAndSortedAnimals.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-6xl mb-4 animate-pulse">🦎</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            검색 결과가 없습니다
          </h3>
          <p className="text-sm text-gray-600 text-center px-8">
            다른 카테고리를 선택하거나<br />
            필터를 변경해보세요
          </p>
        </div>
      )}

      {/* 플로팅 액션 버튼 (판매 등록) */}
      <button className="fab">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}