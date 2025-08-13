'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import ImageModal from './ImageModal';

interface ImageGalleryProps {
  images: string[];
  title: string;
  isHealthChecked?: boolean;
  onExpandClick?: () => void;
}

export default function ImageGallery({ 
  images, 
  title, 
  isHealthChecked,
  onExpandClick 
}: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set(prev).add(index));
  };

  const handlePrevious = () => {
    setIsLoading(true);
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setIsLoading(true);
    setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleThumbnailClick = (index: number) => {
    if (index !== activeIndex) {
      setIsLoading(true);
      setActiveIndex(index);
    }
  };

  const hasImages = images.length > 0 && !imageErrors.has(activeIndex);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
      {/* 메인 이미지 */}
      <div className="relative aspect-square bg-gray-100">
        {/* 로딩 상태 배경 */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-pulse text-6xl opacity-30">🦎</div>
          </div>
        )}
        
        {hasImages ? (
          <>
            <img
              src={images[activeIndex]}
              alt={`${title} - ${activeIndex + 1}`}
              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
              onError={() => handleImageError(activeIndex)}
              onLoad={() => setIsLoading(false)}
              onClick={handleImageClick}
            />
            
            {/* 이미지 네비게이션 - 모바일 친화적 */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                  aria-label="이전 이미지"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                  aria-label="다음 이미지"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* 확대 버튼 */}
            <button
              onClick={handleImageClick}
              className="absolute bottom-4 right-4 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
              aria-label="이미지 확대"
            >
              <Expand className="h-5 w-5" />
            </button>

            {/* 이미지 인디케이터 */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeIndex 
                        ? 'bg-white w-6' 
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`이미지 ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <span className="text-6xl opacity-30">🦎</span>
          </div>
        )}
        
        {/* AI 검증 뱃지 */}
        {isHealthChecked && (
          <div className="absolute top-4 left-4">
            <div className="badge-success flex items-center gap-1.5 px-4 py-2 text-sm font-medium">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              AI 검증 완료
            </div>
          </div>
        )}
      </div>

      {/* 썸네일 리스트 */}
      {images.length > 1 && (
        <div className="p-4 border-t border-gray-100">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all ${
                  index === activeIndex 
                    ? 'ring-2 ring-green-600 ring-offset-2' 
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                {!imageErrors.has(index) ? (
                  <img
                    src={image}
                    alt={`썸네일 ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(index)}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-2xl opacity-30">🦎</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
    
    {/* 이미지 모달 */}
    <ImageModal
      images={images}
      initialIndex={activeIndex}
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    />
    </>
  );
}