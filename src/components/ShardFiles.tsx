import {CodeBlock} from "@/components/CodeBlock";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/Tabs";
import {Shard} from "@/registry/ShardRegister";
import {ReactElement} from "react";

type ShardFilesProps = {
    activeFile:string,
    shard: Shard,
}

export function ShardFiles({activeFile, shard}: ShardFilesProps): ReactElement {
    const files = Object.values(shard.files);

    return <Tabs className="items-center justify-center" defaultValue={activeFile}>
        <TabsList className={`grid w-full grid-cols-${files.length}`}>
            {files.map(
                ({identifier}) => <TabsTrigger key={identifier} value={identifier}>{identifier}</TabsTrigger>
            )}
        </TabsList>
        {files.map(({identifier, path}) => <TabsContent key={identifier} value={identifier}>
            <CodeBlock filePath={path} shard={shard}/>
        </TabsContent>)}
    </Tabs>;
}