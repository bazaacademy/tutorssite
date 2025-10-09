/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "via.placeholder.com",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "randomuser.me",
      pathname: "/api/portraits/**",
    },
    {
      protocol: "https",
      hostname: "res.cloudinary.com",
      pathname: "/**",
    },
    {
        protocol: 'https',
        hostname: 'cloudinary-marketing-res.cloudinary.com',
      },
  ],
},

};

// export default nextConfig;
module.exports = nextConfig;

