/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  cleanDistDir: true,
  env: {
    API_URI: 'http://localhost:3000/api/client',
    IMAGE_API_URI: 'http://localhost:3000/api/images'
  }
}

export default nextConfig
