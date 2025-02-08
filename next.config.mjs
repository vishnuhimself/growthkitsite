/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // This will serve original images without optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'growthkitapp.com',
      },
    ],
  }
}

export default nextConfig
