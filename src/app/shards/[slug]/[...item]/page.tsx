import {FilesOverview} from "@/components/shards/FilesOverview";
import {fetchShard} from "@/lib/data";
import {PageProps} from "@/lib/types";
import {Shard} from "@/registry/ShardRepository";
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

    return <FilesOverview shard={shard} activeFileIdentifier={activeFile}/>;
}