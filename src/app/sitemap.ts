import {generateStaticParams as getShards} from "@/app/shards/[slug]/page";
import {generateStaticParams as getShardItems} from "@/app/shards/[slug]/[...item]/page";
import {BaseUrl} from "@/constants";
import type {MetadataRoute} from 'next';
import type {Languages} from "next/dist/lib/metadata/types/alternative-urls-types";

type SiteMapItem = {
    url: string;
    lastModified?: string | Date;
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
    alternates?: {
        languages?: Languages<string>;
    };
};

function generateShardUrl({slug, item}: {slug:string,item?:string[]}): SiteMapItem {
    let url = `${BaseUrl}/shards/${slug}`;
    for (const element of item ?? []) {
        url+= `/${element}`;
    }

    return {
        url: encodeURI(url)
    };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const shards = await getShards();
    const shardItems = await getShardItems();

    return [
        {
            url: BaseUrl,
            // lastModified: new Date(),
            // changeFrequency: 'weekly',
            // priority: 1, //TODO add later
        },
        {
            url: `${BaseUrl}/shards`,
        },
        ...shards.map((shard) => generateShardUrl(shard)),
        ...shardItems.map((shard) => generateShardUrl(shard)),
        // {
        //     url: `${BaseUrl}/foundry`,
        //     lastModified: new Date(),
        //     changeFrequency: 'monthly',
        //     priority: 0.8,
        // },
        // {
        //     url: 'https://acme.com/blog',
        //     lastModified: new Date(),
        //     changeFrequency: 'weekly',
        //     priority: 0.5,
        // },
    ];
}