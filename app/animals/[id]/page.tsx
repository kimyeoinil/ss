'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Heart, Share2, Shield, Calendar, MapPin, Phone, MessageCircle, Star, ChevronRight } from 'lucide-react';
import { Animal, SPECIES } from '@/types';
import { localStorage } from '@/lib/localStorage/storage';
import ImageGallery from '@/components/features/animals/ImageGallery';
import AnimalCard from '@/components/features/animals/AnimalCard';
import RecommendedAnimals from '@/components/features/animals/RecommendedAnimals';

export default function AnimalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const animalId = params.id as string;
  
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const data = localStorage.getData();
    if (data) {
      const foundAnimal = data.animals.find(a => a.id === animalId);
      if (foundAnimal) {
        setAnimal(foundAnimal);
        setIsFavorite(data.favorites.includes(animalId));
        
        // 조회 기록 추가
        const newViewHistory = [
          ...data.viewHistory.filter(v => v.animalId !== animalId),
          { animalId, viewedAt: new Date().toISOString() }
        ];
        localStorage.updateData(d => ({
          ...d,
          viewHistory: newViewHistory
        }));
      } else {
        router.push('/animals');
      }
    }
  }, [animalId, router]);

  // 백스페이스 키 방지
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 백스페이스 키를 눌렀을 때
      if (e.key === 'Backspace' || e.keyCode === 8) {
        const target = e.target as HTMLElement;
        // input이나 textarea가 아닌 경우에만 방지
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' && !target.isContentEditable) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleFavorite = () => {
    if (!animal) return;
    
    localStorage.updateData(data => {
      const newFavorites = isFavorite
        ? data.favorites.filter(id => id !== animalId)
        : [...data.favorites, animalId];
      
      return {
        ...data,
        favorites: newFavorites
      };
    });
    
    setIsFavorite(!isFavorite);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!animal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-reptile text-6xl">🦎</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      {/* 모바일 상단 네비게이션 */}
      <div className="lg:hidden sticky top-14 z-40 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={() => router.push('/animals')} 
            className="p-2 -ml-2"
            type="button"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-base font-medium truncate flex-1 mx-3">
            {animal?.title || '로딩 중...'}
          </h1>
          <div className="flex gap-2">
            <button onClick={handleFavorite} className="p-2">
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-accent-coral text-accent-coral' : 'text-gray-600'}`} />
            </button>
            <button className="p-2">
              <Share2 className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 lg:py-8">
        {/* 데스크탑 상단 네비게이션 */}
        <div className="hidden lg:block mb-6">
          <button
            onClick={() => router.push('/animals')}
            className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors"
            type="button"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            목록으로 돌아가기
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          {/* 이미지 섹션 */}
          <div className="mx-[-16px] lg:mx-0">
            <ImageGallery 
              images={animal.images} 
              title={animal.title}
              isHealthChecked={animal.isHealthChecked}
              onExpandClick={() => {
                // TODO: 이미지 확대 모달 구현
                console.log('이미지 확대');
              }}
            />

            {/* 판매자 정보 - 모바일에서는 하단으로 이동 */}
            <div className="hidden lg:block bg-white rounded-3xl shadow-sm p-6 mt-4">
              <h3 className="font-semibold text-lg mb-4">판매자 정보</h3>
              {animal.seller && (
                <Link href={animal.seller.breederId ? `/breeder/${animal.seller.breederId}` : '#'}>
                  <div className="flex items-center justify-between mb-4 hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {animal.seller.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{animal.seller.name}</p>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{animal.seller.rating}</span>
                        </div>
                      </div>
                    </div>
                    {animal.seller.breederId && (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </Link>
              )}
              <div className="space-y-2 text-sm text-gray-600">
                {animal.location && (
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {animal.location}
                  </p>
                )}
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  연락 가능 시간: 오전 10시 - 오후 8시
                </p>
              </div>
            </div>
          </div>

          {/* 정보 섹션 */}
          <div className="lg:px-0 px-4">
            <div className="bg-white rounded-3xl shadow-sm p-6">
              {/* 제목과 가격 */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {animal.title}
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  {SPECIES[animal.species as keyof typeof SPECIES]}
                </p>
                <div className="text-3xl font-bold text-primary">
                  {formatPrice(animal.price)}
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex gap-3 mb-6">
                <button className="btn-primary flex-1">
                  구매하기
                </button>
                <button
                  onClick={handleFavorite}
                  className="p-3 border-2 border-gray-300 rounded-lg hover:border-primary transition-colors"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isFavorite ? 'fill-accent-coral text-accent-coral' : 'text-gray-600'
                    }`}
                  />
                </button>
                <button className="p-3 border-2 border-gray-300 rounded-lg hover:border-primary transition-colors">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* 건강 정보 */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">AI 건강 진단 정보</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">건강 상태</span>
                    <span className="font-medium text-green-600">우수</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">진단일</span>
                    <span className="font-medium">2024년 7월 10일</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">진단서</span>
                    <button className="text-primary hover:underline">
                      PDF 다운로드
                    </button>
                  </div>
                </div>
              </div>

              {/* 기본 정보 */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">기본 정보</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">등록일</span>
                    <p className="font-medium">{formatDate(animal.createdAt)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">성별</span>
                    <p className="font-medium">
                      {animal.gender === 'male' ? '수컷' : 
                       animal.gender === 'female' ? '암컷' : '미구분'}
                    </p>
                  </div>
                  {animal.size && (
                    <div>
                      <span className="text-gray-600">크기</span>
                      <p className="font-medium">{animal.size}</p>
                    </div>
                  )}
                  {animal.weight && (
                    <div>
                      <span className="text-gray-600">무게</span>
                      <p className="font-medium">{animal.weight}</p>
                    </div>
                  )}
                  {animal.birthDate && (
                    <div>
                      <span className="text-gray-600">출생</span>
                      <p className="font-medium">{animal.birthDate}</p>
                    </div>
                  )}
                  {animal.morph && (
                    <div>
                      <span className="text-gray-600">모프</span>
                      <p className="font-medium">{animal.morph}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 상세 설명 */}
              <div>
                <h3 className="font-semibold text-lg mb-3">상세 설명</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {animal.description}
                </p>
              </div>
            </div>

            {/* 문의하기 - 데스크탑만 */}
            <div className="hidden lg:block bg-white rounded-3xl shadow-sm p-6 mt-4">
              <button className="w-full btn-secondary flex items-center justify-center gap-2">
                <MessageCircle className="h-5 w-5" />
                판매자에게 문의하기
              </button>
            </div>
          </div>
        </div>

        {/* 모바일 판매자 정보 */}
        <div className="lg:hidden mt-8">
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-4">판매자 정보</h3>
            {animal.seller && (
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {animal.seller.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{animal.seller.name}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{animal.seller.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-2 text-sm text-gray-600">
              {animal.location && (
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {animal.location}
                </p>
              )}
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                연락 가능 시간: 오전 10시 - 오후 8시
              </p>
            </div>
          </div>
        </div>

        {/* 추천 동물 */}
        <RecommendedAnimals 
          currentAnimalId={animal.id} 
          species={animal.species} 
        />
      </div>

      {/* 모바일 스티키 하단 구매 섹션 */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 safe-bottom">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {formatPrice(animal.price).replace('₩', '₩ ')}
            </p>
          </div>
          <button
            onClick={handleFavorite}
            className="p-2"
          >
            <Heart
              className={`h-6 w-6 ${
                isFavorite ? 'fill-accent-coral text-accent-coral' : 'text-gray-400'
              }`}
            />
          </button>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex-1">
            <MessageCircle className="h-5 w-5 mr-2" />
            문의하기
          </button>
          <button className="btn-primary flex-1">
            구매하기
          </button>
        </div>
      </div>
    </div>
  );
}