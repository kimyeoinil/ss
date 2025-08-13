'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, MapPin, Calendar } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import { localStorage } from '@/lib/localStorage/storage';
import { Animal } from '@/types';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

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
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const data = localStorage.getData();
    if (data) {
      const favoriteAnimals = data.animals.filter(animal => 
        data.favorites.includes(animal.id)
      );
      setFavorites(favoriteAnimals);
    }
    setLoading(false);
  };

  const removeFavorite = (id: string) => {
    const data = localStorage.getData();
    if (data) {
      const newFavorites = data.favorites.filter(favId => favId !== id);
      localStorage.updateData(current => ({
        ...current,
        favorites: newFavorites
      }));
      setFavorites(prev => prev.filter(item => item.id !== id));
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays}일 전`;
    } else if (diffInHours > 0) {
      return `${diffInHours}시간 전`;
    } else {
      return '방금 전';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">🦎</div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-safe-offset-ios">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <h1 className="text-xl font-bold text-gray-900">찜한 동물</h1>
        <p className="text-sm text-gray-600 mt-1">총 {favorites.length}마리</p>
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          illustration="favorites"
          title="아직 찜한 동물이 없어요"
          description="마음에 드는 동물을 찜해두고 나중에 다시 확인해보세요"
          actionLabel="동물 둘러보기"
          actionHref="/animals"
        />
      ) : (
        <div className="p-4 space-y-3">
          {favorites.map((animal) => (
            <div key={animal.id} className="card overflow-hidden">
              <Link href={`/animals/${animal.id}`} className="flex p-4">
                <div className="w-24 h-24 bg-gray-200 rounded-xl flex-shrink-0 overflow-hidden">
                  {animal.images && animal.images.length > 0 ? (
                    <img 
                      src={animal.images[0]} 
                      alt={animal.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-3xl opacity-30">🦎</span>
                    </div>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      {animal.isHealthChecked && (
                        <span className="badge-success text-xs mb-1">AI 건강진단</span>
                      )}
                      <h3 className="font-medium text-gray-900">{animal.title}</h3>
                      <p className="text-lg font-bold text-gray-900 mt-1">
                        ₩{formatPrice(animal.price)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeFavorite(animal.id);
                      }}
                      className="p-2"
                    >
                      <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {animal.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {getTimeAgo(animal.createdAt)}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}