/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: ['random.imagecdn.app'],
  },
  async headers() {
    return [
      {
        // Ensure /api/* routes are not pre-rendered
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
