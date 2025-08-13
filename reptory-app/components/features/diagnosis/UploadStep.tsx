'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, Camera, Image as ImageIcon } from 'lucide-react';

interface UploadStepProps {
  onFileUpload: (file: File) => void;
}

export default function UploadStep({ onFileUpload }: UploadStepProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          반려동물 사진을 업로드하세요
        </h2>
        <p className="text-gray-600">
          AI가 건강 상태와 품종을 분석해드립니다
        </p>
      </div>

      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer
          transition-colors duration-200
          ${isDragActive 
            ? 'border-green-500 bg-green-50' 
            : 'border-gray-300 bg-white hover:border-green-400 hover:bg-gray-50'
          }
        `}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <Upload className="h-10 w-10 text-green-600" />
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-900">
              {isDragActive ? '여기에 놓으세요' : '클릭하거나 드래그하여 업로드'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              PNG, JPG, JPEG (최대 10MB)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.capture = 'environment';
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) onFileUpload(file);
            };
            input.click();
          }}
          className="btn-secondary"
        >
          <Camera className="h-5 w-5 mr-2" />
          카메라로 촬영
        </button>
        <button
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) onFileUpload(file);
            };
            input.click();
          }}
          className="btn-secondary"
        >
          <ImageIcon className="h-5 w-5 mr-2" />
          갤러리에서 선택
        </button>
      </div>

      <div className="bg-blue-50 rounded-xl p-4">
        <h3 className="font-semibold text-blue-900 mb-2">
          📸 좋은 사진 촬영 팁
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• 밝은 곳에서 선명하게 촬영해주세요</li>
          <li>• 동물의 전체 모습이 보이도록 찍어주세요</li>
          <li>• 특이사항이 있다면 해당 부위를 중점적으로</li>
        </ul>
      </div>
    </motion.div>
  );
}