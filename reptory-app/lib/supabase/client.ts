import { createClient } from '@supabase/supabase-js';

// 환경변수 확인
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Supabase 클라이언트를 조건부로 생성
export const supabase = (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your_supabase_url') 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// 개발 환경에서만 경고 표시
if (typeof window !== 'undefined' && !supabase) {
  console.warn('Supabase가 설정되지 않았습니다. 일부 기능이 제한될 수 있습니다.');
}