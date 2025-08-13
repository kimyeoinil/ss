export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          is_breeder: boolean
          breeder_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          is_breeder?: boolean
          breeder_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          is_breeder?: boolean
          breeder_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      animals: {
        Row: {
          id: string
          title: string
          species: string
          price: number
          description: string | null
          location: string | null
          morph: string | null
          gender: 'male' | 'female' | 'unknown' | null
          size: string | null
          weight: string | null
          birth_date: string | null
          is_health_checked: boolean
          seller_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          species: string
          price: number
          description?: string | null
          location?: string | null
          morph?: string | null
          gender?: 'male' | 'female' | 'unknown' | null
          size?: string | null
          weight?: string | null
          birth_date?: string | null
          is_health_checked?: boolean
          seller_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          species?: string
          price?: number
          description?: string | null
          location?: string | null
          morph?: string | null
          gender?: 'male' | 'female' | 'unknown' | null
          size?: string | null
          weight?: string | null
          birth_date?: string | null
          is_health_checked?: boolean
          seller_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      animal_images: {
        Row: {
          id: string
          animal_id: string
          image_url: string
          is_primary: boolean
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          animal_id: string
          image_url: string
          is_primary?: boolean
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          animal_id?: string
          image_url?: string
          is_primary?: boolean
          display_order?: number
          created_at?: string
        }
      }
      diagnoses: {
        Row: {
          id: string
          animal_id: string | null
          user_id: string
          health_score: number
          health_status: 'excellent' | 'good' | 'fair' | 'poor'
          morph_species: string
          morph_name: string
          morph_confidence: number
          morph_description: string | null
          morph_rarity: 'common' | 'uncommon' | 'rare' | 'ultra_rare' | null
          morph_characteristics: Json | null
          recommendations: Json | null
          warnings: Json | null
          image_url: string
          pdf_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          animal_id?: string | null
          user_id: string
          health_score: number
          health_status: 'excellent' | 'good' | 'fair' | 'poor'
          morph_species: string
          morph_name: string
          morph_confidence: number
          morph_description?: string | null
          morph_rarity?: 'common' | 'uncommon' | 'rare' | 'ultra_rare' | null
          morph_characteristics?: Json | null
          recommendations?: Json | null
          warnings?: Json | null
          image_url: string
          pdf_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          animal_id?: string | null
          user_id?: string
          health_score?: number
          health_status?: 'excellent' | 'good' | 'fair' | 'poor'
          morph_species?: string
          morph_name?: string
          morph_confidence?: number
          morph_description?: string | null
          morph_rarity?: 'common' | 'uncommon' | 'rare' | 'ultra_rare' | null
          morph_characteristics?: Json | null
          recommendations?: Json | null
          warnings?: Json | null
          image_url?: string
          pdf_url?: string | null
          created_at?: string
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          animal_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          animal_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          animal_id?: string
          created_at?: string
        }
      }
      view_history: {
        Row: {
          id: string
          user_id: string
          animal_id: string
          viewed_at: string
        }
        Insert: {
          id?: string
          user_id: string
          animal_id: string
          viewed_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          animal_id?: string
          viewed_at?: string
        }
      }
      breeders: {
        Row: {
          id: string
          user_id: string
          business_name: string | null
          description: string | null
          location: string
          specialties: Json | null
          rating: number
          review_count: number
          transaction_count: number
          ai_diagnosis_rate: number
          instagram_url: string | null
          youtube_url: string | null
          blog_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          business_name?: string | null
          description?: string | null
          location: string
          specialties?: Json | null
          rating?: number
          review_count?: number
          transaction_count?: number
          ai_diagnosis_rate?: number
          instagram_url?: string | null
          youtube_url?: string | null
          blog_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          business_name?: string | null
          description?: string | null
          location?: string
          specialties?: Json | null
          rating?: number
          review_count?: number
          transaction_count?: number
          ai_diagnosis_rate?: number
          instagram_url?: string | null
          youtube_url?: string | null
          blog_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}