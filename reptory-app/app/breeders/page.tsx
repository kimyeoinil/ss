'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Star, CheckCircle, SlidersHorizontal } from 'lucide-react';
import { mockBreeders } from '@/lib/mockData/breederData';
import { SPECIES } from '@/types';
import { motion } from 'framer-motion';

export default function BreedersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'rating' | 'transaction' | 'ai'>('rating');

  // 필터링 및 정렬
  let filteredBreeders = mockBreeders.filter(breeder => {
    const matchesSearch = breeder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         breeder.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         breeder.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecies = !selectedSpecies || breeder.specialties.includes(selectedSpecies as any);
    
    return matchesSearch && matchesSpecies;
  });

  // 정렬
  filteredBreeders.sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'transaction':
        return b.transactionCount - a.transactionCount;
      case 'ai':
        return b.aiDiagnosisRate - a.aiDiagnosisRate;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold">전문 브리더</h1>
        </div>
      </header>

      {/* 검색 및 필터 */}
      <div className="bg-white p-4 border-b">
        {/* 검색바 */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="브리더명, 지역으로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* 필터 옵션 */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedSpecies(null)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              !selectedSpecies ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            전체
          </button>
          {Object.entries(SPECIES).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setSelectedSpecies(key)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                selectedSpecies === key ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        {/* 정렬 옵션 */}
        <div className="flex items-center gap-2 mt-3">
          <SlidersHorizontal className="h-4 w-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-sm text-gray-700 bg-transparent focus:outline-none"
          >
            <option value="rating">평점 높은순</option>
            <option value="transaction">거래 많은순</option>
            <option value="ai">AI 진단률 높은순</option>
          </select>
        </div>
      </div>

      {/* 브리더 목록 */}
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-4">
          {filteredBreeders.length}명의 브리더
        </p>

        <div className="space-y-4">
          {filteredBreeders.map((breeder, index) => (
            <motion.div
              key={breeder.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/breeder/${breeder.id}`}>
                <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    {/* 프로필 이미지 */}
                    <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                      {breeder.profileImage ? (
                        <img src={breeder.profileImage} alt={breeder.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl font-bold text-gray-500">
                          {breeder.name[0]}
                        </div>
                      )}
                    </div>

                    {/* 브리더 정보 */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900">{breeder.name}</h3>
                        {breeder.isVerified && (
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      
                      {breeder.businessName && (
                        <p className="text-sm text-gray-600 mb-1">{breeder.businessName}</p>
                      )}

                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                        <MapPin className="h-3 w-3" />
                        <span>{breeder.location}</span>
                      </div>

                      {/* 전문 분야 */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {breeder.specialties.map(species => (
                          <span key={species} className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">
                            {SPECIES[species]}
                          </span>
                        ))}
                      </div>

                      {/* 통계 */}
                      <div className="flex items-center gap-3 text-xs">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="font-semibold">{breeder.rating}</span>
                          <span className="text-gray-500">({breeder.reviewCount})</span>
                        </div>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-600">거래 {breeder.transactionCount}</span>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-600">AI진단 {breeder.aiDiagnosisRate}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}