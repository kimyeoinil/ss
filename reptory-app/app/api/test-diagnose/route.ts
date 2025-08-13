import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Diagnose API is reachable',
    env: {
      hasOpenAIKey: !!process.env.OPENAI_API_KEY,
      nodeEnv: process.env.NODE_ENV,
    }
  });
}

export async function POST() {
  return NextResponse.json({
    id: 'test-' + Date.now(),
    healthScore: 85,
    healthStatus: 'good',
    morphAnalysis: {
      species: 'ball_python',
      morph: '테스트 모프',
      confidence: 92,
      description: 'API 테스트 결과입니다.',
      rarity: 'uncommon',
      characteristics: ['테스트 특징 1', '테스트 특징 2'],
    },
    recommendations: ['테스트 권장사항'],
    warnings: [],
    imageUrl: 'test-image-url',
    createdAt: new Date().toISOString(),
  });
}