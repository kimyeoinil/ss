# Reptory 개발 가이드 (Phase 기반)

## 🎯 개발 원칙

### 1. Plan → Execution 원칙
- 모든 작업은 반드시 계획을 먼저 수립
- 계획 확인 후 실행 단계로 진행
- 각 Phase별 명확한 목표와 확인 가능한 결과물 정의

### 2. 프로토타이핑 우선
- 백엔드 개발은 마지막 단계 (Phase 5)
- Phase 1-4는 로컬스토리지 기반 프로토타입
- UI/UX 검증이 최우선 목표

### 3. Phase별 진행
- 각 Phase 완료 시 확인 가능한 화면 제공
- 사용자 컨펌 후 다음 Phase 진행
- DB 스키마는 Phase별로 프리징

## 📋 Phase별 개발 계획

### Phase 1: 기본 UI 프로토타입 (2-3일)
**목표**: 핵심 화면 UI/UX 검증

#### 확인 가능한 화면
1. 홈페이지 (랜딩)
2. 동물 리스트 페이지
3. 동물 상세 페이지
4. 기본 네비게이션

#### 기술 구현
```typescript
// 로컬스토리지 데이터 구조
interface LocalData {
  animals: Animal[];
  favorites: string[];
  viewHistory: string[];
}
```

#### 주요 기능
- 더미 데이터로 동물 리스트 표시
- 상세 페이지 이동
- 찜하기 (로컬스토리지)
- 반응형 디자인

### Phase 2: AI 진단 시스템 (3-4일)
**목표**: 핵심 차별화 기능 구현 및 검증

#### 확인 가능한 화면
1. AI 진단 플로우 (3단계)
   - 사진 업로드
   - 분석 중
   - 결과 확인
2. 진단서 미리보기
3. 동물 등록 폼 (AI 결과 연동)

#### 기술 구현
```typescript
// AI 진단 결과 로컬 저장
interface DiagnosisResult {
  id: string;
  animalId: string;
  healthScore: number;
  morphAnalysis: MorphData;
  pdfUrl: string; // Base64 or Blob URL
  createdAt: Date;
}
```

#### 주요 기능
- Claude Vision API 연동
- 이미지 업로드 및 미리보기
- AI 건강 진단
- PDF 진단서 생성 (브라우저)
- 진단 결과 로컬 저장

### Phase 3: 거래 플로우 프로토타입 (3-4일)
**목표**: 구매/판매 프로세스 UI/UX 검증

#### 확인 가능한 화면
1. 판매자 등록 플로우
   - 기본 정보 입력
   - AI 진단 연동
   - 가격 설정
2. 구매 플로우
   - 장바구니
   - 주문서 작성
   - 결제 UI (목업)
3. 주문 관리 페이지

#### 기술 구현
```typescript
// 거래 데이터 로컬 관리
interface Order {
  id: string;
  animalId: string;
  buyerInfo: BuyerInfo;
  sellerInfo: SellerInfo;
  status: OrderStatus;
  createdAt: Date;
}
```

#### 주요 기능
- 다단계 폼 구현
- 주문 프로세스 시뮬레이션
- 에스크로 UI 목업
- 거래 상태 관리

### Phase 4: 사용자 경험 강화 (2-3일)
**목표**: 추가 기능으로 전체 UX 완성도 향상

#### 확인 가능한 화면
1. 검색 & 필터 페이지
2. 사용자 프로필 (구매자/판매자)
3. 리뷰 시스템
4. 병원 쿠폰 UI

#### 기술 구현
```typescript
// 검색 및 필터 로직
interface SearchFilters {
  species: string[];
  priceRange: [number, number];
  healthStatus: string[];
  location: string;
}
```

#### 주요 기능
- 고급 검색/필터
- 리뷰 작성/조회
- 프로필 관리
- 쿠폰 발급 시뮬레이션

### Phase 5: 백엔드 통합 및 배포 (1주)
**목표**: 실제 서비스 가능한 MVP 완성

#### 확인 가능한 화면
- 모든 기능이 실제 데이터베이스와 연동
- 실시간 업데이트
- 실제 결제 시스템

#### 기술 구현
- Supabase 설정 및 마이그레이션
- 로컬스토리지 → Supabase 데이터 이전
- 인증 시스템 구현
- 실제 결제 API 연동

## 🛠 기술 스택

