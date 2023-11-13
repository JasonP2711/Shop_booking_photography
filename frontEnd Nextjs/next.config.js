/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "upload.wikimedia.org",
      "project-booking-photography-final.onrender.com",
      "shop-booking-photography.vercel.app",
    ],

    loader: "default",
  },
};

module.exports = nextConfig;
