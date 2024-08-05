"use server";

import {CodeBlock} from "@/components/CodeBlock";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/Card";
import {Combobox} from "@/components/ui/Combobox";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/Command";
import {cn} from "@/lib/utils";
import {Shard} from "@/registry/ShardRegister";
import Link from "next/link";
import {redirect} from "next/navigation";
import {ReactElement} from "react";

type ShardFilesProps = {
    activeFile?: string,
    shard: Shard,
}

export async function ShardFiles({activeFile, shard}: ShardFilesProps): Promise<ReactElement> {
    const files = Object.values(shard.files);

    activeFile = activeFile ?? Object.values(shard.files)[0].domain;

    const handleSelect = async (domain: string): Promise<void> => {
        "use server";

        redirect(`/shards/${shard.name}/${domain}`);
    };

    return <div id="tabs" className="items-center justify-center">
        <div id="tabList"
             className={`grid w-full grid-cols-${files.length} h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground grid w-full grid-cols-3`}>
            {files.map(
                ({identifier, domain}) => <Link
                    href={`/shards/${shard.name}/${domain}`}
                    key={identifier}
                    className={cn(
                        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
                    )}
                    data-state={domain === activeFile ? 'active' : 'inactive'}
                >{identifier}</Link>
            )}
        </div>
        <div id="tabContent"
             className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Combobox
                items={Object.values(shard.files).map(({identifier, domain}) => ({label: identifier, value: domain}))}
                defaultValue={activeFile}
                onSelect={handleSelect}
                className="w-80 mt-5"
            />
            <Card className="w-80 my-5">
                <CardHeader>
                    <CardTitle>Files</CardTitle>
                </CardHeader>
                <CardContent>
                    <Command>
                        <CommandInput placeholder="Search file..."/>
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading="Files">
                                {Object.values(shard.files).map(
                                    ({identifier, domain}) => (
                                        <CommandItem
                                            key={domain}
                                            value={domain}
                                            onSelect={handleSelect}
                                        >{identifier}</CommandItem>
                                    ))
                                }
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </CardContent>
            </Card>
            <CodeBlock filePath={shard.files[activeFile].path} shard={shard}/>
        </div>
    </div>;

    // {/*<Tabs className="items-center justify-center"*/}
    // {/*      defaultValue={activeFile}*/}
    // {/*      orientation={"vertical"}*/}
    // {/*>*/}
    // {/*    <TabsList className={`grid w-full grid-cols-${files.length}`}>*/}
    // {/*        {files.map(*/}
    // {/*            ({identifier}) => <TabsTrigger key={identifier} value={identifier}>{identifier}</TabsTrigger>*/}
    // {/*        )}*/}
    // {/*    </TabsList>*/}
    // {/*    {files.map(({identifier, path}) => <TabsContent key={identifier} value={identifier}>*/}
    // {/*        <CodeBlock filePath={path} shard={shard}/>*/}
    // {/*    </TabsContent>)}*/}
    // {/*</Tabs>*/}
}