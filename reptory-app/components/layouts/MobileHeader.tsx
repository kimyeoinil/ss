'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Search, Stethoscope } from 'lucide-react';

export default function MobileHeader() {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    if (pathname === '/') return 'Reptory';
    if (pathname === '/animals') return '둘러보기';
    if (pathname.startsWith('/animals/')) return '상세정보';
    if (pathname === '/favorites') return '찜한 동물';
    if (pathname === '/profile') return '마이페이지';
    return 'Reptory';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass safe-top">
      <div className="flex items-center justify-between px-4 h-14">
        {/* 로고/타이틀 */}
        <div className="flex items-center">
          {pathname === '/' ? (
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">R</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Reptory</span>
            </Link>
          ) : (
            <h1 className="text-xl font-bold text-gray-900">{getPageTitle()}</h1>
          )}
        </div>

        {/* 액션 버튼 */}
        <div className="flex items-center space-x-2">
          <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
            <Search className="h-5 w-5 text-gray-700" />
          </button>
          <Link 
            href="/hospital" 
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors flex items-center gap-1"
            title="최영민동물병원"
          >
            <Stethoscope className="h-5 w-5 text-gray-700" />
            <span className="text-xs font-medium text-gray-700 hidden sm:inline">MOU</span>
          </Link>
          <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors relative">
            <Bell className="h-5 w-5 text-gray-700" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-coral rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
}