### 전체 Phase 공통
```json
{
  "framework": "Next.js 14 (App Router)",
  "language": "TypeScript",
  "styling": "Tailwind CSS + shadcn/ui",
  "state": "Zustand (로컬 상태)",
  "storage": "LocalStorage (Phase 1-4)",
  "deployment": "Vercel"
}
```

### Phase별 추가 기술
- **Phase 2**: Claude Vision API, React PDF
- **Phase 3**: React Hook Form, Zod
- **Phase 4**: Fuse.js (검색), React Markdown
- **Phase 5**: Supabase, TanStack Query, 토스페이먼츠

## 📁 프로젝트 구조

```
reptory/
├── app/
│   ├── (prototype)/        # Phase 1-4 프로토타입
│   │   ├── page.tsx       # 홈
│   │   ├── animals/       # 동물 리스트/상세
│   │   ├── diagnosis/     # AI 진단 (Phase 2)
│   │   ├── trade/         # 거래 (Phase 3)
│   │   └── search/        # 검색 (Phase 4)
│   ├── (production)/      # Phase 5 실제 서비스
│   └── layout.tsx
├── components/
│   ├── ui/                # shadcn/ui 컴포넌트
│   ├── features/          # 기능별 컴포넌트
│   │   ├── animals/
│   │   ├── diagnosis/
│   │   ├── trade/
│   │   └── search/
│   └── layouts/
├── lib/
│   ├── localStorage/      # 로컬스토리지 헬퍼
│   ├── mockData/          # 더미 데이터
│   ├── ai/                # AI API 함수
│   └── utils/
├── hooks/
│   ├── useLocalStorage.ts
│   ├── useAIDiagnosis.ts
│   └── useMockData.ts
└── types/
```

## 🔄 Phase 전환 체크리스트

### Phase 완료 조건
- [ ] 모든 화면이 정상 작동
- [ ] 반응형 디자인 확인
- [ ] 로컬스토리지 데이터 정상 저장/로드
- [ ] 사용자 플로우 전체 테스트
- [ ] 디자인 가이드라인 준수 확인

### 다음 Phase 진행 전 확인사항
1. **UI/UX 피드백 반영 완료**
2. **필요한 DB 스키마 변경사항 확인**
3. **기술적 이슈 해결**
4. **다음 Phase 계획 검토**

## 🚀 시작하기

### Phase 1 시작
```bash
# 프로젝트 생성
npx create-next-app@latest reptory --typescript --tailwind --app

# 필수 패키지 설치
cd reptory
npm install zustand
npm install lucide-react
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge

# shadcn/ui 초기화
npx shadcn-ui@latest init

# 개발 서버 시작
npm run dev
```

### 로컬스토리지 초기 데이터
```typescript
// lib/mockData/initialData.ts
export const initialAnimals = [
  {
    id: '1',
    title: '볼파이톤 베이비',
    species: 'ball_python',
    morph: 'Normal',
    price: 150000,
    images: ['/mock/ball-python-1.jpg'],
    healthStatus: 'excellent',
    isVerified: true
  },
  // ... 더 많은 더미 데이터
];
```

## 📝 개발 규칙

### 파일 네이밍
- 컴포넌트: `PascalCase.tsx`
- 유틸리티: `camelCase.ts`
- 타입: `types.ts` or `animal.types.ts`

### 컴포넌트 구조
```typescript
// components/features/animals/AnimalCard.tsx
interface AnimalCardProps {
  animal: Animal;
  onFavorite?: (id: string) => void;
}

export function AnimalCard({ animal, onFavorite }: AnimalCardProps) {
  // 구현
}
```

### 로컬스토리지 키
```typescript
const STORAGE_KEYS = {
  ANIMALS: 'reptory_animals',
  DIAGNOSES: 'reptory_diagnoses',
  ORDERS: 'reptory_orders',
  USER_PREFS: 'reptory_preferences'
} as const;
```

## 🔍 Phase별 검증 포인트

### Phase 1 검증
- 전체적인 디자인 톤앤매너
- 네비게이션 흐름
- 모바일 반응형
- 기본 인터랙션

### Phase 2 검증
- AI 진단 정확도
- 진단서 디자인
- 업로드 UX
- 에러 처리

### Phase 3 검증
- 거래 프로세스 직관성
- 폼 유효성 검사
- 상태 전환 명확성
- 에스크로 개념 전달

### Phase 4 검증
- 검색 성능
- 필터 조합 로직
- 리뷰 시스템 완성도
- 전체 UX 일관성

### Phase 5 검증
- 실제 데이터 마이그레이션
- 성능 최적화
- 보안 설정
- 배포 안정성