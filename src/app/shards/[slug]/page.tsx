"use server";

import {FilesOverview} from "@/components/shards/FilesOverview";
import {fetchShard, fetchShards} from "@/lib/data";
import {PageProps} from "@/lib/types";
import {Shard} from "@/registry/shards";
import {redirect} from "next/navigation";
import {ReactElement} from "react";

export default async function ShardPage({params}: PageProps<{ slug: string }>): Promise<ReactElement> {
    const slug = params.slug;
    let shard: Shard | undefined;

    try {
        shard = await fetchShard(decodeURIComponent(slug));
    } catch (e) {
        redirect('/shards');
    }

    return <FilesOverview shard={shard}/>;
}

type PageParams = { slug: string };

export async function generateStaticParams(): Promise<PageParams[]> {
    const shards = await fetchShards();

    return shards.map(({name}) => ({
        slug: name,
    }));
}