/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  redirects: async () => [
    {
      source: '/',
      destination: '/dashboard',
      permanent: false, 
    },
  ],
  rewrites: async () => [
    {
      source: '/',
      destination: '/dashboard', 
    },
  ],
}

export default nextConfig
