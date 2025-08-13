'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, FileText, Trash2 } from 'lucide-react';
import { DiagnosisResult, SPECIES } from '@/types';
import { motion } from 'framer-motion';

export default function DiagnosisHistoryPage() {
  const [diagnoses, setDiagnoses] = useState<DiagnosisResult[]>([]);

  useEffect(() => {
    // 로컬스토리지에서 진단 이력 불러오기
    const savedDiagnoses = localStorage.getItem('reptory_diagnoses');
    if (savedDiagnoses) {
      const parsed = JSON.parse(savedDiagnoses) as Array<Omit<DiagnosisResult, 'createdAt'> & {createdAt: string}>;
      // 날짜 문자열을 Date 객체로 변환
      const diagnosesWithDates = parsed.map((d) => ({
        ...d,
        createdAt: new Date(d.createdAt)
      }));
      // 최신순 정렬
      diagnosesWithDates.sort((a: DiagnosisResult, b: DiagnosisResult) => 
        b.createdAt.getTime() - a.createdAt.getTime()
      );
      setDiagnoses(diagnosesWithDates);
    }
  }, []);

  const handleDelete = (id: string) => {
    const filtered = diagnoses.filter(d => d.id !== id);
    setDiagnoses(filtered);
    localStorage.setItem('reptory_diagnoses', JSON.stringify(filtered));
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/diagnosis" className="p-2 -m-2">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-xl font-bold">진단 이력</h1>
          </div>
          <span className="text-sm text-gray-500">
            총 {diagnoses.length}건
          </span>
        </div>
      </header>

      <div className="p-4">
        {diagnoses.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">아직 진단 이력이 없습니다</p>
            <Link href="/diagnosis" className="btn-primary">
              첫 진단 시작하기
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {diagnoses.map((diagnosis, index) => (
              <motion.div
                key={diagnosis.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="flex">
                  {/* 이미지 */}
                  <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                    <img
                      src={diagnosis.imageUrl}
                      alt="진단 이미지"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* 정보 */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {SPECIES[diagnosis.morphAnalysis.species]}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {diagnosis.morphAnalysis.morph}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(diagnosis.id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <span className={`font-semibold ${getHealthColor(diagnosis.healthStatus)}`}>
                        건강점수 {diagnosis.healthScore}
                      </span>
                      <span className="text-gray-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(diagnosis.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* 액션 버튼 */}
                <div className="border-t px-4 py-2 bg-gray-50">
                  <Link
                    href={`/diagnosis/result/${diagnosis.id}`}
                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    상세 결과 보기 →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}