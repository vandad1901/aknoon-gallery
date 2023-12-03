/** @type {import('next').NextConfig} */
const nextConfig = {images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'trustseal.enamad.ir',
        port: '',
        pathname: '/**',
      },
    ],
  },}

module.exports = nextConfig
