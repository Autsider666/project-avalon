"use server";

import {fetchShard, fetchShards} from "@/lib/data";
import {PageProps} from "@/lib/types";
import {ReactElement} from "react";

export default async function PlaygroundPage({params: {slug}}: PageProps<{ slug: string }>): Promise<ReactElement> {
    const {example} = await fetchShard(decodeURIComponent(slug), true);

    const ExampleComponent = example?.component;

    return <main>
        {ExampleComponent ? <ExampleComponent/> : 'No example found.'}
    </main>;
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