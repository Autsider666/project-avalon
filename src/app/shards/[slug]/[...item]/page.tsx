"use server";

import {CodeSandbox} from "@/components/CodeSandbox";
import {FilesOverview} from "@/components/shards/FilesOverview";
import {SiteName} from "@/constants";
import {fetchShard, fetchShards} from "@/lib/data";
import {PageProps} from "@/lib/types";
import {Shard} from "@/types/Shard";
import {Metadata} from "next";
import {ReactElement} from "react";

type ItemPageParams = { slug: string, item: string[] | string }

export default async function ItemPage({params}: PageProps<ItemPageParams>): Promise<ReactElement> {
    const {shard, activeFile} = await getData(params);

    return <>
        <CodeSandbox slug={params.slug}/>
        <FilesOverview shard={shard} activeFileDomain={activeFile}/>
    </>;
}

async function getData(params: ItemPageParams): Promise<{ shard: Shard, activeFile: string }> {
    const slug = params.slug;
    const shard: Shard = await fetchShard(decodeURIComponent(slug));

    let activeFile = params.item;
    if (Array.isArray(activeFile)) {
        activeFile = activeFile.join('/');
    }

    activeFile = decodeURIComponent(activeFile);

    return {
        shard,
        activeFile,
    };
}

type PageParams = { slug: string, item: string[] };

export async function generateStaticParams(): Promise<PageParams[]> {
    const shards = await fetchShards();

    const params: PageParams[] = [];
    for (const {name, files} of shards) {
        if (files.length <= 1) {
            continue;
        }

        for (const domain of files) {
            params.push({
                slug: name,
                item: domain.split('/'),
            });
        }
    }

    return params;
}

export async function generateMetadata({params}: PageProps<ItemPageParams>): Promise<Metadata> {
    const {shard: {name, description, creator}, activeFile} = await getData(params);

    return {
        title: `Shard: ${name} | ${activeFile} | ${SiteName}`,
        description,
        creator
    };
}