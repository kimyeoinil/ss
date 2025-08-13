import { Animal, Phase1Data } from '@/types';
import { breederAnimals } from './breederData';

export const mockAnimals: Animal[] = [
  {
    id: '1',
    title: '파스텔 볼파이톤 - 수컷',
    species: 'ball_python',
    price: 250000,
    images: ['/images/animals/ball-python1.svg', '/images/animals/ball-python2.svg'],
    description: '순한 성격의 파스텔 모프 볼파이톤입니다. 2023년 5월생으로 현재 120cm, 1.2kg입니다. 먹이 반응이 좋고 핸들링이 쉬운 개체입니다.',
    location: '서울 강남구',
    seller: { name: '행복한파충류', rating: 4.8 },
    isHealthChecked: true,
    createdAt: '2024-01-15T10:00:00.000Z',
    gender: 'male',
    size: '120cm',
    weight: '1.2kg',
    birthDate: '2023-05',
    morph: '파스텔'
  },
  {
    id: '2',
    title: '노말 레오파드게코 - 암컷',
    species: 'leopard_gecko',
    price: 80000,
    images: ['/images/animals/leopard-gecko1.svg', '/images/animals/leopard-gecko2.svg'],
    description: '건강한 베이비 레오파드게코입니다. 2024년 1월생으로 현재 15cm, 45g입니다. 밀웜과 귀뚜라미를 잘 먹습니다.',
    location: '경기 성남시',
    seller: { name: '게코사랑', rating: 4.9 },
    isHealthChecked: false,
    createdAt: '2024-01-14T10:00:00.000Z',
    gender: 'female',
    size: '15cm',
    weight: '45g',
    birthDate: '2024-01',
    morph: '노말'
  },
  {
    id: '3',
    title: '핀스트라이프 크레스티드게코',
    species: 'crested_gecko',
    price: 150000,
    images: ['/images/animals/crested-gecko1.svg'],
    description: '아름다운 패턴의 크레스티드게코입니다. 2023년 8월생으로 크레스티드 전용 사료를 잘 먹습니다.',
    location: '부산 해운대구',
    seller: { name: '크레게코월드', rating: 4.7 },
    isHealthChecked: true,
    createdAt: '2024-01-13T10:00:00.000Z',
    gender: 'unknown',
    size: '18cm',
    weight: '55g',
    birthDate: '2023-08',
    morph: '핀스트라이프'
  },
  {
    id: '4',
    title: '러시안 육지거북 - 베이비',
    species: 'tortoise',
    price: 180000,
    images: ['/images/animals/tortoise1.svg', '/images/animals/tortoise2.svg'],
    description: '건강하고 활발한 러시안 육지거북입니다. 2022년 3월생으로 현재 12cm, 350g입니다. 채소를 잘 먹고 활동적입니다.',
    location: '서울 마포구',
    seller: { name: '거북이마을', rating: 4.9 },
    isHealthChecked: true,
    createdAt: '2024-01-12T10:00:00.000Z',
    gender: 'unknown',
    size: '12cm',
    weight: '350g',
    birthDate: '2022-03',
    morph: '일반'
  },
  {
    id: '5',
    title: '알비노 볼파이톤 - 암컷',
    species: 'ball_python',
    price: 350000,
    images: [],
    description: '희귀한 알비노 모프 볼파이톤입니다. 2023년 7월생으로 100cm, 950g입니다. 유전자 확인 완료된 개체입니다.',
    location: '인천 연수구',
    seller: { name: '행복한파충류', rating: 4.8 },
    isHealthChecked: true,
    createdAt: '2024-01-11T10:00:00.000Z'
  },
  {
    id: '6',
    title: '탠저린 레오파드게코 - 수컷',
    species: 'leopard_gecko',
    price: 120000,
    images: [],
    description: '선명한 오렌지색의 탠저린 게코입니다. 2023년 11월생으로 발색이 뛰어난 개체입니다.',
    location: '대전 서구',
    seller: { name: '게코사랑', rating: 4.9 },
    isHealthChecked: false,
    createdAt: '2024-01-10T10:00:00.000Z'
  },
  {
    id: '7',
    title: '옐로벨리 볼파이톤',
    species: 'ball_python',
    price: 200000,
    images: [],
    description: '옐로벨리 모프의 아름다운 볼파이톤입니다. 성격이 온순하고 먹이반응이 좋습니다.',
    location: '대구 수성구',
    seller: { name: '대구파충류', rating: 4.6 },
    isHealthChecked: true,
    createdAt: '2024-01-09T10:00:00.000Z'
  },
  {
    id: '8',
    title: '그리스 육지거북',
    species: 'tortoise',
    price: 220000,
    images: [],
    description: '건강한 그리스 육지거북입니다. UV램프 아래에서 일광욕을 즐기는 활발한 개체입니다.',
    location: '광주 서구',
    seller: { name: '거북이마을', rating: 4.9 },
    isHealthChecked: false,
    createdAt: '2024-01-08T10:00:00.000Z'
  },
  {
    id: '9',
    title: '달마시안 크레스티드게코',
    species: 'crested_gecko',
    price: 200000,
    images: [],
    description: '점박이 패턴이 매력적인 달마시안 크레스티드게코입니다. 습도 관리가 쉬운 개체입니다.',
    location: '울산 남구',
    seller: { name: '울산렙타일', rating: 4.5 },
    isHealthChecked: true,
    createdAt: '2024-01-07T10:00:00.000Z'
  },
  {
    id: '10',
    title: '시트러스 비어디드래곤',
    species: 'bearded_dragon',
    price: 280000,
    images: [],
    description: '밝은 노란색의 시트러스 비어디드래곤입니다. 채소와 곤충 모두 잘 먹는 건강한 개체입니다.',
    location: '서울 송파구',
    seller: { name: '비어디마켓', rating: 4.7 },
    isHealthChecked: false,
    createdAt: '2024-01-06T10:00:00.000Z',
    gender: 'male',
    size: '45cm',
    weight: '420g',
    birthDate: '2023-06',
    morph: '시트러스'
  }
];

// 모든 브리더의 동물들을 하나의 배열로 합치기
const allBreederAnimals = Object.values(breederAnimals).flat();

// 전체 동물 목록 = 기존 동물 + 브리더 동물
export const allAnimals = [...mockAnimals, ...allBreederAnimals];

export const initialData: Phase1Data = {
  animals: allAnimals,
  favorites: [],
  viewHistory: []
};