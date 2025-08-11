import { createClient } from '@supabase/supabase-js'
import type { Database } from './supabase'

// Get environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase environment variables not found. Using local data fallback.')
}

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

// Enhanced stock service with better error handling
export class SupabaseService {
  private client = supabase

  // Test connection
  async testConnection(): Promise<boolean> {
    try {
      const { data, error } = await this.client
        .from('stocks')
        .select('count', { count: 'exact', head: true })
      
      if (error) {
        console.error('Supabase connection test failed:', error)
        return false
      }
      
      console.log('✅ Supabase connected successfully')
      return true
    } catch (error) {
      console.error('Supabase connection error:', error)
      return false
    }
  }

  // Get all stocks with related data
  async getAllStocks() {
    try {
      const { data, error } = await this.client
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

      if (error) {
        console.error('Error fetching stocks:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('getAllStocks error:', error)
      throw error
    }
  }

  // Get stock by slug
  async getStockBySlug(slug: string) {
    try {
      const { data, error } = await this.client
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

      if (error) {
        console.error('Error fetching stock by slug:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('getStockBySlug error:', error)
      throw error
    }
  }

  // Get featured stocks
  async getFeaturedStocks() {
    try {
      const { data, error } = await this.client
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

      if (error) {
        console.error('Error fetching featured stocks:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('getFeaturedStocks error:', error)
      throw error
    }
  }

  // Track analytics event
  async trackEvent(eventType: string, stockId?: string, metadata?: any) {
    try {
      // Generate or get session ID
      const sessionId = this.getSessionId()

      const { error } = await this.client
        .from('analytics')
        .insert({
          event_type: eventType,
          stock_id: stockId,
          user_session_id: sessionId,
          user_agent: typeof window !== 'undefined' ? navigator.userAgent : null,
          referrer: typeof window !== 'undefined' ? document.referrer : null,
          metadata: metadata || {}
        })

      if (error) {
        console.error('Analytics tracking error:', error)
      }
    } catch (error) {
      console.error('trackEvent error:', error)
    }
  }

  // Create lead
  async createLead(leadData: {
    name?: string
    email?: string
    phone?: string
    message?: string
    stockId?: string
    source?: string
  }) {
    try {
      const { data, error } = await this.client
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

      if (error) {
        console.error('Error creating lead:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('createLead error:', error)
      throw error
    }
  }

  // Get analytics data (for admin dashboard)
  async getAnalytics(dateFrom?: string, dateTo?: string) {
    try {
      let query = this.client
        .from('analytics')
        .select('*')
        .order('created_at', { ascending: false })

      if (dateFrom) {
        query = query.gte('created_at', dateFrom)
      }
      if (dateTo) {
        query = query.lte('created_at', dateTo)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching analytics:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('getAnalytics error:', error)
      throw error
    }
  }

  // Get leads (for admin dashboard)
  async getLeads(status?: string) {
    try {
      let query = this.client
        .from('leads')
        .select(`
          *,
          stocks (
            title,
            slug
          )
        `)
        .order('created_at', { ascending: false })

      if (status) {
        query = query.eq('status', status)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching leads:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('getLeads error:', error)
      throw error
    }
  }

  // Utility: Get or create session ID
  private getSessionId(): string {
    if (typeof window === 'undefined') return 'server-side'
    
    let sessionId = sessionStorage.getItem('luna_session_id')
    
    if (!sessionId) {
      sessionId = crypto.randomUUID()
      sessionStorage.setItem('luna_session_id', sessionId)
    }
    
    return sessionId
  }
}

// Export singleton instance
export const supabaseService = new SupabaseService()

// Test connection on import (client-side only)
if (typeof window !== 'undefined') {
  supabaseService.testConnection().then(connected => {
    if (connected) {
      console.log('🚀 Lu&Na Consulting connected to Supabase')
    } else {
      console.warn('⚠️ Using local data fallback')
    }
  })
}
