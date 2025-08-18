import { DiagnosisResult, SpeciesType } from '@/types';

// 모의 진단 데이터 생성
export function generateMockDiagnosisResult(imageFile: File): DiagnosisResult {
  // 파일명에서 힌트를 얻어 다양한 결과 생성
  const fileName = imageFile.name.toLowerCase();
  const randomSeed = Math.random();
  
  // 품종 결정
  let species: SpeciesType = 'ball_python';
  if (fileName.includes('gecko') || randomSeed < 0.3) {
    species = randomSeed < 0.15 ? 'leopard_gecko' : 'crested_gecko';
  } else if (fileName.includes('dragon') || randomSeed < 0.4) {
    species = 'bearded_dragon';
  } else if (fileName.includes('tortoise') || randomSeed < 0.5) {
    species = 'tortoise';
  }

  // 건강 점수 생성 (대부분 건강하게)
  const healthScore = Math.floor(Math.random() * 30) + 70; // 70-100
  const healthStatus = 
    healthScore >= 90 ? 'excellent' :
    healthScore >= 80 ? 'good' :
    healthScore >= 70 ? 'fair' : 'poor';

  // 모프 데이터
  const morphData = getMorphData(species);
  
  // 추천사항 생성
  const recommendations = getRecommendations(species, healthScore);
  
  // 경고사항 생성 (낮은 확률)
  const warnings = healthScore < 85 && Math.random() < 0.3 ? 
    getWarnings(species) : [];

  return {
    id: `diag-${Date.now()}`,
    healthScore,
    healthStatus,
    morphAnalysis: morphData,
    recommendations,
    warnings,
    imageUrl: URL.createObjectURL(imageFile),
    createdAt: new Date()
  };
}

function getMorphData(species: SpeciesType) {
  const morphDataMap = {
    ball_python: [
      {
        morph: 'Normal',
        confidence: 95,
        description: '정상적인 볼파이톤 패턴을 보이며, 색상과 무늬가 균일합니다.',
        rarity: 'common' as const,
        characteristics: ['균일한 패턴', '건강한 색상', '표준 체형']
      },
      {
        morph: 'Pastel',
        confidence: 92,
        description: '파스텔 모프의 특징인 밝은 색상과 깨끗한 패턴을 보입니다.',
        rarity: 'uncommon' as const,
        characteristics: ['밝은 색상', '선명한 패턴', '노란색 강조']
      },
      {
        morph: 'Spider',
        confidence: 88,
        description: '스파이더 특유의 웹 패턴과 밝은 색상이 특징적입니다.',
        rarity: 'uncommon' as const,
        characteristics: ['웹 패턴', '밝은 배색', '독특한 무늬']
      }
    ],
    leopard_gecko: [
      {
        morph: 'Normal',
        confidence: 94,
        description: '야생형 레오파드게코의 전형적인 점박이 패턴입니다.',
        rarity: 'common' as const,
        characteristics: ['점박이 패턴', '황갈색 기본색', '검은 반점']
      },
      {
        morph: 'Tangerine',
        confidence: 90,
        description: '탠저린 모프의 선명한 오렌지색이 돋보입니다.',
        rarity: 'uncommon' as const,
        characteristics: ['오렌지색', '선명한 발색', '밝은 체색']
      }
    ],
    crested_gecko: [
      {
        morph: 'Flame',
        confidence: 91,
        description: '플레임 패턴의 크레스티드게코로 등선이 뚜렷합니다.',
        rarity: 'common' as const,
        characteristics: ['등선 패턴', '대조적 색상', '선명한 경계']
      },
      {
        morph: 'Dalmatian',
        confidence: 89,
        description: '달마시안 스팟이 전체적으로 분포되어 있습니다.',
        rarity: 'uncommon' as const,
        characteristics: ['점박이', '흰색 베이스', '검은 반점']
      }
    ],
    bearded_dragon: [
      {
        morph: 'Normal',
        confidence: 93,
        description: '일반적인 비어디드래곤의 갈색 계열 체색입니다.',
        rarity: 'common' as const,
        characteristics: ['갈색 체색', '가시 비늘', '표준 패턴']
      },
      {
        morph: 'Citrus',
        confidence: 87,
        description: '시트러스 모프의 밝은 노란색 계열이 특징입니다.',
        rarity: 'uncommon' as const,
        characteristics: ['노란색', '밝은 발색', '선명한 색상']
      }
    ],
    tortoise: [
      {
        morph: 'Standard',
        confidence: 96,
        description: '건강한 육지거북의 전형적인 등갑 패턴입니다.',
        rarity: 'common' as const,
        characteristics: ['규칙적 패턴', '광택 등갑', '대칭 구조']
      }
    ],
    corn_snake: [
      {
        morph: 'Normal',
        confidence: 92,
        description: '일반적인 콘스네이크의 주황색과 빨간색 패턴입니다.',
        rarity: 'common' as const,
        characteristics: ['주황색 패턴', '빨간색 반점', '규칙적 무늬']
      },
      {
        morph: 'Snow',
        confidence: 88,
        description: '스노우 모프의 흰색과 분홍색 조합이 아름답습니다.',
        rarity: 'uncommon' as const,
        characteristics: ['흰색 베이스', '분홍빛', '연한 패턴']
      }
    ],
    blue_tongue_skink: [
      {
        morph: 'Normal',
        confidence: 94,
        description: '건강한 블루텅스킨크의 전형적인 갈색 줄무늬입니다.',
        rarity: 'common' as const,
        characteristics: ['갈색 줄무늬', '파란 혀', '튼튼한 체형']
      }
    ]
  };

  const morphOptions = morphDataMap[species as keyof typeof morphDataMap] || morphDataMap.ball_python;
  const selectedMorph = morphOptions[Math.floor(Math.random() * morphOptions.length)];
  
  return {
    species,
    ...selectedMorph
  };
}

function getRecommendations(species: SpeciesType, healthScore: number): string[] {
  const baseRecommendations = [
    '정기적인 건강 체크를 계속하세요',
    '적절한 온도와 습도를 유지해주세요',
    '균형잡힌 먹이 급여를 지속하세요'
  ];

  const speciesSpecific = {
    ball_python: ['습도 50-60% 유지', '은신처 제공 필수'],
    leopard_gecko: ['칼슘 보충제 급여', 'UVB 조명 권장'],
    crested_gecko: ['습도 70-80% 유지', '수직 공간 확보'],
    bearded_dragon: ['UVB 조명 필수', '야채 급여 비율 증가'],
    tortoise: ['일광욕 시간 확보', '칼슘 보충 중요'],
    corn_snake: ['온도 구배 설정', '은신처 양쪽 배치'],
    blue_tongue_skink: ['습도 40-60% 유지', '잡식성 식단 제공']
  };

  const recommendations = [...baseRecommendations.slice(0, 2)];
  
  if (healthScore >= 90) {
    recommendations.unshift('현재 건강 상태가 매우 양호합니다');
  } else if (healthScore >= 80) {
    recommendations.unshift('전반적으로 건강한 상태입니다');
  }

  recommendations.push(...(speciesSpecific[species as keyof typeof speciesSpecific] || []));
  
  return recommendations.slice(0, 4);
}

function getWarnings(species: SpeciesType): string[] {
  const warningPool = [
    '약간의 탈수 증상이 보입니다. 수분 공급에 신경써주세요',
    '피부 상태를 주의깊게 관찰해주세요',
    '체중 관리가 필요할 수 있습니다'
  ];
  
  return [warningPool[Math.floor(Math.random() * warningPool.length)]];
}