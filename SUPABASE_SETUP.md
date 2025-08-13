# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com) 접속
2. "Start your project" 클릭
3. GitHub으로 로그인
4. "New project" 클릭
5. 프로젝트 정보 입력:
   - Organization: 선택 또는 생성
   - Project name: `reptory`
   - Database Password: 강력한 비밀번호 설정 (저장해두세요!)
   - Region: Seoul (ap-northeast-2) 선택
   - Pricing Plan: Free (무료)

## 2. 환경 변수 설정

프로젝트 생성 후:
1. Settings > API 메뉴로 이동
2. 다음 값들을 복사하여 `.env.local` 파일에 추가:

```env
NEXT_PUBLIC_SUPABASE_URL=여기에_Project_URL_붙여넣기
NEXT_PUBLIC_SUPABASE_ANON_KEY=여기에_anon_public_key_붙여넣기
```

## 3. 데이터베이스 테이블 생성

1. SQL Editor 메뉴로 이동
2. "New query" 클릭
3. `/lib/supabase/schema.sql` 파일의 내용을 전체 복사
4. SQL Editor에 붙여넣기
5. "Run" 클릭하여 실행

## 4. Storage 버킷 생성

1. Storage 메뉴로 이동
2. "New bucket" 클릭
3. 버킷 이름: `images`
4. Public bucket 체크
5. "Create bucket" 클릭

## 5. Storage 정책 설정

1. Storage > Policies 탭
2. "New policy" 클릭
3. "For full customization" 선택
4. 다음 정책 추가:

**SELECT (읽기) 정책:**
- Policy name: `Public read access`
- Allowed operation: SELECT
- Target roles: anon, authenticated
- WITH CHECK expression: `true`

**INSERT (업로드) 정책:**
- Policy name: `Authenticated users can upload`
- Allowed operation: INSERT
- Target roles: authenticated
- WITH CHECK expression: `auth.role() = 'authenticated'`

## 6. OpenAI API 키 설정

1. [OpenAI Platform](https://platform.openai.com) 접속
2. API keys 메뉴
3. "Create new secret key" 클릭
4. 키를 복사하여 `.env.local`에 추가:

```env
OPENAI_API_KEY=여기에_OpenAI_API_키_붙여넣기
```

## 7. 테스트

1. 개발 서버 재시작:
```bash
npm run dev
```

2. 브라우저에서 http://localhost:3001 접속
3. AI 진단 기능 테스트

## 주의사항

- `.env.local` 파일은 절대 git에 커밋하지 마세요
- Supabase 무료 플랜은 500MB 스토리지, 2GB 대역폭 제한이 있습니다
- OpenAI API는 사용량에 따라 요금이 부과됩니다

## 문제 해결

**Storage 업로드 실패 시:**
- Supabase Dashboard > Storage > Configuration
- "Upload size limit" 확인 (기본 50MB)

**CORS 에러 발생 시:**
- Supabase Dashboard > Authentication > URL Configuration
- Site URL에 `http://localhost:3001` 추가