import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    "http://localhost:3000",       // Local development URL
    "http://192.168.100.39",       // Your local network IP (if accessing locally)
    "https://your-deployed-url.com", // Add your deployed URL here
  ],
};

export default nextConfig;
