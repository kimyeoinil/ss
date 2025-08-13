'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, FileText, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { DiagnosisSession } from '@/types';
import UploadStep from '@/components/features/diagnosis/UploadStep';
import AnalyzingStep from '@/components/features/diagnosis/AnalyzingStep';
import ResultStep from '@/components/features/diagnosis/ResultStep';
import { generateMockDiagnosisResult } from '@/lib/mockData/diagnosisData';

export default function DiagnosisPage() {
  const [session, setSession] = useState<DiagnosisSession>({
    step: 'upload'
  });

  const handleFileUpload = async (file: File) => {
    setSession({
      step: 'analyzing',
      uploadedImage: file
    });

    try {
      // FormData 생성
      const formData = new FormData();
      formData.append('image', file);
      // TODO: 실제 사용자 ID 사용 (인증 구현 후)
      formData.append('userId', 'demo-user-id');
      
      // API 호출
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('API Error:', response.status, errorData);
        throw new Error(`Diagnosis failed: ${response.status}`);
      }

      const result = await response.json();
      
      setSession(prev => ({
        ...prev,
        step: 'result',
        result: {
          ...result,
          animalId: undefined,
          pdfUrl: undefined,
        }
      }));
    } catch (error) {
      console.error('Diagnosis error:', error);
      // 에러 시 목업 데이터 사용 (데모용)
      const mockResult = generateMockDiagnosisResult(file);
      setSession(prev => ({
        ...prev,
        step: 'result',
        result: mockResult
      }));
    }
  };

  const resetDiagnosis = () => {
    setSession({ step: 'upload' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 -m-2">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-xl font-bold">AI 건강 진단</h1>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-4">
        {/* 진행 상태 표시 */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2">
            <StepIndicator 
              icon={<Camera className="h-5 w-5" />} 
              label="사진 업로드" 
              active={session.step === 'upload'}
              completed={session.step !== 'upload'}
            />
            <div className={`flex-1 h-1 ${session.step !== 'upload' ? 'bg-green-500' : 'bg-gray-200'}`} />
            <StepIndicator 
              icon={<Sparkles className="h-5 w-5" />} 
              label="AI 분석" 
              active={session.step === 'analyzing'}
              completed={session.step === 'result'}
            />
            <div className={`flex-1 h-1 ${session.step === 'result' ? 'bg-green-500' : 'bg-gray-200'}`} />
            <StepIndicator 
              icon={<FileText className="h-5 w-5" />} 
              label="진단 결과" 
              active={session.step === 'result'}
              completed={false}
            />
          </div>
        </div>

        {/* 단계별 콘텐츠 */}
        <AnimatePresence mode="wait">
          {session.step === 'upload' && (
            <UploadStep key="upload" onFileUpload={handleFileUpload} />
          )}
          {session.step === 'analyzing' && (
            <AnalyzingStep key="analyzing" />
          )}
          {session.step === 'result' && session.result && (
            <ResultStep 
              key="result" 
              result={session.result} 
              onReset={resetDiagnosis}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StepIndicator({ icon, label, active, completed }: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  completed: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`
        w-12 h-12 rounded-full flex items-center justify-center
        ${active ? 'bg-green-500 text-white' : 
          completed ? 'bg-green-100 text-green-700' : 
          'bg-gray-200 text-gray-500'}
      `}>
        {icon}
      </div>
      <span className={`text-xs ${active ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>
        {label}
      </span>
    </div>
  );
}