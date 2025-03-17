/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/sign-in",
        destination: "/",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  // Fixes the bcrypt and other Node.js native modules issue
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't bundle server-only modules in client-side bundles
      config.resolve.fallback = {
        ...config.resolve.fallback,
        bcrypt: false,
        fs: false,
        path: false,
        os: false,
        crypto: false,
      };
    }
    return config;
  },
  // For enhanced security in production
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
