/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
    env: {
        mongodb_username: 'gideon100',
        mongodb_password: '140993',
        mongodb_db: 'eventspage-newsletter',
        // NEXTAUTH_URL: 'https://localhost:3000',
        NEXTAUTH_URL: 'https://invoiceapp234.netlify.app/',
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET
    },
}

module.exports = nextConfig
