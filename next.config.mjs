const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https', // Cloudinary 도메인 추가
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // 'experimental' 옵션에서 'serverExternalPackages' 제거
}

export default nextConfig
