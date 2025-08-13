'use client';

import { motion } from 'framer-motion';

interface QuickRepliesProps {
  onSelect: (question: string) => void;
}

const quickQuestions = [
  '레오파드게코 적정 온도는?',
  '크레스티드게코가 먹이를 안 먹어요',
  '볼파이톤 탈피 주기는?',
  '육지거북 사육장 세팅 방법',
];

export default function QuickReplies({ onSelect }: QuickRepliesProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-600 font-medium">자주 묻는 질문</p>
      {quickQuestions.map((question, index) => (
        <motion.button
          key={question}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelect(question)}
          className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm"
        >
          {question}
        </motion.button>
      ))}
    </div>
  );
}