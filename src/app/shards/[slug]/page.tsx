"use server";

import {CodeSandbox} from "@/components/CodeSandbox";
import {FilesOverview} from "@/components/shards/FilesOverview";
import {fetchShard, fetchShards} from "@/lib/data";
import {PageProps} from "@/lib/types";
import {ReactElement} from "react";

export default async function ShardPage({params}: PageProps<{ slug: string }>): Promise<ReactElement> {
    const slug = params.slug;
    const shard = await fetchShard(decodeURIComponent(slug));

    return <>
        <FilesOverview shard={shard}/>
        <CodeSandbox slug={slug}/>
    </>;
}

type PageParams = { slug: string };

export async function generateStaticParams(): Promise<PageParams[]> {
    const shards = await fetchShards();

    return shards.map(({name}) => ({
        slug: name,
    }));
}