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
          email: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          organization: string | null
          role: string | null
          is_admin: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          organization?: string | null
          role?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          organization?: string | null
          role?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          event_date: string
          location: string
          image_url: string | null
          registration_link: string | null
          status: 'upcoming' | 'ongoing' | 'completed'
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          event_date: string
          location: string
          image_url?: string | null
          registration_link?: string | null
          status?: 'upcoming' | 'ongoing' | 'completed'
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          event_date?: string
          location?: string
          image_url?: string | null
          registration_link?: string | null
          status?: 'upcoming' | 'ongoing' | 'completed'
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string | null
          image_url: string | null
          published: boolean
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          excerpt?: string | null
          image_url?: string | null
          published?: boolean
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string | null
          image_url?: string | null
          published?: boolean
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      partnerships: {
        Row: {
          id: string
          name: string
          description: string
          logo_url: string | null
          website_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          logo_url?: string | null
          website_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          logo_url?: string | null
          website_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
