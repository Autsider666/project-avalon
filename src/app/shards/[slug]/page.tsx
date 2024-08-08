"use server";

import {CodeSandbox} from "@/components/CodeSandbox";
import {FilesOverview} from "@/components/shards/FilesOverview";
import {SiteName} from "@/constants";
import {fetchShard, fetchShards} from "@/lib/data";
import {PageProps} from "@/lib/types";
import {Metadata} from "next";
import {ReactElement} from "react";

type ShardPageParams = { slug: string };

export default async function ShardPage({params}: PageProps<ShardPageParams>): Promise<ReactElement> {
    const slug = params.slug;
    const shard = await fetchShard(decodeURIComponent(slug));

    return <>
        <CodeSandbox slug={slug}/>
        <FilesOverview shard={shard}/>
    </>;
}

type PageParams = { slug: string };

export async function generateStaticParams(): Promise<PageParams[]> {
    const shards = await fetchShards();

    return shards.map(({name}) => ({
        slug: name,
    }));
}

export async function generateMetadata({params: {slug}}: PageProps<ShardPageParams>): Promise<Metadata> {
    const {name, description, creator} = await fetchShard(decodeURIComponent(slug));

    return {
        title: `Shard: ${name} | ${SiteName}`,
        description,
        creator
    };
}