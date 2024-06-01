/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  cleanDistDir: true,
  env: {
    API_URI: 'https://prj-newspaper-admin-site.vercel.app/api/client',
    IMAGE_API_URI: 'https://prj-newspaper-admin-site.vercel.app/api/images'
  }
}

export default nextConfig
