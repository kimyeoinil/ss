# Reptory 디자인 시스템

## 1. 디자인 원칙

### 핵심 가치
- **신뢰성**: 의료 서비스처럼 깨끗하고 전문적인 디자인
- **투명성**: 정보를 명확하고 직관적으로 전달
- **프리미엄**: 고가 특수동물 거래에 맞는 품격 있는 UI
- **접근성**: 모든 사용자가 쉽게 사용할 수 있는 인터페이스

## 2. 컬러 시스템

### Primary Colors
```css
--primary-green: #2D5A3D;      /* 메인 브랜드 컬러 - 자연/파충류 */
--primary-green-light: #4A7A5A;
--primary-green-dark: #1A3A2A;
```

### Secondary Colors
```css
--secondary-beige: #F5E6D3;    /* 따뜻하고 편안한 배경 */
--secondary-sand: #E8D5BC;
--secondary-cream: #FAF6F0;
```

### Accent Colors
```css
--accent-gold: #D4AF37;        /* 검증 뱃지, 프리미엄 요소 */
--accent-coral: #FF6B6B;       /* 경고, 주의사항 */
--accent-sky: #4ECDC4;         /* 정보, 링크 */
```

### Neutral Colors
```css
--gray-900: #1A1A1A;
--gray-700: #4A4A4A;
--gray-500: #7A7A7A;
--gray-300: #BDBDBD;
--gray-100: #F5F5F5;
--white: #FFFFFF;
```

### Semantic Colors
```css
--success: #4CAF50;
--warning: #FFA726;
--error: #EF5350;
--info: #42A5F5;
```

## 3. 타이포그래피

### Font Family
```css
--font-primary: 'Pretendard', -apple-system, sans-serif;
--font-display: 'Montserrat', sans-serif;  /* 로고, 헤딩 */
```

### Font Sizes
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### Font Weights
```css
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

## 4. 컴포넌트 라이브러리

### 버튼
```css
/* Primary Button */
.btn-primary {
  background: var(--primary-green);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s;
}

/* Secondary Button */
.btn-secondary {
  background: var(--secondary-beige);
  color: var(--primary-green);
  border: 2px solid var(--primary-green);
}

/* Gold Button (Premium) */
.btn-gold {
  background: linear-gradient(135deg, #D4AF37, #F4E5A3);
  color: var(--primary-green-dark);
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
}
```

### 카드
```css
/* Product Card */
.card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* Verified Badge */
.badge-verified {
  background: var(--accent-gold);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: var(--text-sm);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
```

### 입력 필드
```css
.input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--gray-300);
  border-radius: 8px;
  font-size: var(--text-base);
  transition: border-color 0.2s;
}

.input:focus {
  border-color: var(--primary-green);
  outline: none;
}
```

## 5. 주요 화면 레이아웃

### 홈 화면
```
┌─────────────────────────────────┐
│      Header (Navigation)        │
├─────────────────────────────────┤
│   Hero Section (AI 진단 소개)   │
├─────────────────────────────────┤
│    Featured Animals (캐러셀)     │
├─────────────────────────────────┤
│   Categories (아이콘 그리드)     │
├─────────────────────────────────┤
│    Verified Listings (Grid)     │
├─────────────────────────────────┤
│         Footer                  │
└─────────────────────────────────┘
```

### 상품 상세 페이지
```
┌─────────────────────────────────┐
│      Image Gallery (큰 이미지)   │
├─────────────────────────────────┤
│  [검증 뱃지] 제목 및 기본 정보   │
├─────────────────────────────────┤
│    AI 건강 진단서 (확장 가능)    │
├─────────────────────────────────┤
│     모프 정보 (비주얼 카드)      │
├─────────────────────────────────┤
│      판매자 정보 & 리뷰         │
├─────────────────────────────────┤
│    구매하기 (Sticky Bottom)     │
└─────────────────────────────────┘
```

### AI 진단 플로우
```
Step 1: 사진 업로드
┌─────────────────────────────────┐
│     드래그 앤 드롭 영역         │
│    📷 사진을 올려주세요          │
└─────────────────────────────────┘

Step 2: AI 분석 중
┌─────────────────────────────────┐
│     🦎 분석 중...              │
│    [진행률 바]                  │
└─────────────────────────────────┘

Step 3: 결과 확인
┌─────────────────────────────────┐
│   ✅ AI 건강 진단 완료          │
│   [진단서 미리보기]             │
│   [다운로드] [매물 등록]        │
└─────────────────────────────────┘
```

## 6. 모바일 반응형

### Breakpoints
```css
--mobile: 320px;
--tablet: 768px;
--desktop: 1024px;
--wide: 1440px;
```

### 모바일 우선 디자인
- 하단 고정 네비게이션
- 스와이프 제스처 지원
- 큰 터치 타겟 (최소 44px)
- 단순화된 레이아웃

## 7. 애니메이션 & 인터랙션

### 트랜지션
```css
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 300ms ease;
```

### 로딩 애니메이션
- 파충류 실루엣 펄스 효과
- 스켈레톤 스크린
- 프로그레스 바

### 마이크로 인터랙션
- 버튼 호버 효과
- 카드 리프트 효과
- 스와이프 피드백
- 성공/실패 애니메이션

## 8. 아이콘 & 일러스트레이션

### 아이콘 스타일
- Outline 스타일 기본
- 24px 그리드 시스템
- 2px 스트로크 두께

### 커스텀 아이콘
- 🦎 파충류 카테고리
- 🏥 건강 진단
- ✅ 검증 완료
- 🏆 프리미엄
- 📊 모프 분석

## 9. 접근성

### WCAG 2.1 AA 준수
- 색상 대비 4.5:1 이상
- 키보드 네비게이션 지원
- 스크린 리더 호환
- 포커스 인디케이터 명확

### 다크 모드 (향후)
- 시스템 설정 연동
- 수동 토글 옵션
- 적절한 색상 반전