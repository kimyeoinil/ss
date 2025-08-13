// Phase 1 Types
export interface Animal {
  id: string;
  title: string;
  species: string;
  price: number;
  images: string[];
  description: string;
  location?: string;
  seller?: {
    name: string;
    rating: number;
    breederId?: string;
  };
  isHealthChecked?: boolean;
  createdAt: string;
  // 추가 상세 정보
  gender?: 'male' | 'female' | 'unknown';
  size?: string;
  weight?: string;
  birthDate?: string;
  morph?: string;
}

export interface Phase1Data {
  animals: Animal[];
  favorites: string[]; // animal IDs
  viewHistory: {
    animalId: string;
    viewedAt: string;
  }[];
}

// Species enum
export const SPECIES = {
  ball_python: "볼파이톤",
  bearded_dragon: "비어디드래곤",
  leopard_gecko: "레오파드게코",
  crested_gecko: "크레스티드게코",
  tortoise: "육지거북",
  corn_snake: "콘스네이크",
  blue_tongue_skink: "블루텅스킨크",
} as const;

export type SpeciesType = keyof typeof SPECIES;

// Phase 2 Types - AI Diagnosis
export interface DiagnosisResult {
  id: string;
  animalId?: string;
  healthScore: number; // 0-100
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
  morphAnalysis: MorphData;
  recommendations: string[];
  warnings?: string[];
  imageUrl: string;
  pdfUrl?: string; // Base64 or Blob URL
  createdAt: Date;
}

export interface MorphData {
  species: SpeciesType;
  morph: string;
  confidence: number; // 0-100
  description: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'ultra_rare';
  characteristics: string[];
}

export interface HealthIssue {
  issue: string;
  severity: 'low' | 'medium' | 'high';
  recommendation: string;
}

export interface DiagnosisSession {
  step: 'upload' | 'analyzing' | 'result';
  uploadedImage?: File;
  result?: DiagnosisResult;
}

// Local Storage Types
export interface LocalStorageData extends Phase1Data {
  diagnoses: DiagnosisResult[];
  diagnosisSessions: DiagnosisSession[];
}

// Breeder Types
export interface Breeder {
  id: string;
  name: string;
  businessName?: string;
  profileImage?: string;
  location: string;
  description: string;
  specialties: SpeciesType[];
  rating: number;
  reviewCount: number;
  transactionCount: number;
  aiDiagnosisRate: number; // AI 진단서 발급 비율 (%)
  isVerified: boolean;
  createdAt: Date;
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    blog?: string;
  };
}

export interface BreederReview {
  id: string;
  breederId: string;
  animalId: string;
  authorName: string;
  rating: number;
  content: string;
  images?: string[];
  createdAt: Date;
}