'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TestDetailPage() {
  const router = useRouter();

  useEffect(() => {
    // 첫 번째 동물의 상세 페이지로 리다이렉트
    router.push('/animals/1');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">동물 상세 페이지 테스트</h1>
        <p>잠시 후 동물 상세 페이지로 이동합니다...</p>
      </div>
    </div>
  );
}