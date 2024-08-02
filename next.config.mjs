/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: [
            "@shikijs/twoslash",
        ],
    }
};

export default nextConfig;
