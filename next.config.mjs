/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/login',
          permanent: false, // Set to `true` if you want this to be a permanent redirect (HTTP 308)
        },
      ];
    },
  };
  
  export default nextConfig;
  