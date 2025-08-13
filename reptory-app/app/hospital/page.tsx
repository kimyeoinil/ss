import { MapPin, Phone, Clock, Star, Info, Award, Heart, Shield, Activity } from 'lucide-react';

export default function HospitalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 섹션 */}
      <div className="relative">
        <div className="h-80 bg-gradient-to-br from-green-600 via-green-500 to-emerald-400">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-3">
                <Shield className="h-4 w-4" />
                <span>Reptory 공식 제휴병원</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">최영민동물메디컬센터</h1>
              <p className="text-lg opacity-90">특수동물 진료 전문</p>
            </div>
          </div>
        </div>
      </div>

      {/* 원장 프로필 */}
      <div className="px-4 -mt-12 relative z-10">
        <div className="card p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">👨‍⚕️</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-1">최영민 원장</h2>
              <div className="space-y-1">
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Award className="h-3 w-3" /> 前 서울시 수의사회 회장
                </p>
                <p className="text-sm text-gray-600">20년+ 동물 방송 프로그램 자문 수의사</p>
                <p className="text-sm text-gray-600">특수동물 전문가</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 핵심 특징 */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="card p-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">🐍</span>
            </div>
            <p className="font-medium text-sm">파충류 전문</p>
          </div>
          <div className="card p-4 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <p className="font-medium text-sm">24시간 모니터링</p>
          </div>
          <div className="card p-4 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">🐒</span>
            </div>
            <p className="font-medium text-sm">특수동물 진료</p>
          </div>
          <div className="card p-4 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <p className="font-medium text-sm">가족같은 케어</p>
          </div>
        </div>
      </div>

      {/* 병원 정보 */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">병원 정보</h2>
        <div className="card p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">서울특별시 강남구 논현로132길 24</p>
                <p className="text-sm text-gray-600">양현빌딩 2층</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">02-544-7588</p>
                <p className="text-sm text-gray-600">예약 및 문의</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-gray-900 mb-2">진료 시간</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">월, 화, 목</span>
                    <span className="font-medium">10:00 - 19:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">수요일</span>
                    <span className="font-medium">12:00 - 15:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">금요일</span>
                    <span className="font-medium text-red-600">12:00 - 18:00 (휴진)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">토, 일</span>
                    <span className="font-medium">10:00 - 19:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 특별 서비스 */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">특별 서비스</h2>
        <div className="space-y-3">
          <div className="card p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg">🦎</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">특수동물 전문 진료</h3>
                <p className="text-sm text-gray-600">뱀, 도마뱀, 거북이 등 파충류부터 원숭이, 야생동물까지</p>
              </div>
            </div>
          </div>

          <div className="card p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">VAT WAVE 24시간 모니터링</h3>
                <p className="text-sm text-gray-600">입원 동물의 심장 박동을 실시간으로 체크</p>
              </div>
            </div>
          </div>

          <div className="card p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">철저한 위생 관리</h3>
                <p className="text-sm text-gray-600">진료실/수술실 분리 운영, 지속적인 살균소독</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reptory 회원 혜택 */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Reptory 회원 특별 혜택</h2>
        <div className="card p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <Star className="h-5 w-5 fill-yellow-300 text-yellow-300" />
              <span className="font-medium">프리미엄 혜택</span>
            </div>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>파충류 진료비 20% 할인</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>AI 건강진단 연계 추가 10% 할인</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>월 1회 무료 온라인 건강 상담</span>
            </li>
          </ul>
        </div>
      </div>

      {/* CTA 버튼 */}
      <div className="px-4 py-6 pb-safe-offset-ios">
        <div className="space-y-3">
          <a href="tel:02-544-7588" className="btn-primary w-full flex items-center justify-center gap-2">
            <Phone className="h-5 w-5" />
            전화로 예약하기
          </a>
          <a 
            href="https://map.naver.com/v5/search/최영민동물메디컬센터"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full flex items-center justify-center gap-2"
          >
            <MapPin className="h-5 w-5" />
            네이버 지도로 찾아가기
          </a>
        </div>
      </div>
    </div>
  );
}