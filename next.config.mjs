/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // This fixes the error you see in the terminal
    qualities: [75, 100], 
    // If you are using external images from Unsplash or other sites, add them here too:
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;