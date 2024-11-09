/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,  
  output: 'export',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_GITHUB_TOKEN: process.env.GITHUB_TOKEN
  },
};

export default nextConfig;
