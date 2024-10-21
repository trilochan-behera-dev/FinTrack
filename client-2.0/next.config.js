/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Add the following export configuration
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      // Add other paths if needed
    };
  },
}

module.exports = nextConfig
