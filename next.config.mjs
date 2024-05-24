/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URI: 'http://localhost:3000/api',
    IMAGE_API_URI: 'http://localhost:3000/api/images'
  },
}

export default nextConfig
