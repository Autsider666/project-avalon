"use server";

import {CodeBlock} from "@/components/CodeBlock";
import {CopyCodeButton} from "@/components/CopyCodeButton";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/Card";
import {Combobox} from "@/components/ui/Combobox";
import {getFile} from "@/hooks/getFile";
import {Shard} from "@/registry/ShardRepository";
import {ChevronDown} from "lucide-react";
import {redirect} from "next/navigation";
import {ReactElement} from "react";

type ShardFilesProps = {
    activeFileIdentifier?: string,
    shard: Shard,
}

export async function FilesOverview({activeFileIdentifier, shard}: ShardFilesProps): Promise<ReactElement> {
    activeFileIdentifier = activeFileIdentifier ?? shard.files[0].domain;

    const activeFile = shard.files.find(({domain}) => domain === activeFileIdentifier);
    if (!activeFile) {
        throw new Error('Handle better asap!'); //FIXME
    }

    const handleSelect = async (domain: string): Promise<void> => {
        "use server";

        redirect(`/shards/${shard.name}/${domain}`);
    };

    const {code, extension: language, path} = await getFile(activeFile.path);

    return <Card className="items-center justify-center">
        <CardHeader>
            <CardTitle className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                    <Combobox
                        items={Object.values(shard.files).map(({identifier, domain, code}) => ({
                            label: identifier,
                            value: domain,
                            keywords: [code, domain],
                        }))}
                        defaultValue={activeFileIdentifier}
                        onSelect={handleSelect}
                        popoverClassName="w-fit"
                        triggerClassName="w-fit text-2xl font-bold first:*:underline first:*:decoration-dotted last:*:button"
                        triggerVariant="ghost"
                        icon={<ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>}
                        canUnselect={false}
                    />
                </div>
                <CopyCodeButton code={code}/>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <CodeBlock code={code} language={language} shard={shard} path={path}/>
        </CardContent>
    </Card>;
}