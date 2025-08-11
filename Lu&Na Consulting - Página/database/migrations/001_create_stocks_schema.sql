-- Create stocks table
CREATE TABLE stocks (
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
CREATE TABLE stock_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stock_id UUID REFERENCES stocks(id) ON DELETE CASCADE,
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create stock_videos table
CREATE TABLE stock_videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stock_id UUID REFERENCES stocks(id) ON DELETE CASCADE,
  src TEXT NOT NULL,
  title TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create stock_specs table for additional specifications
CREATE TABLE stock_specs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stock_id UUID REFERENCES stocks(id) ON DELETE CASCADE,
  spec_key VARCHAR(100) NOT NULL,
  spec_value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leads table for tracking inquiries
CREATE TABLE leads (
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
CREATE TABLE analytics (
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
CREATE INDEX idx_stocks_category ON stocks(category);
CREATE INDEX idx_stocks_featured ON stocks(featured);
CREATE INDEX idx_stocks_slug ON stocks(slug);
CREATE INDEX idx_stock_images_stock_id ON stock_images(stock_id);
CREATE INDEX idx_stock_videos_stock_id ON stock_videos(stock_id);
CREATE INDEX idx_stock_specs_stock_id ON stock_specs(stock_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at);
CREATE INDEX idx_analytics_event_type ON analytics(event_type);
CREATE INDEX idx_analytics_stock_id ON analytics(stock_id);
CREATE INDEX idx_analytics_created_at ON analytics(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_stocks_updated_at BEFORE UPDATE ON stocks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE stocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_specs ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

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
