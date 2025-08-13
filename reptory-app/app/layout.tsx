import type { Metadata } from "next";
import "./globals.css";
import MobileHeader from "@/components/layouts/MobileHeader";
import BottomNav from "@/components/layouts/BottomNav";
import ChatButton from "@/components/chat/ChatButton";

export const metadata: Metadata = {
  title: "Reptory - AI 기반 특수동물 안심 거래 플랫폼",
  description: "AI 건강 진단으로 검증된 특수동물을 안전하게 거래하는 플랫폼",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#16A34A',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link 
          href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-['SUIT'] font-normal antialiased bg-gray-50">
        <MobileHeader />
        <main className="pt-14 pb-safe-offset-ios min-h-screen">
          {children}
        </main>
        <BottomNav />
        <ChatButton />
      </body>
    </html>
  );
}