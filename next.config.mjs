/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    API_URI: '/api',
    IMAGE_API_URI: '/api/images'
  }
}

export default nextConfig
