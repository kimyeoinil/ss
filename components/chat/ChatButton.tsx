'use client';

import { MessageCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';
import ChatWindow from './ChatWindow';

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    console.log('Chat button clicked');
    setIsOpen(true);
  };

  const handleClose = () => {
    console.log('Chat window closing');
    setIsOpen(false);
  };

  return (
    <>
      {/* 플로팅 버튼 */}
      <button
        onClick={handleOpen}
        className="fixed bottom-20 right-4 z-40 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full p-4 shadow-lg hover:from-green-700 hover:to-green-600 transition-all duration-200 hover:scale-110 group"
        aria-label="AI 챗봇 열기"
      >
        <div className="relative">
          <MessageCircle className="h-6 w-6" />
          <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300 animate-pulse" />
        </div>
        <span className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          AI 파충류 도우미
        </span>
      </button>

      {/* 챗봇 창 */}
      {isOpen && <ChatWindow onClose={handleClose} />}
    </>
  );
}