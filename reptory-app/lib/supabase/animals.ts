import { supabase } from './client';
import { Database } from '@/types/supabase';

type AnimalRow = Database['public']['Tables']['animals']['Row'];
type AnimalInsert = Database['public']['Tables']['animals']['Insert'];
type AnimalUpdate = Database['public']['Tables']['animals']['Update'];

export interface AnimalWithImages extends AnimalRow {
  animal_images: Array<{
    id: string;
    image_url: string;
    is_primary: boolean;
    display_order: number;
  }>;
  profiles?: {
    username: string | null;
    full_name: string | null;
  };
}

export const animalsService = {
  // 동물 목록 조회
  async getAnimals(filters?: {
    species?: string;
    sortBy?: 'latest' | 'price-low' | 'price-high';
    search?: string;
  }) {
    let query = supabase
      .from('animals')
      .select(`
        *,
        animal_images!inner (
          id,
          image_url,
          is_primary,
          display_order
        ),
        profiles!seller_id (
          username,
          full_name
        )
      `);

    // 필터 적용
    if (filters?.species && filters.species !== 'all') {
      query = query.eq('species', filters.species);
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    // 정렬 적용
    switch (filters?.sortBy) {
      case 'price-low':
        query = query.order('price', { ascending: true });
        break;
      case 'price-high':
        query = query.order('price', { ascending: false });
        break;
      case 'latest':
      default:
        query = query.order('created_at', { ascending: false });
        break;
    }

    const { data, error } = await query;
    
    if (error) throw error;
    return data as AnimalWithImages[];
  },

  // 동물 상세 조회
  async getAnimal(id: string) {
    const { data, error } = await supabase
      .from('animals')
      .select(`
        *,
        animal_images (
          id,
          image_url,
          is_primary,
          display_order
        ),
        profiles!seller_id (
          username,
          full_name,
          avatar_url
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as AnimalWithImages;
  },

  // 동물 등록
  async createAnimal(animal: AnimalInsert, images: string[]) {
    const { data: animalData, error: animalError } = await supabase
      .from('animals')
      .insert(animal)
      .select()
      .single();

    if (animalError) throw animalError;

    // 이미지 등록
    if (images.length > 0) {
      const imageInserts = images.map((url, index) => ({
        animal_id: animalData.id,
        image_url: url,
        is_primary: index === 0,
        display_order: index
      }));

      const { error: imageError } = await supabase
        .from('animal_images')
        .insert(imageInserts);

      if (imageError) throw imageError;
    }

    return animalData;
  },

  // 동물 수정
  async updateAnimal(id: string, updates: AnimalUpdate) {
    const { data, error } = await supabase
      .from('animals')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 동물 삭제
  async deleteAnimal(id: string) {
    const { error } = await supabase
      .from('animals')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // 내가 등록한 동물 목록
  async getMyAnimals(userId: string) {
    const { data, error } = await supabase
      .from('animals')
      .select(`
        *,
        animal_images!inner (
          id,
          image_url,
          is_primary,
          display_order
        )
      `)
      .eq('seller_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as AnimalWithImages[];
  },

  // 조회수 기록
  async recordView(animalId: string, userId: string) {
    const { error } = await supabase
      .from('view_history')
      .insert({
        animal_id: animalId,
        user_id: userId
      });

    if (error && error.code !== '23505') { // 중복 에러가 아닌 경우만 throw
      throw error;
    }
  }
};