import {FilesOverview} from "@/components/shards/FilesOverview";
import {fetchShard} from "@/lib/data";
import {PageProps} from "@/lib/types";
import {Shard} from "@/registry/Repository/ShardRepository";
import {redirect} from "next/navigation";
import {ReactElement} from "react";

export default async function ShardPage({params}: PageProps<{ file?: string }>): Promise<ReactElement> {
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

    return <FilesOverview shard={shard}/>;
}