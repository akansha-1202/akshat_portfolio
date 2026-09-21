/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/akshat-portfolio/**",
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
