'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle, Download, RotateCw, ArrowRight, Clock } from 'lucide-react';
import { DiagnosisResult, SPECIES } from '@/types';
import Link from 'next/link';

interface ResultStepProps {
  result: DiagnosisResult;
  onReset: () => void;
}

export default function ResultStep({ result, onReset }: ResultStepProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveResult = () => {
    // 로컬스토리지에 저장
    const savedDiagnoses = localStorage.getItem('reptory_diagnoses');
    const diagnoses = savedDiagnoses ? JSON.parse(savedDiagnoses) : [];
    
    // 중복 저장 방지
    if (!diagnoses.find((d: DiagnosisResult) => d.id === result.id)) {
      diagnoses.push(result);
      localStorage.setItem('reptory_diagnoses', JSON.stringify(diagnoses));
      setIsSaved(true);
    }
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getHealthLabel = (status: string) => {
    switch (status) {
      case 'excellent': return '매우 건강';
      case 'good': return '건강';
      case 'fair': return '보통';
      case 'poor': return '주의 필요';
      default: return '알 수 없음';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* 이미지 미리보기 */}
      <div className="relative h-64 bg-gray-100 rounded-2xl overflow-hidden">
        <img
          src={result.imageUrl}
          alt="진단 이미지"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 건강 점수 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">건강 상태 분석</h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold text-gray-900">{result.healthScore}</span>
              <span className="text-gray-500">/ 100</span>
            </div>
            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getHealthColor(result.healthStatus)}`}>
              {getHealthLabel(result.healthStatus)}
            </span>
          </div>
          
          <div className="relative w-24 h-24">
            <svg className="transform -rotate-90 w-24 h-24">
              <circle
                cx="48"
                cy="48"
                r="36"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="48"
                cy="48"
                r="36"
                stroke="#10b981"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(result.healthScore / 100) * 226} 226`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* 추천사항 */}
        <div className="space-y-2">
          {result.recommendations.map((rec, index) => (
            <div key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">{rec}</span>
            </div>
          ))}
        </div>

        {/* 경고사항 */}
        {result.warnings && result.warnings.length > 0 && (
          <div className="mt-4 space-y-2">
            {result.warnings.map((warning, index) => (
              <div key={index} className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{warning}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 모프 분석 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">품종 및 모프 분석</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">품종</span>
            <span className="font-medium">{SPECIES[result.morphAnalysis.species]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">모프</span>
            <span className="font-medium">{result.morphAnalysis.morph}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">정확도</span>
            <span className="font-medium">{result.morphAnalysis.confidence}%</span>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-700">{result.morphAnalysis.description}</p>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">특징</h4>
          <div className="flex flex-wrap gap-2">
            {result.morphAnalysis.characteristics.map((char, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                {char}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="space-y-3">
        {!isSaved ? (
          <button
            onClick={handleSaveResult}
            className="btn-primary w-full"
          >
            <Download className="h-5 w-5 mr-2" />
            진단 결과 저장
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2 text-green-600 py-3">
            <Check className="h-5 w-5" />
            <span className="font-medium">저장 완료</span>
          </div>
        )}
        
        <Link
          href={`/sell?diagnosis=${result.id}`}
          className="btn-secondary w-full flex items-center justify-center"
        >
          동물 등록하기
          <ArrowRight className="h-5 w-5 ml-2" />
        </Link>
        
        <div className="flex gap-3">
          <button
            onClick={onReset}
            className="btn-outline flex-1"
          >
            <RotateCw className="h-5 w-5 mr-2" />
            다시 진단하기
          </button>
          
          <Link
            href="/diagnosis/history"
            className="btn-outline flex-1 flex items-center justify-center"
          >
            <Clock className="h-5 w-5 mr-2" />
            진단 이력
          </Link>
        </div>
      </div>
    </motion.div>
  );
}