/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow cross-origin requests from Builder.io preview
  allowedDevOrigins: ['faf33bf796a24199b5278736222c39f1-8068d4492d2d4c849045b4517.fly.dev'],

  // Disable React DevTools and suppress clipboard warnings
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Reduce logging noise
      config.infrastructureLogging = {
        level: 'error',
      }
      
      // Suppress specific warnings
      config.ignoreWarnings = [
        /Clipboard API/,
        /writeText/,
        /NotAllowedError/,
        /permissions policy/,
      ]
    }
    return config
  },
  
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  
  // Reduce bundle size
  experimental: {
    optimizePackageImports: [
      'lucide-react', 
      'framer-motion',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu'
    ],
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Headers to improve security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // Explicitly block clipboard API to prevent errors
          {
            key: 'Permissions-Policy',
            value: 'clipboard-write=(), clipboard-read=()',
          },
        ],
      },
    ]
  },
  
  // Disable source maps in development to reduce memory usage
  productionBrowserSourceMaps: false,
  
  // Optimize for performance
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
}

export default nextConfig
