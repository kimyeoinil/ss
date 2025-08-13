import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: '서버가 정상적으로 작동 중입니다.',
    endpoints: {
      home: 'http://localhost:3000',
      animals: 'http://localhost:3000/animals',
      animalDetail: 'http://localhost:3000/animals/1',
      test: 'http://localhost:3000/test-detail'
    }
  });
}