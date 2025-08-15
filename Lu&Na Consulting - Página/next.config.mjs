/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suppress clipboard API warnings in development
  webpack: (config, { dev }) => {
    if (dev) {
      config.infrastructureLogging = {
        level: 'error',
      }
    }
    return config
  },
  
  // Disable dev overlay copy functionality to prevent clipboard errors
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  }
}

export default nextConfig
