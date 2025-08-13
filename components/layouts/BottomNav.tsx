'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Heart, User, Plus, Users } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: '홈' },
    { href: '/animals', icon: Search, label: '둘러보기' },
    { href: '/sell', icon: Plus, label: '판매하기', isSpecial: true },
    { href: '/favorites', icon: Heart, label: '찜' },
    { href: '/profile', icon: User, label: '마이' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 safe-bottom z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href === '/animals' && pathname.startsWith('/animals'));
          
          if (item.isSpecial) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-4"
              >
                <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25 active:scale-95 transition-transform">
                  <item.icon className="h-6 w-6 text-white" strokeWidth={2.5} />
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center flex-1 py-2 active:scale-95 transition-transform"
            >
              <item.icon
                className={`h-6 w-6 mb-1 transition-colors ${
                  isActive
                    ? 'text-primary'
                    : 'text-gray-500'
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`text-xs transition-colors ${
                  isActive
                    ? 'text-primary font-semibold'
                    : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}