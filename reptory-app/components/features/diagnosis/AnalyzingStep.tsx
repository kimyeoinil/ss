'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function AnalyzingStep() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center py-12"
    >
      <div className="mb-8">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mx-auto w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center"
        >
          <Sparkles className="h-12 w-12 text-white" />
        </motion.div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        AI가 분석중입니다
      </h2>
      <p className="text-gray-600 mb-8">
        잠시만 기다려주세요...
      </p>

      <div className="space-y-4 max-w-sm mx-auto">
        <AnalyzingItem delay={0} text="건강 상태 확인중..." />
        <AnalyzingItem delay={0.5} text="품종 및 모프 분석중..." />
        <AnalyzingItem delay={1} text="진단서 생성중..." />
      </div>
    </motion.div>
  );
}

function AnalyzingItem({ delay, text }: { delay: number; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-center gap-3 bg-gray-100 rounded-lg p-3"
    >
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="w-2 h-2 bg-green-500 rounded-full"
      />
      <span className="text-gray-700">{text}</span>
    </motion.div>
  );
}