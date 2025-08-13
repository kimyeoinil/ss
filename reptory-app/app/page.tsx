'use client';

import Link from 'next/link';
import { ArrowRight, Shield, Search, Heart, Sparkles, TrendingUp, Users, Star } from 'lucide-react';
import { useEffect } from 'react';
import SearchSection from '@/components/features/home/SearchSection';
import AdBanner from '@/components/features/home/AdBanner';
import { HealthCheckIcon } from '@/components/icons/HealthIcons';
import AnimalCategoryCard from '@/components/ui/AnimalCategoryCard';

export default function HomePage() {
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
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 검색 섹션 */}
      <SearchSection />
      
      {/* 히어로 섹션 */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        <div className="relative px-4 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              AI로 검증된 안심 거래
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              특수동물의<br />
              건강한 새 가족을<br />
              찾아보세요
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              AI 건강 진단으로 믿을 수 있는<br />
              특수동물 거래 플랫폼
            </p>
            
            <div className="space-y-3">
              <Link href="/animals" className="btn-primary w-full max-w-xs mx-auto flex">
                지금 둘러보기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/diagnosis" className="btn-secondary w-full max-w-xs mx-auto">
                AI 건강진단 체험하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 광고 배너 */}
      <section className="px-4 py-6">
        <AdBanner 
          title="🎉 신규 회원 특별 혜택"
          subtitle="지금 가입하면 첫 거래 수수료 50% 할인!"
          backgroundColor="bg-gradient-to-r from-purple-500 to-pink-500"
        />
      </section>

      {/* 인기 카테고리 */}
      <section className="px-4 py-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">인기 카테고리</h2>
        <div className="grid grid-cols-3 gap-2">
          {categories.map((category) => (
            <AnimalCategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              image={category.image}
              count={category.count}
              iconType={category.id as 'ball_python' | 'leopard_gecko' | 'crested_gecko' | 'bearded_dragon' | 'tortoise'}
            />
          ))}
        </div>
        <Link 
          href="/animals" 
          className="btn-primary w-full mt-4 flex items-center justify-center"
        >
          전체 동물 보기
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </section>

      {/* 핵심 기능 */}
      <section className="px-4 py-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">왜 Reptory인가요?</h2>
        <div className="space-y-3">
          <FeatureCard
            icon={<Shield className="h-6 w-6" />}
            title="AI 건강 진단"
            description="사진만으로 즉시 건강 상태 분석"
            color="bg-green-100 text-green-800"
          />
          <FeatureCard
            icon={<Search className="h-6 w-6" />}
            title="모프 자동 인식"
            description="희귀 패턴과 색상까지 정확하게"
            color="bg-blue-100 text-blue-800"
          />
          <FeatureCard
            icon={<Heart className="h-6 w-6" />}
            title="안전한 거래"
            description="에스크로로 보호되는 안심 거래"
            color="bg-red-100 text-red-800"
          />
        </div>
      </section>

      {/* 인증 브리더 섹션 */}
      <section className="px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">인증 브리더</h2>
          <Link href="/breeders" className="text-sm text-green-600 hover:text-green-700">
            전체보기 →
          </Link>
        </div>
        
        {/* 브리더 카드 */}
        <div className="space-y-3">
          <Link href="/breeder/breeder-1">
            <div className="bg-white rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="h-7 w-7 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">라이언게코</h3>
                <p className="text-sm text-gray-600">크레스티드게코 전문</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-medium">4.8</span>
                  <span className="text-xs text-gray-500">(152)</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-green-600 font-medium">AI진단 95%</span>
              </div>
            </div>
          </Link>
          
          <Link href="/breeder/breeder-2">
            <div className="bg-white rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-7 w-7 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">파이톤마스터</h3>
                <p className="text-sm text-gray-600">볼파이톤 전문</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-medium">4.9</span>
                  <span className="text-xs text-gray-500">(89)</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-green-600 font-medium">AI진단 88%</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 두 번째 광고 배너 */}
      <section className="px-4 py-6">
        <AdBanner 
          title="🏆 프리미엄 브리더 인증"
          subtitle="안전한 거래를 위한 전문 브리더 등록"
          backgroundColor="bg-gradient-to-r from-green-600 to-green-700"
        />
      </section>

      {/* 실시간 현황 */}
      <section className="px-4 py-8">
        <div className="card p-6 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">오늘의 Reptory</h3>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatItem label="신규 등록" value="23" unit="마리" />
            <StatItem label="AI 진단" value="156" unit="건" />
            <StatItem label="안전 거래" value="48" unit="건" />
            <StatItem label="만족도" value="98" unit="%" />
          </div>
        </div>
      </section>
    </div>
  );
}

const categories = [
  { 
    id: 'ball_python', 
    name: '볼파이톤', 
    image: '/images/animals/ball-python-illust.svg',
    count: 234 
  },
  { 
    id: 'leopard_gecko', 
    name: '레오파드게코', 
    image: '/images/animals/leopard-gecko-illust.svg',
    count: 189 
  },
  { 
    id: 'crested_gecko', 
    name: '크레스티드게코', 
    image: '/images/animals/crested-gecko-illust.svg',
    count: 156 
  },
  { 
    id: 'tortoise', 
    name: '육지거북', 
    image: '/images/animals/tortoise-illust.svg',
    count: 87 
  },
  { 
    id: 'bearded_dragon', 
    name: '비어디드래곤', 
    image: '/images/animals/bearded-dragon-illust.svg',
    count: 142 
  },
];

function FeatureCard({ icon, title, description, color }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="card p-4 flex items-start gap-4">
      <div className={`p-3 rounded-2xl ${color}`}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function StatItem({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">
        {value}<span className="text-base font-normal text-gray-600">{unit}</span>
      </p>
    </div>
  );
}