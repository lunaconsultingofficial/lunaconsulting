"use client"

import { useState, useEffect } from 'react'
import { stockService } from '@/lib/supabase'
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

export function useSupabaseStocks() {
  const [stocks, setStocks] = useState<StockItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStocks() {
      try {
        setLoading(true)
        const data = await stockService.getAllStocks()
        const transformedStocks = data.map(transformSupabaseStock)
        setStocks(transformedStocks)
        setError(null)
      } catch (err) {
        console.error('Error fetching stocks:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch stocks')
        // Fallback to local data if Supabase fails
        const { stocks: localStocks } = await import('@/data/stocks')
        setStocks(localStocks)
      } finally {
        setLoading(false)
      }
    }

    fetchStocks()
  }, [])

  return { stocks, loading, error }
}

export function useSupabaseStock(slug: string) {
  const [stock, setStock] = useState<StockItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStock() {
      try {
        setLoading(true)
        const data = await stockService.getStockBySlug(slug)
        const transformedStock = transformSupabaseStock(data)
        setStock(transformedStock)
        setError(null)
        
        // Track page view
        await stockService.trackEvent('stock_view', data.id)
      } catch (err) {
        console.error('Error fetching stock:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch stock')
        // Fallback to local data if Supabase fails
        const { stocks: localStocks } = await import('@/data/stocks')
        const localStock = localStocks.find(s => s.slug === slug)
        setStock(localStock || null)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchStock()
    }
  }, [slug])

  return { stock, loading, error }
}

export function useFeaturedStocks() {
  const [stocks, setStocks] = useState<StockItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFeaturedStocks() {
      try {
        setLoading(true)
        const data = await stockService.getFeaturedStocks()
        const transformedStocks = data.map(transformSupabaseStock)
        setStocks(transformedStocks)
        setError(null)
      } catch (err) {
        console.error('Error fetching featured stocks:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch featured stocks')
        // Fallback to local data if Supabase fails
        const { stocks: localStocks } = await import('@/data/stocks')
        const featuredStocks = localStocks.filter(s => s.featured)
        setStocks(featuredStocks)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedStocks()
  }, [])

  return { stocks, loading, error }
}

// Analytics helpers
export function useStockAnalytics() {
  const trackStockView = async (stockSlug: string) => {
    try {
      await stockService.trackEvent('stock_view', stockSlug, {
        page: 'stock_detail',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      console.error('Failed to track stock view:', error)
    }
  }

  const trackStockInteraction = async (stockSlug: string, interaction: string) => {
    try {
      await stockService.trackEvent('stock_interaction', stockSlug, {
        interaction,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      console.error('Failed to track stock interaction:', error)
    }
  }

  const trackWhatsAppClick = async (stockSlug: string, department: string) => {
    try {
      await stockService.trackEvent('whatsapp_click', stockSlug, {
        department,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      console.error('Failed to track WhatsApp click:', error)
    }
  }

  return {
    trackStockView,
    trackStockInteraction,
    trackWhatsAppClick
  }
}
