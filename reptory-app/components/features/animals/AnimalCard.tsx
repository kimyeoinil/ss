import Link from 'next/link';
import { Heart, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Animal, SPECIES } from '@/types';
import { useState } from 'react';

interface AnimalCardProps {
  animal: Animal;
  onFavorite?: (id: string) => void;
  isFavorite?: boolean;
}

export default function AnimalCard({ animal, onFavorite, isFavorite = false }: AnimalCardProps) {
  const [imageError, setImageError] = useState(false);
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

  return (
    <div className="card-interactive group">
      <Link href={`/animals/${animal.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {/* 실제 이미지 또는 플레이스홀더 */}
          {animal.images && animal.images.length > 0 && !imageError ? (
            <img
              src={animal.images[0]}
              alt={animal.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl opacity-30">🦎</span>
            </div>
          )}
          
          {/* 검증 뱃지 - 웹앱 스타일 */}
          {animal.isHealthChecked && (
            <div className="absolute top-3 left-3">
              <div className="badge-success flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                AI 검증
              </div>
            </div>
          )}

          {/* 찜하기 버튼 - 플로팅 스타일 */}
          {onFavorite && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onFavorite(animal.id);
              }}
              className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md active:scale-90 transition-all"
            >
              <Heart
                className={`h-5 w-5 transition-colors ${
                  isFavorite ? 'fill-accent-coral text-accent-coral' : 'text-gray-600'
                }`}
              />
            </button>
          )}

          {/* 그라디언트 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/animals/${animal.id}`}>
          {/* 종류 태그 */}
          <span className="text-xs text-gray-600 font-medium">
            {SPECIES[animal.species as keyof typeof SPECIES]}
          </span>
          
          {/* 제목 */}
          <h3 className="font-semibold text-gray-900 mt-1 mb-2 line-clamp-1">
            {animal.title}
          </h3>
          
          {/* 가격 */}
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-xl font-bold text-gray-900">
              ₩{formatPrice(animal.price)}
            </span>
          </div>

          {/* 메타 정보 - 더 심플하게 */}
          <div className="flex items-center text-xs text-gray-500 gap-3">
            {animal.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {animal.location.split(' ')[0]}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {getTimeAgo(animal.createdAt)}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}