import { withPayload } from '@payloadcms/next/withPayload'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      // Map NEXT_PUBLIC_SERVER_URL to image remote patterns
      new URL(NEXT_PUBLIC_SERVER_URL).hostname, // Get hostname from the base URL
    ].map((_hostname) => {
      const url = new URL(NEXT_PUBLIC_SERVER_URL) // Use the same base URL
      return {
        hostname: url.hostname,
        protocol: url.protocol.replace(':', ''),
        // Pathname is intentionally left general as Payload handles specifics for /api/media
        pathname: '/api/media/**', // This covers /api/media/file/ and other sub-paths
      }
    }),
  },
  reactStrictMode: true,
  // Add redirects here if you have them from your template
  // redirects, // Uncomment if you import redirects

  // Keep your webpack config if it's necessary for your project
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
