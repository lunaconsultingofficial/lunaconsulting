"use client"

import { useState, useEffect } from 'react'
import { supabaseService } from '@/lib/supabase-client'
import type { StockItem } from '@/data/stocks'

// Transform Supabase data to match our existing StockItem type
function transformSupabaseStock(supabaseStock: any): StockItem {
  return {
    slug: supabaseStock.slug,
    title: supabaseStock.title,
    category: supabaseStock.category as any,
    price: supabaseStock.price,
    currency: supabaseStock.currency,
    short: supabaseStock.short_description,
    description: supabaseStock.description,
    images: (supabaseStock.stock_images || [])
      .sort((a: any, b: any) => a.sort_order - b.sort_order)
      .map((img: any) => ({
        src: img.src,
        alt: img.alt
      })),
    videos: (supabaseStock.stock_videos || [])
      .sort((a: any, b: any) => a.sort_order - b.sort_order)
      .map((video: any) => video.src),
    specs: (supabaseStock.stock_specs || []).reduce(
      (acc: Record<string, string>, spec: any) => {
        acc[spec.spec_key] = spec.spec_value
        return acc
      },
      {}
    ),
    featured: supabaseStock.featured
  }
}

// Hook for all stocks
export function useSupabaseStocks() {
  const [stocks, setStocks] = useState<StockItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    async function fetchStocks() {
      try {
        setLoading(true)
        setError(null)

        // Test connection first
        const connected = await supabaseService.testConnection()
        setIsConnected(connected)

        if (connected) {
          // Fetch from Supabase
          const data = await supabaseService.getAllStocks()
          const transformedStocks = data.map(transformSupabaseStock)
          setStocks(transformedStocks)
          
          console.log(`✅ Loaded ${transformedStocks.length} stocks from Supabase`)
        } else {
          // Fallback to local data
          const { stocks: localStocks } = await import('@/data/stocks')
          setStocks(localStocks)
          
          console.log(`⚠️ Using ${localStocks.length} local stocks (Supabase unavailable)`)
        }
      } catch (err) {
        console.error('Error fetching stocks:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch stocks')
        
        // Fallback to local data on error
        try {
          const { stocks: localStocks } = await import('@/data/stocks')
          setStocks(localStocks)
          console.log('📦 Fallback to local stocks')
        } catch (fallbackError) {
          console.error('Failed to load local stocks:', fallbackError)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchStocks()
  }, [])

  return { stocks, loading, error, isConnected }
}

// Hook for single stock
export function useSupabaseStock(slug: string) {
  const [stock, setStock] = useState<StockItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStock() {
      if (!slug) return

      try {
        setLoading(true)
        setError(null)

        // Test connection
        const connected = await supabaseService.testConnection()

        if (connected) {
          // Fetch from Supabase
          const data = await supabaseService.getStockBySlug(slug)
          const transformedStock = transformSupabaseStock(data)
          setStock(transformedStock)
          
          // Track page view
          await supabaseService.trackEvent('stock_view', data.id, {
            slug,
            title: data.title,
            category: data.category
          })
        } else {
          // Fallback to local data
          const { stocks: localStocks } = await import('@/data/stocks')
          const localStock = localStocks.find(s => s.slug === slug)
          setStock(localStock || null)
        }
      } catch (err) {
        console.error('Error fetching stock:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch stock')
        
        // Fallback to local data
        try {
          const { stocks: localStocks } = await import('@/data/stocks')
          const localStock = localStocks.find(s => s.slug === slug)
          setStock(localStock || null)
        } catch (fallbackError) {
          console.error('Failed to load local stock:', fallbackError)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchStock()
  }, [slug])

  return { stock, loading, error }
}

// Hook for featured stocks
export function useFeaturedStocks() {
  const [stocks, setStocks] = useState<StockItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFeaturedStocks() {
      try {
        setLoading(true)
        setError(null)

        // Test connection
        const connected = await supabaseService.testConnection()

        if (connected) {
          // Fetch from Supabase
          const data = await supabaseService.getFeaturedStocks()
          const transformedStocks = data.map(transformSupabaseStock)
          setStocks(transformedStocks)
        } else {
          // Fallback to local data
          const { stocks: localStocks } = await import('@/data/stocks')
          const featuredStocks = localStocks.filter(s => s.featured)
          setStocks(featuredStocks)
        }
      } catch (err) {
        console.error('Error fetching featured stocks:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch featured stocks')
        
        // Fallback to local data
        try {
          const { stocks: localStocks } = await import('@/data/stocks')
          const featuredStocks = localStocks.filter(s => s.featured)
          setStocks(featuredStocks)
        } catch (fallbackError) {
          console.error('Failed to load local featured stocks:', fallbackError)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedStocks()
  }, [])

  return { stocks, loading, error }
}

// Analytics hooks
export function useStockAnalytics() {
  const trackStockView = async (stockSlug: string) => {
    try {
      await supabaseService.trackEvent('stock_view', stockSlug, {
        page: 'stock_detail',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      console.error('Failed to track stock view:', error)
    }
  }

  const trackStockInteraction = async (stockSlug: string, interaction: string) => {
    try {
      await supabaseService.trackEvent('stock_interaction', stockSlug, {
        interaction,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      console.error('Failed to track stock interaction:', error)
    }
  }

  const trackWhatsAppClick = async (stockSlug: string, department: string) => {
    try {
      await supabaseService.trackEvent('whatsapp_click', stockSlug, {
        department,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      console.error('Failed to track WhatsApp click:', error)
    }
  }

  const trackCategoryFilter = async (category: string) => {
    try {
      await supabaseService.trackEvent('category_filter', undefined, {
        category,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      console.error('Failed to track category filter:', error)
    }
  }

  return {
    trackStockView,
    trackStockInteraction,
    trackWhatsAppClick,
    trackCategoryFilter
  }
}

// Lead management hook
export function useLeadManagement() {
  const createLead = async (leadData: {
    name?: string
    email?: string
    phone?: string
    message?: string
    stockSlug?: string
    source?: string
  }) => {
    try {
      // If we have a stock slug, find the stock ID
      let stockId = undefined
      if (leadData.stockSlug) {
        const connected = await supabaseService.testConnection()
        if (connected) {
          try {
            const stock = await supabaseService.getStockBySlug(leadData.stockSlug)
            stockId = stock.id
          } catch (error) {
            console.warn('Could not find stock ID for slug:', leadData.stockSlug)
          }
        }
      }

      const lead = await supabaseService.createLead({
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        message: leadData.message,
        stockId,
        source: leadData.source
      })

      // Track lead creation
      await supabaseService.trackEvent('lead_created', stockId, {
        source: leadData.source,
        hasEmail: !!leadData.email,
        hasPhone: !!leadData.phone,
        timestamp: new Date().toISOString()
      })

      return lead
    } catch (error) {
      console.error('Failed to create lead:', error)
      throw error
    }
  }

  return { createLead }
}
