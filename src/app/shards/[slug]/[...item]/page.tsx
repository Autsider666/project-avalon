import {FilesOverview} from "@/components/shards/FilesOverview";
import {fetchShard, fetchShards} from "@/lib/data";
import {PageProps} from "@/lib/types";
import {Shard} from "@/registry/shards";
import {ReactElement} from "react";

export default async function ItemPage({params}: PageProps<{ slug: string, item: string }>): Promise<ReactElement> {
    const slug = params.slug;
    const shard: Shard = await fetchShard(decodeURIComponent(slug));

    let activeFile = params.item;
    if (Array.isArray(activeFile)) {
        activeFile = activeFile.join('/');
    }

    activeFile = decodeURIComponent(activeFile);

    return <>
        <FilesOverview shard={shard} activeFileDomain={activeFile}/>
    </>;
}

type PageParams = { slug: string, item: string[] };

export async function generateStaticParams(): Promise<PageParams[]> {
    const shards = await fetchShards();

    const params: PageParams[] = [];
    for (const {name, files} of shards) {
        for (const domain of files) {
            params.push({
                slug: name,
                item: domain.split('/'),
            });
        }
    }

    return params;
}