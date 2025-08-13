import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { supabase } from '@/lib/supabase/client';

// OpenAI 클라이언트 초기화 (API 키가 없으면 null)
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(request: NextRequest) {
  console.log('Diagnose API called');
  
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    const userId = formData.get('userId') as string;
    const animalId = formData.get('animalId') as string | null;

    console.log('Received:', { 
      hasImage: !!image, 
      userId, 
      animalId,
      imageSize: image?.size,
      imageType: image?.type 
    });

    if (!image || !userId) {
      return NextResponse.json(
        { error: 'Image and userId are required' },
        { status: 400 }
      );
    }

    // 이미지를 base64로 변환
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // 환경변수가 설정되지 않은 경우 모의 데이터 반환
    if (!openai || !process.env.OPENAI_API_KEY) {
      console.log('테스트 모드: 모의 AI 진단 결과를 반환합니다.');
      
      // 모의 진단 결과
      const mockDiagnosis = {
        id: 'mock-' + Date.now(),
        healthScore: 85,
        healthStatus: 'good' as const,
        morphAnalysis: {
          species: 'ball_python',
          morph: '파스텔',
          confidence: 92,
          description: '파스텔 모프는 밝고 부드러운 색상이 특징입니다.',
          rarity: 'uncommon' as const,
          characteristics: ['밝은 색상', '부드러운 패턴', '선명한 대비'],
        },
        recommendations: [
          '적절한 온도(28-32°C)와 습도(50-60%) 유지',
          '규칙적인 먹이 급여 스케줄 유지',
          '스트레스 최소화를 위한 은신처 제공'
        ],
        warnings: [],
        imageUrl: `data:image/jpeg;base64,${base64Image.substring(0, 100)}...`, // 일부만 저장
        createdAt: new Date().toISOString(),
      };
      
      return NextResponse.json(mockDiagnosis);
    }

    // OpenAI Vision API 호출
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `당신은 한국의 파충류 전문 수의사입니다. 이미지를 분석하여 다음 정보를 JSON 형식으로 제공해주세요. 모든 텍스트는 반드시 한국어로 작성하세요:

{
  "species": "종류 영문코드 (ball_python, leopard_gecko, crested_gecko, bearded_dragon, tortoise 중 하나)",
  "morph": "모프 이름 (한국어)",
  "confidence": 0-100 사이의 확신도,
  "rarity": "common/uncommon/rare/ultra_rare 중 하나",
  "description": "모프에 대한 한국어 설명",
  "characteristics": ["한국어 특징1", "한국어 특징2", "한국어 특징3"],
  "healthScore": 0-100 사이의 건강 점수,
  "healthStatus": "excellent/good/fair/poor 중 하나",
  "recommendations": ["한국어 권장사항1", "한국어 권장사항2", "한국어 권장사항3"],
  "warnings": ["한국어 주의사항1", "한국어 주의사항2"] (없으면 빈 배열)
}

예시:
- morph: "블리자드" (영어 아님)
- description: "블리자드 모프는 패턴이 없고 흰색에서 연한 노란색 또는 회색까지의 단색이 특징입니다."
- characteristics: ["매끈한 피부", "큰 눈", "독특한 미소"]
- recommendations: ["적절한 온도(28-32°C) 유지", "습도 40-50% 유지", "칼슘 보충제 급여"]

특수동물의 외관, 자세, 환경 등을 종합적으로 평가하여 건강 상태를 판단하세요.`
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "이 파충류의 종류, 모프, 건강 상태를 분석해주세요."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 1000,
    });

    const analysisText = response.choices[0].message.content || '';
    let analysis;
    
    try {
      // JSON 파싱 시도
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      // 기본값 설정
      analysis = {
        species: "unknown",
        morph: "Unknown",
        confidence: 70,
        rarity: "common",
        description: "분석 중 오류가 발생했습니다.",
        characteristics: ["분석 필요"],
        healthScore: 75,
        healthStatus: "good",
        recommendations: ["수의사 상담을 권장합니다."],
        warnings: []
      };
    }

    // Supabase가 설정되지 않은 경우 base64 이미지 사용
    let imageUrl = `data:image/jpeg;base64,${base64Image}`;
    let diagnosisId = `diag-${Date.now()}`;
    let createdAt = new Date().toISOString();

    // Supabase가 설정된 경우에만 업로드 시도
    if (supabase) {
      try {
        // Supabase Storage에 이미지 업로드
        const fileName = `diagnoses/${userId}/${Date.now()}.jpg`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('images')
          .upload(fileName, buffer, {
            contentType: 'image/jpeg',
            upsert: false
          });

        if (!uploadError && uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(fileName);
          imageUrl = publicUrl;

          // 진단 결과 저장
          const { data: diagnosis, error: diagnosisError } = await supabase
            .from('diagnoses')
            .insert({
              user_id: userId,
              animal_id: animalId,
              health_score: analysis.healthScore,
              health_status: analysis.healthStatus,
              morph_species: analysis.species,
              morph_name: analysis.morph,
              morph_confidence: analysis.confidence,
              morph_description: analysis.description,
              morph_rarity: analysis.rarity,
              morph_characteristics: analysis.characteristics,
              recommendations: analysis.recommendations,
              warnings: analysis.warnings,
              image_url: publicUrl,
            })
            .select()
            .single();

          if (!diagnosisError && diagnosis) {
            diagnosisId = diagnosis.id;
            createdAt = diagnosis.created_at;

            // 동물이 연결된 경우 health_checked 업데이트
            if (animalId) {
              await supabase
                .from('animals')
                .update({ is_health_checked: true })
                .eq('id', animalId);
            }
          }
        }
      } catch (supabaseError) {
        console.warn('Supabase 저장 실패, 로컬 모드로 계속 진행:', supabaseError);
      }
    }

    return NextResponse.json({
      id: diagnosisId,
      healthScore: analysis.healthScore,
      healthStatus: analysis.healthStatus,
      morphAnalysis: {
        species: analysis.species,
        morph: analysis.morph,
        confidence: analysis.confidence,
        description: analysis.description,
        rarity: analysis.rarity,
        characteristics: analysis.characteristics,
      },
      recommendations: analysis.recommendations,
      warnings: analysis.warnings,
      imageUrl: imageUrl,
      createdAt: createdAt,
    });

  } catch (error) {
    console.error('Diagnosis error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        error: 'Failed to process diagnosis',
        details: errorMessage,
        stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined
      },
      { status: 500 }
    );
  }
}