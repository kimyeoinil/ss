'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Camera, Plus, X, AlertCircle, ArrowRight } from 'lucide-react';
import { AIScanIcon } from '@/components/icons/HealthIcons';
import { localStorage } from '@/lib/localStorage/storage';
import { Animal } from '@/types';

export default function SellPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    species: '',
    morph: '',
    gender: '',
    birthDate: '',
    size: '',
    weight: '',
    price: '',
    location: '',
    title: '',
    description: '',
  });

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    const maxImages = 10 - images.length;

    Array.from(files).slice(0, maxImages).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          newImages.push(reader.result as string);
          if (newImages.length === Math.min(files.length, maxImages)) {
            setImages(prev => [...prev, ...newImages]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // 유효성 검사
    if (!formData.title || !formData.species || !formData.gender || !formData.price || !formData.location || !formData.description) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    if (images.length === 0) {
      alert('최소 1장의 사진을 등록해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const data = localStorage.getData();
      const newAnimal: Animal = {
        id: Date.now().toString(),
        title: formData.title,
        species: formData.species as Animal['species'],
        price: parseInt(formData.price),
        images: images,
        description: formData.description,
        location: formData.location,
        seller: { name: '판매자', rating: 5.0 },
        isHealthChecked: false,
        createdAt: new Date().toISOString(),
        gender: formData.gender as Animal['gender'],
        size: formData.size,
        weight: formData.weight,
        birthDate: formData.birthDate,
        morph: formData.morph,
      };

      localStorage.updateData(current => ({
        ...current,
        animals: [newAnimal, ...current.animals]
      }));

      // 상세 페이지로 이동
      router.push(`/animals/${newAnimal.id}`);
    } catch (error) {
      console.error('Failed to save animal:', error);
      alert('등록에 실패했습니다. 다시 시도해주세요.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-safe-offset-ios">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <h1 className="text-xl font-bold text-gray-900">동물 판매 등록</h1>
      </div>

      {/* 이미지 업로드 섹션 */}
      <section className="bg-white p-4 mb-2">
        <h2 className="text-base font-semibold text-gray-900 mb-3">사진 등록</h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {images.map((image, index) => (
            <div key={index} className="relative flex-shrink-0">
              <img
                src={image}
                alt={`사진 ${index + 1}`}
                className="w-24 h-24 object-cover rounded-2xl"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-24 h-24 bg-gray-100 rounded-2xl flex flex-col items-center justify-center gap-1 flex-shrink-0 border-2 border-dashed border-gray-300"
            disabled={images.length >= 10}
          >
            <Camera className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-500">{images.length}/10</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">첫 번째 사진이 대표 이미지로 설정됩니다</p>
      </section>

      {/* 기본 정보 */}
      <section className="bg-white p-4 mb-2">
        <h2 className="text-base font-semibold text-gray-900 mb-4">기본 정보</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">종류*</label>
            <select
              name="species"
              value={formData.species}
              onChange={handleInputChange}
              className="input"
            >
              <option value="">선택하세요</option>
              <option value="ball_python">볼파이톤</option>
              <option value="leopard_gecko">레오파드게코</option>
              <option value="crested_gecko">크레스티드게코</option>
              <option value="bearded_dragon">비어디드래곤</option>
              <option value="tortoise">육지거북</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">모프</label>
            <input
              type="text"
              name="morph"
              value={formData.morph}
              onChange={handleInputChange}
              placeholder="예: 파스텔, 알비노"
              className="input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">성별*</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="input"
              >
                <option value="">선택</option>
                <option value="male">수컷</option>
                <option value="female">암컷</option>
                <option value="unknown">미구분</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">생년월일</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="input"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">크기</label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                placeholder="예: 30cm"
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">무게</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="예: 150g"
                className="input"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 거래 정보 */}
      <section className="bg-white p-4 mb-2">
        <h2 className="text-base font-semibold text-gray-900 mb-4">거래 정보</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">판매 가격*</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="숫자만 입력"
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">거래 지역*</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="예: 서울 강남구"
              className="input"
            />
          </div>
        </div>
      </section>

      {/* 상세 설명 */}
      <section className="bg-white p-4 mb-2">
        <h2 className="text-base font-semibold text-gray-900 mb-4">상세 설명</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">제목*</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="예: 건강한 볼파이톤 분양합니다"
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">설명*</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              placeholder="동물의 상태, 사육 환경, 분양 이유 등을 자세히 작성해주세요"
              className="input resize-none"
            />
          </div>
        </div>
      </section>

      {/* AI 건강 진단 안내 */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 mx-4 rounded-2xl mb-6">
        <div className="flex items-start gap-4">
          <AIScanIcon className="w-12 h-12 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-1">AI 건강 진단으로 신뢰도 UP!</h3>
            <p className="text-sm text-gray-600 mb-3">
              사진 한 장으로 건강 상태를 분석해 구매자에게 신뢰를 주세요
            </p>
            <Link href="/diagnosis" className="text-sm font-medium text-purple-600 flex items-center gap-1">
              AI 건강 진단 받기
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* 등록 버튼 */}
      <div className="px-4 pb-6">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '등록 중...' : '판매 등록하기'}
        </button>
      </div>
    </div>
  );
}