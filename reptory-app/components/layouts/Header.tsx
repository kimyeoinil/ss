'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search, Heart, User } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-xl font-bold text-primary">Reptory</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/animals" className="text-gray-700 hover:text-primary transition-colors">
              동물 둘러보기
            </Link>
            <Link href="/diagnosis" className="text-gray-700 hover:text-primary transition-colors">
              AI 진단
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary transition-colors">
              서비스 소개
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Heart className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <User className="h-5 w-5 text-gray-600" />
            </button>
            <Link href="/sell" className="btn-primary text-sm">
              판매하기
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                href="/animals"
                className="text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                동물 둘러보기
              </Link>
              <Link
                href="/diagnosis"
                className="text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                AI 진단
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                서비스 소개
              </Link>
              <div className="flex items-center space-x-4 pt-4 border-t">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Search className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <User className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              <Link
                href="/sell"
                className="btn-primary text-sm text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                판매하기
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}