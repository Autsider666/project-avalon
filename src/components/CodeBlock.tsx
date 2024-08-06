"use server";

import {codeToHtml, getPopoverReplacer} from "@/lib/CodeToHtml";
import {Shard} from "@/registry/Repository/ShardRepository";
import {ReactElement} from "react";

type CodeBlockProps = {
    path: string,
    code: string,
    language: string,
    shard: Shard,
    popover?: boolean,
}

export async function CodeBlock({code, language, shard, path, popover = true}: CodeBlockProps): Promise<ReactElement> {
    const reactElements = await codeToHtml(code, language, {
        popover,
        replacers: popover ? [
            getPopoverReplacer(shard, language),
        ] : undefined,
    });

    return <fieldset className="relative grid gap-6 rounded-lg border m-1 text-sm">
        <legend className="absolute -top-2.5 left-20 text-sm font-medium text-muted-foreground">
            {path}
        </legend>
        {reactElements}
    </fieldset>;
}