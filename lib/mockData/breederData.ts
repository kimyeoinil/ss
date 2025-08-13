import { Breeder, BreederReview, Animal } from '@/types';

// 3개의 가상 브리더 데이터
export const mockBreeders: Breeder[] = [
  {
    id: 'breeder-1',
    name: '라이언게코',
    businessName: '라이언렙타일',
    profileImage: '/images/animals/crested-gecko-illust.svg',
    location: '경기 하남시',
    description: '크레스티드게코 전문 브리더입니다. 10년 이상의 사육 경험을 바탕으로 건강하고 아름다운 개체들을 분양하고 있습니다. 모든 개체는 AI 건강진단을 거쳐 분양됩니다.',
    specialties: ['crested_gecko'],
    rating: 4.8,
    reviewCount: 152,
    transactionCount: 234,
    aiDiagnosisRate: 95,
    isVerified: true,
    createdAt: new Date('2023-01-15'),
    socialLinks: {
      instagram: '@ryan_reptile',
      youtube: 'RyanReptile',
      blog: 'blog.naver.com/ryanreptile'
    }
  },
  {
    id: 'breeder-2',
    name: '파이톤마스터',
    businessName: '서울파이톤',
    profileImage: '/images/animals/ball-python-illust.svg',
    location: '서울 강남구',
    description: '볼파이톤 모프 전문 브리더입니다. 희귀 모프부터 입문자용 개체까지 다양한 모프를 보유하고 있습니다. 정기적인 건강검진과 체계적인 관리를 약속드립니다.',
    specialties: ['ball_python'],
    rating: 4.9,
    reviewCount: 89,
    transactionCount: 156,
    aiDiagnosisRate: 88,
    isVerified: true,
    createdAt: new Date('2022-06-20'),
    socialLinks: {
      instagram: '@seoul_python',
      youtube: 'SeoulPython'
    }
  },
  {
    id: 'breeder-3',
    name: '렙타일가든',
    businessName: '렙타일가든',
    profileImage: '/images/animals/leopard-gecko-illust.svg',
    location: '부산 해운대구',
    description: '레오파드게코, 비어디드래곤 전문 브리더입니다. 모든 개체는 개별 관리되며, 분양 시 상세한 사육 가이드를 제공합니다. 초보자 분들도 안심하고 입양하실 수 있습니다.',
    specialties: ['leopard_gecko', 'bearded_dragon'],
    rating: 4.7,
    reviewCount: 203,
    transactionCount: 412,
    aiDiagnosisRate: 92,
    isVerified: true,
    createdAt: new Date('2021-03-10'),
    socialLinks: {
      instagram: '@reptile_garden',
      blog: 'reptilegarden.tistory.com'
    }
  }
];

