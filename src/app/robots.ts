import {BaseUrl} from "@/constants";
import type {MetadataRoute} from 'next';

export default async function robots(): Promise<MetadataRoute.Robots> {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: `${BaseUrl}/sitemap.xml`,
    };
}