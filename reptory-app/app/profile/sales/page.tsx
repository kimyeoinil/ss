'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Package, Trash2, Edit, Eye } from 'lucide-react';
import Link from 'next/link';
import { localStorage } from '@/lib/localStorage/storage';
import { Animal } from '@/types';

export default function SalesPage() {
  const router = useRouter();
  const [myAnimals, setMyAnimals] = useState<Animal[]>([]);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

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
    loadMyAnimals();
  }, []);

  const loadMyAnimals = () => {
    const data = localStorage.getData();
    if (data) {
      // 판매자 이름이 '판매자'인 동물들만 필터링 (실제로는 로그인한 사용자 ID로 필터링)
      const myRegisteredAnimals = data.animals.filter(animal => 
        animal.seller?.name === '판매자'
      );
      setMyAnimals(myRegisteredAnimals);
    }
  };

  const handleDelete = async (animalId: string) => {
    if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      return;
    }

    setIsDeleting(animalId);

    try {
      // localStorage에서 해당 동물 제거
      localStorage.updateData(data => ({
        ...data,
        animals: data.animals.filter(a => a.id !== animalId),
        // 찜 목록에서도 제거
        favorites: data.favorites.filter(id => id !== animalId)
      }));

      // 목록 다시 로드
      loadMyAnimals();
      alert('삭제되었습니다.');
    } catch (error) {
      console.error('Failed to delete animal:', error);
      alert('삭제에 실패했습니다.');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 py-4">
          <button onClick={() => router.back()} className="p-1">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">판매 내역</h1>
        </div>
      </div>

      {/* 내용 */}
      <div className="p-4">
        {myAnimals.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-6">아직 등록한 동물이 없습니다</p>
            <Link href="/sell" className="btn-primary">
              동물 등록하기
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {myAnimals.map((animal) => (
              <div key={animal.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex gap-4">
                  {/* 이미지 */}
                  <Link href={`/animals/${animal.id}`}>
                    <img
                      src={animal.images[0]}
                      alt={animal.title}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                  </Link>

                  {/* 정보 */}
                  <div className="flex-1">
                    <Link href={`/animals/${animal.id}`}>
                      <h3 className="font-semibold text-gray-900 mb-1">{animal.title}</h3>
                    </Link>
                    <p className="text-sm text-gray-500 mb-2">
                      {new Date(animal.createdAt).toLocaleDateString('ko-KR')} 등록
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {animal.price.toLocaleString()}원
                    </p>
                  </div>
                </div>

                {/* 액션 버튼들 */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                  <Link 
                    href={`/animals/${animal.id}`}
                    className="flex-1 btn-secondary text-sm flex items-center justify-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    보기
                  </Link>
                  <button
                    onClick={() => handleDelete(animal.id)}
                    disabled={isDeleting === animal.id}
                    className="flex-1 btn-secondary text-sm flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    {isDeleting === animal.id ? '삭제 중...' : '삭제'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}