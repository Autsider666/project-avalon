import {fetchShard} from "@/lib/data";
import {PageProps} from "@/lib/types";
import {ReactElement} from "react";

export default async function PlaygroundPage({params: {slug}}: PageProps<{ slug: string }>): Promise<ReactElement> {
    const {exampleScene: Excalibur} = await fetchShard(decodeURIComponent(slug));


    return <main>
        {Excalibur ? <Excalibur /> : undefined}
    </main>;
}