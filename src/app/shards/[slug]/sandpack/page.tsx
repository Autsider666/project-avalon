"use server";

import {CodeSandbox} from "@/components/CodeSandbox";
import {fetchShards} from "@/lib/data";
import {PageProps} from "@/lib/types";
import {ReactElement} from "react";

export default async function SandPackPage({params: {slug}}: PageProps<{ slug: string }>): Promise<ReactElement> {

    return (<main>
        <div className="h-full w-full">
            <CodeSandbox slug={slug}/>
        </div>
    </main>);
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