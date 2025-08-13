'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Star, CheckCircle, Instagram, Youtube, Globe, MessageCircle } from 'lucide-react';
import { getBreederById, getBreederAnimals, getBreederReviews } from '@/lib/mockData/breederData';
import { SPECIES } from '@/types';
import AnimalCard from '@/components/features/animals/AnimalCard';
import { motion } from 'framer-motion';

export default function BreederProfilePage() {
  const params = useParams();
  const breederId = params.id as string;
  
  const breeder = getBreederById(breederId);
  const animals = getBreederAnimals(breederId);
  const reviews = getBreederReviews(breederId);

  if (!breeder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">브리더를 찾을 수 없습니다</h1>
          <Link href="/breeders" className="text-green-600 hover:text-green-700">
            브리더 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center gap-3">
          <Link href="/breeders" className="p-2 -m-2">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-bold">브리더 프로필</h1>
        </div>
      </header>

      {/* 프로필 섹션 */}
      <section className="bg-white">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
              {breeder.profileImage ? (
                <img src={breeder.profileImage} alt={breeder.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-500">
                  {breeder.name[0]}
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold">{breeder.name}</h2>
                {breeder.isVerified && (
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                )}
              </div>
              {breeder.businessName && (
                <p className="text-gray-600 mb-2">{breeder.businessName}</p>
              )}
              <div className="flex items-center gap-1 text-gray-600 mb-3">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{breeder.location}</span>
              </div>
              
              {/* 평점 */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-semibold">{breeder.rating}</span>
                  <span className="text-gray-500">({breeder.reviewCount})</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-gray-600">거래 {breeder.transactionCount}건</span>
              </div>
            </div>
          </div>

          {/* 소개 */}
          <p className="mt-4 text-gray-700 leading-relaxed">
            {breeder.description}
          </p>

          {/* 전문 분야 */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">전문 분야</h3>
            <div className="flex flex-wrap gap-2">
              {breeder.specialties.map(species => (
                <span key={species} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {SPECIES[species]}
                </span>
              ))}
            </div>
          </div>

          {/* 신뢰도 지표 */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">AI 진단서 발급률</p>
              <p className="text-2xl font-bold text-green-600">{breeder.aiDiagnosisRate}%</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">브리더 경력</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Date().getFullYear() - breeder.createdAt.getFullYear()}년
              </p>
            </div>
          </div>

          {/* SNS 링크 */}
          {breeder.socialLinks && (
            <div className="mt-6 flex gap-3">
              {breeder.socialLinks.instagram && (
                <a href={`https://instagram.com/${breeder.socialLinks.instagram.replace('@', '')}`} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                  <Instagram className="h-5 w-5" />
                  <span className="text-sm">Instagram</span>
                </a>
              )}
              {breeder.socialLinks.youtube && (
                <a href={`https://youtube.com/@${breeder.socialLinks.youtube}`} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                  <Youtube className="h-5 w-5" />
                  <span className="text-sm">YouTube</span>
                </a>
              )}
              {breeder.socialLinks.blog && (
                <a href={`https://${breeder.socialLinks.blog}`} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                  <Globe className="h-5 w-5" />
                  <span className="text-sm">Blog</span>
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 판매 중인 동물 */}
      <section className="mt-6">
        <div className="px-4 py-3 bg-white border-b">
          <h3 className="font-bold text-lg">판매 중인 동물 ({animals.length})</h3>
        </div>
        
        <div className="p-4">
          {animals.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {animals.map((animal, index) => (
                <motion.div
                  key={animal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AnimalCard animal={animal} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              현재 판매 중인 동물이 없습니다
            </div>
          )}
        </div>
      </section>

      {/* 거래 후기 */}
      <section className="mt-6 mb-20">
        <div className="px-4 py-3 bg-white border-b">
          <h3 className="font-bold text-lg">거래 후기 ({reviews.length})</h3>
        </div>
        
        <div className="bg-white">
          {reviews.length > 0 ? (
            <div className="divide-y">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{review.authorName}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.content}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              아직 거래 후기가 없습니다
            </div>
          )}
        </div>
      </section>

      {/* 문의하기 버튼 */}
      <div className="fixed bottom-4 left-4 right-4 z-40">
        <button className="btn-primary w-full flex items-center justify-center gap-2">
          <MessageCircle className="h-5 w-5" />
          브리더에게 문의하기
        </button>
      </div>
    </div>
  );
}