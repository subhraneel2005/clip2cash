import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com"
      }
    ]
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), {
        'fluent-ffmpeg': 'commonjs fluent-ffmpeg',
        'ffmpeg-static': 'commonjs ffmpeg-static',
        'ffprobe-static': 'commonjs ffprobe-static'
      }];
    }
    return config;
  },
  // Add CORS headers for FFmpeg
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
