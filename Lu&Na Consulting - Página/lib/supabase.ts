import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export type Database = {
  public: {
    Tables: {
      stocks: {
        Row: {
          id: string
          slug: string
          title: string
          category: string
          price: number | null
          currency: string
          short_description: string
          description: string | null
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          category: string
          price?: number | null
          currency?: string
          short_description: string
          description?: string | null
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          category?: string
          price?: number | null
          currency?: string
          short_description?: string
          description?: string | null
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      stock_images: {
        Row: {
          id: string
          stock_id: string
          src: string
          alt: string
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          stock_id: string
          src: string
          alt: string
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          stock_id?: string
          src?: string
          alt?: string
          sort_order?: number
          created_at?: string
        }
      }
      stock_videos: {
        Row: {
          id: string
          stock_id: string
          src: string
          title: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          stock_id: string
          src: string
          title?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          stock_id?: string
          src?: string
          title?: string | null
          sort_order?: number
          created_at?: string
        }
      }
      stock_specs: {
        Row: {
          id: string
          stock_id: string
          spec_key: string
          spec_value: string
          created_at: string
        }
        Insert: {
          id?: string
          stock_id: string
          spec_key: string
          spec_value: string
          created_at?: string
        }
        Update: {
          id?: string
          stock_id?: string
          spec_key?: string
          spec_value?: string
          created_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          name: string | null
          email: string | null
          phone: string | null
          message: string | null
          stock_id: string | null
          source: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name?: string | null
          email?: string | null
          phone?: string | null
          message?: string | null
          stock_id?: string | null
          source?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          email?: string | null
          phone?: string | null
          message?: string | null
          stock_id?: string | null
          source?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      analytics: {
        Row: {
          id: string
          event_type: string
          stock_id: string | null
          user_session_id: string | null
          ip_address: string | null
          user_agent: string | null
          referrer: string | null
          metadata: any | null
          created_at: string
        }
        Insert: {
          id?: string
          event_type: string
          stock_id?: string | null
          user_session_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          referrer?: string | null
          metadata?: any | null
          created_at?: string
        }
        Update: {
          id?: string
          event_type?: string
          stock_id?: string | null
          user_session_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          referrer?: string | null
          metadata?: any | null
          created_at?: string
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export const createSupabaseClient = () => {
  return createClientComponentClient<Database>()
}

// Stock-related functions
export class SupabaseStockService {
  private supabase = createSupabaseClient()

  async getAllStocks() {
    const { data, error } = await this.supabase
      .from('stocks')
      .select(`
        *,
        stock_images (
          id,
          src,
          alt,
          sort_order
        ),
        stock_videos (
          id,
          src,
          title,
          sort_order
        ),
        stock_specs (
          id,
          spec_key,
          spec_value
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async getStockBySlug(slug: string) {
    const { data, error } = await this.supabase
      .from('stocks')
      .select(`
        *,
        stock_images (
          id,
          src,
          alt,
          sort_order
        ),
        stock_videos (
          id,
          src,
          title,
          sort_order
        ),
        stock_specs (
          id,
          spec_key,
          spec_value
        )
      `)
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data
  }

  async getFeaturedStocks() {
    const { data, error } = await this.supabase
      .from('stocks')
      .select(`
        *,
        stock_images (
          id,
          src,
          alt,
          sort_order
        ),
        stock_videos (
          id,
          src,
          title,
          sort_order
        )
      `)
      .eq('featured', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async getStocksByCategory(category: string) {
    const { data, error } = await this.supabase
      .from('stocks')
      .select(`
        *,
        stock_images (
          id,
          src,
          alt,
          sort_order
        ),
        stock_videos (
          id,
          src,
          title,
          sort_order
        )
      `)
      .eq('category', category)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  // Analytics tracking
  async trackEvent(eventType: string, stockId?: string, metadata?: any) {
    const sessionId = typeof window !== 'undefined' 
      ? sessionStorage.getItem('session_id') || 
        (() => {
          const id = crypto.randomUUID()
          sessionStorage.setItem('session_id', id)
          return id
        })()
      : null

    const { error } = await this.supabase
      .from('analytics')
      .insert({
        event_type: eventType,
        stock_id: stockId,
        user_session_id: sessionId,
        user_agent: typeof window !== 'undefined' ? navigator.userAgent : null,
        referrer: typeof window !== 'undefined' ? document.referrer : null,
        metadata
      })

    if (error) console.error('Analytics tracking error:', error)
  }

  // Lead management
  async createLead(leadData: {
    name?: string
    email?: string
    phone?: string
    message?: string
    stockId?: string
    source?: string
  }) {
    const { data, error } = await this.supabase
      .from('leads')
      .insert({
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        message: leadData.message,
        stock_id: leadData.stockId,
        source: leadData.source || 'website'
      })
      .select()
      .single()

    if (error) throw error
    return data
  }
}

export const stockService = new SupabaseStockService()
