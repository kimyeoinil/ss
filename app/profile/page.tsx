'use client';

import { 
  User, 
  ChevronRight, 
  Package, 
  Heart, 
  MessageSquare, 
  FileText, 
  Settings, 
  HelpCircle,
  LogOut,
  Shield,
  Award,
  Eye,
  Trash2
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { localStorage } from '@/lib/localStorage/storage';

export default function ProfilePage() {
  const [stats, setStats] = useState({
    salesCount: 0,
    favoritesCount: 0,
    viewHistoryCount: 0,
    userName: '사용자',
    userEmail: 'user@example.com',
    joinDate: '2024.01.15'
  });

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

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const data = localStorage.getData();
    if (data) {
      // 내가 등록한 동물 수 (판매자 이름으로 필터링)
      const mySales = data.animals.filter(animal => 
        animal.seller.name === '판매자'
      ).length;

      setStats({
        salesCount: mySales,
        favoritesCount: data.favorites.length,
        viewHistoryCount: data.viewHistory.length,
        userName: '사용자',
        userEmail: 'user@example.com',
        joinDate: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace(/\.$/, '')
      });
    }
  };

  const handleClearData = () => {
    if (confirm('모든 데이터를 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      localStorage.clear();
      alert('데이터가 초기화되었습니다.');
      window.location.href = '/';
    }
  };

  const menuItems = [
    {
      title: '나의 거래',
      items: [
        { icon: Package, label: '판매 내역', href: '/profile/sales', badge: stats.salesCount > 0 ? stats.salesCount.toString() : undefined },
        { icon: Package, label: '구매 내역', href: '/profile/purchases' },
        { icon: Heart, label: '찜한 동물', href: '/favorites', badge: stats.favoritesCount > 0 ? stats.favoritesCount.toString() : undefined },
        { icon: Eye, label: '최근 본 동물', href: '/profile/history', badge: stats.viewHistoryCount > 0 ? stats.viewHistoryCount.toString() : undefined },
        { icon: MessageSquare, label: '채팅 목록', href: '/profile/chats' },
      ]
    },
    {
      title: '인증 및 혜택',
      items: [
        { icon: Shield, label: 'AI 건강진단 이력', href: '/profile/health-history' },
        { icon: Award, label: '브리더 인증', href: '/profile/breeder', isNew: true },
      ]
    },
    {
      title: '기타',
      items: [
        { icon: FileText, label: '공지사항', href: '/notices' },
        { icon: Settings, label: '설정', href: '/settings' },
        { icon: HelpCircle, label: '고객센터', href: '/support' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-safe-offset-ios">
      {/* 프로필 헤더 */}
      <div className="bg-white px-4 py-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
            <User className="h-10 w-10 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">{stats.userName}님</h2>
            <p className="text-sm text-gray-600">{stats.userEmail}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="badge-primary text-xs">일반회원</span>
              <span className="text-xs text-gray-500">가입일: {stats.joinDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 통계 섹션 */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.salesCount}</div>
            <div className="text-xs text-gray-600 mt-1">판매중</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.favoritesCount}</div>
            <div className="text-xs text-gray-600 mt-1">찜한 동물</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.viewHistoryCount}</div>
            <div className="text-xs text-gray-600 mt-1">최근 본</div>
          </div>
        </div>
      </div>

      {/* 메뉴 섹션 */}
      {menuItems.map((section, index) => (
        <div key={index} className="mt-6">
          <h3 className="px-4 text-sm font-medium text-gray-500 mb-2">{section.title}</h3>
          <div className="bg-white">
            {section.items.map((item, itemIndex) => (
              <Link
                key={itemIndex}
                href={item.href}
                className="flex items-center justify-between px-4 py-4 border-b border-gray-100 last:border-b-0 active:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="font-medium text-gray-900">{item.label}</span>
                  {item.isNew && (
                    <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full">
                      NEW
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* 로그아웃 및 데이터 초기화 */}
      <div className="mt-6 px-4 pb-6 space-y-3">
        <button className="w-full flex items-center justify-center gap-2 py-4 text-gray-600 font-medium">
          <LogOut className="h-5 w-5" />
          로그아웃
        </button>
        <button 
          onClick={handleClearData}
          className="w-full flex items-center justify-center gap-2 py-4 text-red-600 font-medium"
        >
          <Trash2 className="h-5 w-5" />
          데이터 초기화
        </button>
      </div>
    </div>
  );
}