/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    API_URI: 'http://localhost:4200',
    IMAGE_API_URI: 'http://localhost:3000'
  }
}

export default nextConfig
