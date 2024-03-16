/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
        FRONT_BASE_URL: process.env.FRONT_BASE_URL,
    },
};

export default nextConfig;
