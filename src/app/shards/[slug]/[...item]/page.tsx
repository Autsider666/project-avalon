import {FilesOverview} from "@/components/shards/FilesOverview";
import {fetchShard, fetchShards} from "@/lib/data";
import {PageProps} from "@/lib/types";
import {Shard} from "@/registry/Repository/ShardRepository";
import {redirect} from "next/navigation";
import {ReactElement} from "react";

export default async function ItemPage({params}: PageProps): Promise<ReactElement> {
    const slug = params?.slug;
    if (!slug) {
        redirect('/shards');
    }

    let shard: Shard | undefined;

    try {
        shard = await fetchShard(decodeURIComponent(slug));
    } catch (e) {
        redirect('/shards');
    }

    let activeFile = params.item;
    if (!activeFile) {
        redirect(`/shards/${slug}`);
    }

    if (Array.isArray(activeFile)) {
        activeFile = activeFile.join('/');
    }

    activeFile = decodeURIComponent(activeFile);

    return <>
        <FilesOverview shard={shard} activeFileIdentifier={activeFile}/>
    </>;
}

type PageParams = { slug: string, item: string[] };

export async function generateStaticParams(): Promise<PageParams[]> {
    const shards = await fetchShards();

    const params: PageParams[] = [];
    for (const {name, files} of shards) {
        for (const {domain} of files) {
            params.push({
                slug: name,
                item: domain.split('/'),
            });
        }
    }

    return params;
}