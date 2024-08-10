import nextMDX from '@next/mdx';
import rehypeShiki from "@shikijs/rehype";

/** @type {import('@shikijs/rehype').RehypeShikiOptions} */
const shikiOptions = {
    langs: ['ts', 'tsx', 'js', 'jsx', 'css'],
    theme: "ayu-dark",
}

const withMDX = nextMDX({
    options: {
        remarkPlugins: [],
        rehypePlugins: [
            [rehypeShiki, shikiOptions]
        ],
    }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['mdx', 'tsx', 'ts'],
    reactStrictMode: true,
};

export default withMDX(nextConfig);