// 브리더별 동물 데이터
export const breederAnimals: Record<string, Animal[]> = {
  'breeder-1': [
    {
      id: 'animal-c1',
      title: '익스트림 할리퀸 크레스티드게코',
      species: 'crested_gecko',
      price: 1500000,
      images: ['/images/animals/crested-gecko1.svg'],
      description: '최고급 익스트림 할리퀸 모프입니다. 선명한 패턴과 건강한 체격을 자랑합니다.',
      location: '경기 하남시',
      seller: {
        name: '라이언게코',
        rating: 4.8,
        breederId: 'breeder-1'
      },
      isHealthChecked: true,
      createdAt: '2024-01-20T10:00:00.000Z',
      gender: 'male',
      size: '성체',
      weight: '45g',
      birthDate: '2023-06-15',
      morph: '익스트림 할리퀸'
    },
    {
      id: 'animal-c2',
      title: '트라이칼라 크레스티드게코',
      species: 'crested_gecko',
      price: 800000,
      images: ['/images/animals/crested-gecko-illust.svg'],
      description: '아름다운 3색 패턴의 크레스티드게코입니다. 순한 성격으로 핸들링이 용이합니다.',
      location: '경기 하남시',
      seller: {
        name: '라이언게코',
        rating: 4.8,
        breederId: 'breeder-1'
      },
      isHealthChecked: true,
      createdAt: '2024-01-20T10:00:00.000Z',
      gender: 'female',
      size: '아성체',
      weight: '35g',
      birthDate: '2023-09-20',
      morph: '트라이칼라'
    }
  ],
  'breeder-2': [
    {
      id: 'animal-p1',
      title: '파스텔 볼파이톤',
      species: 'ball_python',
      price: 350000,
      images: ['/images/animals/ball-python1.svg'],
      description: '깨끗한 파스텔 모프의 볼파이톤입니다. 정기적인 급여와 건강한 상태를 유지하고 있습니다.',
      location: '서울 강남구',
      seller: {
        name: '파이톤마스터',
        rating: 4.9,
        breederId: 'breeder-2'
      },
      isHealthChecked: true,
      createdAt: '2024-01-20T10:00:00.000Z',
      gender: 'male',
      size: '아성체',
      weight: '450g',
      birthDate: '2023-04-10',
      morph: '파스텔'
    },
    {
      id: 'animal-p2',
      title: '스파이더 볼파이톤',
      species: 'ball_python',
      price: 280000,
      images: ['/images/animals/ball-python2.svg'],
      description: '독특한 패턴의 스파이더 모프입니다. 활발하고 먹이반응이 좋습니다.',
      location: '서울 강남구',
      seller: {
        name: '파이톤마스터',
        rating: 4.9,
        breederId: 'breeder-2'
      },
      isHealthChecked: true,
      createdAt: '2024-01-20T10:00:00.000Z',
      gender: 'female',
      size: '베이비',
      weight: '120g',
      birthDate: '2024-01-15',
      morph: '스파이더'
    }
  ],
  'breeder-3': [
    {
      id: 'animal-l1',
      title: '탠저린 레오파드게코',
      species: 'leopard_gecko',
      price: 180000,
      images: ['/images/animals/leopard-gecko1.svg'],
      description: '선명한 오렌지색의 탠저린 모프입니다. 온순한 성격으로 입문자에게 추천합니다.',
      location: '부산 해운대구',
      seller: {
        name: '렙타일가든',
        rating: 4.7,
        breederId: 'breeder-3'
      },
      isHealthChecked: true,
      createdAt: '2024-01-20T10:00:00.000Z',
      gender: 'male',
      size: '성체',
      weight: '75g',
      birthDate: '2023-03-20',
      morph: '탠저린'
    },
    {
      id: 'animal-b1',
      title: '시트러스 비어디드래곤',
      species: 'bearded_dragon',
      price: 420000,
      images: ['/images/animals/bearded-dragon-illust.svg'],
      description: '밝은 노란색의 시트러스 모프 비어디드래곤입니다. 사육 난이도가 낮아 초보자도 쉽게 키울 수 있습니다.',
      location: '부산 해운대구',
      seller: {
        name: '렙타일가든',
        rating: 4.7,
        breederId: 'breeder-3'
      },
      isHealthChecked: true,
      createdAt: '2024-01-20T10:00:00.000Z',
      gender: 'female',
      size: '아성체',
      weight: '250g',
      birthDate: '2023-07-05',
      morph: '시트러스'
    }
  ]
};

// 브리더 리뷰 데이터
export const breederReviews: Record<string, BreederReview[]> = {
  'breeder-1': [
    {
      id: 'review-1',
      breederId: 'breeder-1',
      animalId: 'animal-c1',
      authorName: '크레게코사랑',
      rating: 5,
      content: '정말 건강하고 예쁜 아이를 분양받았습니다. 브리더님이 사육 방법도 자세히 알려주셔서 초보자인 저도 잘 키우고 있어요!',
      createdAt: new Date('2024-01-15')
    },
    {
      id: 'review-2',
      breederId: 'breeder-1',
      animalId: 'animal-c2',
      authorName: '파충류초보',
      rating: 4,
      content: '분양받은 지 3개월 됐는데 아주 건강하게 잘 크고 있습니다. AI 진단서도 있어서 믿고 구매했어요.',
      createdAt: new Date('2024-01-20')
    }
  ],
  'breeder-2': [
    {
      id: 'review-3',
      breederId: 'breeder-2',
      animalId: 'animal-p1',
      authorName: '볼파사랑',
      rating: 5,
      content: '전문적인 브리더님입니다. 개체 상태도 최상이고, 분양 후 관리 방법도 꼼꼼히 알려주셨어요.',
      createdAt: new Date('2024-01-10')
    }
  ],
  'breeder-3': [
    {
      id: 'review-4',
      breederId: 'breeder-3',
      animalId: 'animal-l1',
      authorName: '렙타일러버',
      rating: 5,
      content: '레오파드게코 입문자인데 정말 친절하게 설명해주시고, 필요한 용품도 추천해주셨어요. 감사합니다!',
      createdAt: new Date('2024-01-18')
    },
    {
      id: 'review-5',
      breederId: 'breeder-3',
      animalId: 'animal-b1',
      authorName: '비어디맘',
      rating: 4,
      content: '건강한 아이 분양받았습니다. 사육장 세팅부터 먹이까지 상세하게 가이드해주셔서 좋았어요.',
      createdAt: new Date('2024-01-22')
    }
  ]
};

// 브리더 ID로 정보 가져오기
export function getBreederById(id: string): Breeder | undefined {
  return mockBreeders.find(breeder => breeder.id === id);
}

// 브리더의 동물 목록 가져오기
export function getBreederAnimals(breederId: string): Animal[] {
  return breederAnimals[breederId] || [];
}

// 브리더의 리뷰 목록 가져오기
export function getBreederReviews(breederId: string): BreederReview[] {
  return breederReviews[breederId] || [];
}