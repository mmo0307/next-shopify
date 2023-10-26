/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
        SHOPIFY_STORE_API_KEY: process.env.SHOPIFY_STORE_API_KEY,
        SHOPIFY_STORE_API_SECRET_KEY: process.env.SHOPIFY_STORE_API_SECRET_KEY
    },
    images: {
        domains: ['cdn.shopify.com'],
    }
}

module.exports = nextConfig
