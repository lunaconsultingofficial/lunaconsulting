#!/usr/bin/env tsx

import { createClient } from '@supabase/supabase-js'
import { stocks } from '../data/stocks'
import type { Database } from '../lib/supabase'

// You'll need to set these environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || ''

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables')
  process.exit(1)
}

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_KEY)

async function migrateStocks() {
  console.log('🚀 Starting stock migration to Supabase...')

  for (const stock of stocks) {
    try {
      console.log(`��� Migrating: ${stock.title}`)

      // Insert stock
      const { data: stockData, error: stockError } = await supabase
        .from('stocks')
        .insert({
          slug: stock.slug,
          title: stock.title,
          category: stock.category,
          price: stock.price,
          currency: stock.currency || 'EUR',
          short_description: stock.short,
          description: stock.description,
          featured: stock.featured || false
        })
        .select()
        .single()

      if (stockError) {
        console.error(`❌ Error inserting stock ${stock.slug}:`, stockError)
        continue
      }

      console.log(`✅ Stock inserted: ${stockData.id}`)

      // Insert images
      if (stock.images && stock.images.length > 0) {
        const imageInserts = stock.images.map((image, index) => ({
          stock_id: stockData.id,
          src: image.src,
          alt: image.alt,
          sort_order: index
        }))

        const { error: imagesError } = await supabase
          .from('stock_images')
          .insert(imageInserts)

        if (imagesError) {
          console.error(`❌ Error inserting images for ${stock.slug}:`, imagesError)
        } else {
          console.log(`📸 Inserted ${imageInserts.length} images`)
        }
      }

      // Insert videos
      if (stock.videos && stock.videos.length > 0) {
        const videoInserts = stock.videos.map((videoSrc, index) => ({
          stock_id: stockData.id,
          src: videoSrc,
          title: `${stock.title} - Video ${index + 1}`,
          sort_order: index
        }))

        const { error: videosError } = await supabase
          .from('stock_videos')
          .insert(videoInserts)

        if (videosError) {
          console.error(`❌ Error inserting videos for ${stock.slug}:`, videosError)
        } else {
          console.log(`🎥 Inserted ${videoInserts.length} videos`)
        }
      }

      // Insert specs
      if (stock.specs && Object.keys(stock.specs).length > 0) {
        const specInserts = Object.entries(stock.specs).map(([key, value]) => ({
          stock_id: stockData.id,
          spec_key: key,
          spec_value: String(value)
        }))

        const { error: specsError } = await supabase
          .from('stock_specs')
          .insert(specInserts)

        if (specsError) {
          console.error(`❌ Error inserting specs for ${stock.slug}:`, specsError)
        } else {
          console.log(`📋 Inserted ${specInserts.length} specifications`)
        }
      }

      console.log(`✨ Successfully migrated: ${stock.title}\n`)
    } catch (error) {
      console.error(`💥 Unexpected error migrating ${stock.slug}:`, error)
    }
  }

  console.log('🎉 Migration completed!')
}

// Run migration
migrateStocks().catch(console.error)

export { migrateStocks }
