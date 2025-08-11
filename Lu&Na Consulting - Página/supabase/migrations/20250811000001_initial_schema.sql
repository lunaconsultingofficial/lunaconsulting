-- Lu&Na Consulting - Complete Database Schema
-- Execute this in Supabase SQL Editor

-- Create stocks table
CREATE TABLE IF NOT EXISTS stocks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(15,2),
  currency VARCHAR(3) DEFAULT 'EUR',
  short_description TEXT NOT NULL,
  description TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create stock_images table
CREATE TABLE IF NOT EXISTS stock_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stock_id UUID REFERENCES stocks(id) ON DELETE CASCADE,
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create stock_videos table
CREATE TABLE IF NOT EXISTS stock_videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stock_id UUID REFERENCES stocks(id) ON DELETE CASCADE,
  src TEXT NOT NULL,
  title TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create stock_specs table for additional specifications
CREATE TABLE IF NOT EXISTS stock_specs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stock_id UUID REFERENCES stocks(id) ON DELETE CASCADE,
  spec_key VARCHAR(100) NOT NULL,
  spec_value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leads table for tracking inquiries
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  message TEXT,
  stock_id UUID REFERENCES stocks(id) ON DELETE SET NULL,
  source VARCHAR(100) DEFAULT 'website',
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics table for tracking views and interactions
CREATE TABLE IF NOT EXISTS analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type VARCHAR(100) NOT NULL,
  stock_id UUID REFERENCES stocks(id) ON DELETE CASCADE,
  user_session_id VARCHAR(255),
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_stocks_category ON stocks(category);
CREATE INDEX IF NOT EXISTS idx_stocks_featured ON stocks(featured);
CREATE INDEX IF NOT EXISTS idx_stocks_slug ON stocks(slug);
CREATE INDEX IF NOT EXISTS idx_stock_images_stock_id ON stock_images(stock_id);
CREATE INDEX IF NOT EXISTS idx_stock_videos_stock_id ON stock_videos(stock_id);
CREATE INDEX IF NOT EXISTS idx_stock_specs_stock_id ON stock_specs(stock_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_stock_id ON analytics(stock_id);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_stocks_updated_at ON stocks;
CREATE TRIGGER update_stocks_updated_at BEFORE UPDATE ON stocks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE stocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_specs ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read access for stocks" ON stocks;
DROP POLICY IF EXISTS "Public read access for stock_images" ON stock_images;
DROP POLICY IF EXISTS "Public read access for stock_videos" ON stock_videos;
DROP POLICY IF EXISTS "Public read access for stock_specs" ON stock_specs;
DROP POLICY IF EXISTS "Public insert for leads" ON leads;
DROP POLICY IF EXISTS "Public insert for analytics" ON analytics;

-- Create policies for public read access to stocks and related data
CREATE POLICY "Public read access for stocks" ON stocks
    FOR SELECT USING (true);

CREATE POLICY "Public read access for stock_images" ON stock_images
    FOR SELECT USING (true);

CREATE POLICY "Public read access for stock_videos" ON stock_videos
    FOR SELECT USING (true);

CREATE POLICY "Public read access for stock_specs" ON stock_specs
    FOR SELECT USING (true);

-- Create policies for leads (public insert, admin read/update)
CREATE POLICY "Public insert for leads" ON leads
    FOR INSERT WITH CHECK (true);

-- Create policies for analytics (public insert for tracking)
CREATE POLICY "Public insert for analytics" ON analytics
    FOR INSERT WITH CHECK (true);

-- Insert sample data
INSERT INTO stocks (slug, title, category, short_description, description, featured) VALUES
('porsche-911-carrera-pure-driving-emotion', 'Pure Driving Emotion — Porsche 911 Carrera', 'Luxury cars', 'We are offering a limited opportunity to acquire a Porsche 911 Carrera, now available for private ownership.', 'We are offering a limited opportunity to acquire a Porsche 911 Carrera, now available for private ownership. This iconic sports car represents the pinnacle of German engineering and automotive excellence.', true),
('mercedes-benz-refined-performance', 'Mercedes-Benz', 'Luxury cars', 'We are offering the opportunity to privately acquire a Mercedes-Benz, a symbol of refined performance, engineering excellence.', 'We are offering the opportunity to privately acquire a Mercedes-Benz, a symbol of refined performance, engineering excellence, and luxury that has defined automotive standards for generations.', true),
('rolls-royce-phantom-mansory-bespoke', 'Rolls-Royce Phantom by Mansory', 'Luxury cars', 'We are offering a rare opportunity to acquire a bespoke Rolls-Royce Phantom by Mansory.', 'We are offering a rare opportunity to acquire a bespoke Rolls-Royce Phantom by Mansory, now available for private ownership. This is an exclusive chance to possess a vehicle that embodies luxury and craftsmanship at the highest level.', true),
('mercedes-maybach-luxury-redefined', 'Mercedes-Maybach — Luxury Redefined', 'Luxury cars', 'We are pleased to offer a Mercedes-Maybach for private sale — a symbol of absolute comfort, craftsmanship.', 'We are pleased to offer a Mercedes-Maybach for private sale — a symbol of absolute comfort, craftsmanship, and unparalleled luxury. This vehicle represents the pinnacle of automotive excellence and refined sophistication.', false),
('luxury-yacht-exclusive-offering', 'Luxury Yacht — An Exclusive Offering for Discerning Buyers', 'Inventory', 'We are offering a prestigious luxury yacht for sale, available now for private acquisition.', 'We are offering a prestigious luxury yacht for sale, available now for private acquisition. This is an exceptional opportunity for discerning buyers who appreciate the finest in maritime luxury and craftsmanship.', true),
('koenigsegg-jesko-2025-white-hypercar', '2025 Koenigsegg Jesko (White) — The Pinnacle of Hypercar Engineering', 'Luxury cars', 'We are pleased to present an exclusive opportunity to acquire a 2025 Koenigsegg Jesko, finished in pristine white.', 'We are pleased to present an exclusive opportunity to acquire a 2025 Koenigsegg Jesko, finished in a stunning white livery. This represents the pinnacle of hypercar engineering and Swedish automotive innovation.', true),
('ferrari-daytona-sp3-2024-grigio', '2024 Ferrari Daytona SP3 (Grigio Finish)', 'Luxury cars', 'A Masterpiece from Ferrari''s Exclusive Icona Series. We are offering an exceptional opportunity to acquire a 2024 Ferrari Daytona SP3.', 'A Masterpiece from Ferrari''s Exclusive Icona Series. We are offering an exceptional opportunity to acquire a 2024 Ferrari Daytona SP3 in sophisticated Grigio finish. This limited-edition supercar represents Ferrari''s heritage and cutting-edge technology.', false),
('brabus-vehicle-stock-exclusive', 'Brabus Vehicle Stock — Exclusive Opportunity', 'Luxury cars', 'We are currently seeking a qualified buyer for an exclusive stock of Brabus-enhanced vehicles.', 'We are currently seeking a qualified buyer for an exclusive stock of Brabus-enhanced vehicles, built on premium Mercedes-Benz platforms. These vehicles represent the ultimate in performance tuning and luxury enhancement.', false)
ON CONFLICT (slug) DO NOTHING;

-- Insert stock images
WITH stock_data AS (
  SELECT id, slug FROM stocks
)
INSERT INTO stock_images (stock_id, src, alt, sort_order)
SELECT 
  s.id,
  '/website_images/porsche_911_carrera.jpeg',
  'Porsche 911 Carrera - Pure Driving Emotion',
  0
FROM stock_data s WHERE s.slug = 'porsche-911-carrera-pure-driving-emotion'

UNION ALL

SELECT 
  s.id,
  '/website_images/mercedes_benz.jpeg',
  'Mercedes-Benz - Refined Performance',
  0
FROM stock_data s WHERE s.slug = 'mercedes-benz-refined-performance'

UNION ALL

SELECT 
  s.id,
  '/nadiua_media/07d64327-1469-4591-8dcd-7e63cd34f9a0-1-300x300.jpg',
  'Rolls-Royce Phantom by Mansory',
  0
FROM stock_data s WHERE s.slug = 'rolls-royce-phantom-mansory-bespoke'

UNION ALL

SELECT 
  s.id,
  '/nadiua_media/IMG-20250308-WA0001.jpg',
  'Rolls-Royce Phantom - Interior Detail',
  1
FROM stock_data s WHERE s.slug = 'rolls-royce-phantom-mansory-bespoke'

UNION ALL

SELECT 
  s.id,
  '/website_images/mercedes_maybach.png',
  'Mercedes-Maybach - Luxury Redefined',
  0
FROM stock_data s WHERE s.slug = 'mercedes-maybach-luxury-redefined'

UNION ALL

SELECT 
  s.id,
  '/website_images/luxury_yacht.png',
  'Luxury Yacht - Exclusive Offering',
  0
FROM stock_data s WHERE s.slug = 'luxury-yacht-exclusive-offering'

UNION ALL

SELECT 
  s.id,
  '/website_images/koenigsegg_jesko.png',
  '2025 Koenigsegg Jesko White - The Pinnacle of Hypercar Engineering',
  0
FROM stock_data s WHERE s.slug = 'koenigsegg-jesko-2025-white-hypercar'

UNION ALL

SELECT 
  s.id,
  '/website_images/ferrari_daytona_sp3.jpeg',
  '2024 Ferrari Daytona SP3 Grigio Finish',
  0
FROM stock_data s WHERE s.slug = 'ferrari-daytona-sp3-2024-grigio'

UNION ALL

SELECT 
  s.id,
  '/website_images/brabus_vehicle_stock.jpeg',
  'Brabus Vehicle Stock - Exclusive Opportunity',
  0
FROM stock_data s WHERE s.slug = 'brabus-vehicle-stock-exclusive'

ON CONFLICT DO NOTHING;

-- Insert stock videos for Rolls-Royce and Koenigsegg
WITH stock_data AS (
  SELECT id, slug FROM stocks
)
INSERT INTO stock_videos (stock_id, src, title, sort_order)
SELECT 
  s.id,
  '/nadiua_media/2025-03-09-223652819 - copia.mp4',
  'Rolls-Royce Phantom by Mansory - Video 1',
  0
FROM stock_data s WHERE s.slug = 'rolls-royce-phantom-mansory-bespoke'

UNION ALL

SELECT 
  s.id,
  '/nadiua_media/VID-20250308-WA0066.mp4',
  'Rolls-Royce Phantom by Mansory - Video 2',
  1
FROM stock_data s WHERE s.slug = 'rolls-royce-phantom-mansory-bespoke'

UNION ALL

SELECT 
  s.id,
  '/nadiua_media/2025-03-09-223652819.mp4',
  '2025 Koenigsegg Jesko - Performance Video',
  0
FROM stock_data s WHERE s.slug = 'koenigsegg-jesko-2025-white-hypercar'

ON CONFLICT DO NOTHING;
