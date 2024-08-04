"use server";

import {CodeTooltip} from "@/components/CodeTooltip";
import {CopyCodeButton} from "@/components/CopyCodeButton";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/Tooltip";
import {getFile} from "@/hooks/getFile";
import {Shard} from "@/registry/ShardRegister";
import parse, {Element, HTMLReactParserOptions} from "html-react-parser";
import {ReactElement} from "react";
import {BundledLanguage, codeToHtml, ShikiTransformer} from "shiki";
import {bundledLanguages} from "shiki/langs";

function isBundledLanguage(extension: string): extension is BundledLanguage {
    return Object.keys(bundledLanguages).includes(extension) !== undefined;
}

type CodeBlockProps = {
    filePath: string,
    shard: Shard,
    popover?: boolean,
}

export async function CodeBlock({filePath, shard, popover = true}: CodeBlockProps): Promise<ReactElement> {
    const {name, path, code, extension} = await getFile(filePath);

    if (!isBundledLanguage(extension)) {
        throw new Error('Invalid extension: ' + extension);
    }

    const {renderToString} = await import('react-dom/server');

    const transformers: ShikiTransformer[] = [];
    if (popover) {
        transformers.push({
            postprocess(html, line) {
                return html.replaceAll(
                    /"(@\/[\w\/]*)"/gm,
                    (match) => renderToString(<span data-popover={match}>{match}</span>),
                    // (match) => renderToString(<CodeTooltip match={match}/>),
                );
            }
        });
    }

    // noinspection ES6RedundantAwait
    const html = await codeToHtml(code, {
        lang: extension,
        theme: "ayu-dark",
        transformers,
    });

    const elements = parse(html, {
        replace(domNode) {
            if (!(domNode instanceof Element)) {
                return;
            }

            const popover = domNode.attribs['data-popover'];
            if (!popover) {
                return;
            }

            return <CodeTooltip match={popover} shard={shard} extension={extension}/>;
        },
    } satisfies HTMLReactParserOptions);

    return <fieldset className="relative grid gap-6 rounded-lg border m-1">
        <legend className="ml-1 px-1 text-sm font-medium z-10">
            <Tooltip>
                <TooltipTrigger>{name}</TooltipTrigger>
                <TooltipContent>{path}</TooltipContent>
            </Tooltip>
        </legend>
        <div className="absolute -top-4 right-2 z-10">
            <CopyCodeButton code={code}/>
        </div>
        <div className="-mt-2 z-0">
            {elements}
        </div>
    </fieldset>;

    // return <ShikiCodeBlock fileName={
    //     <Tooltip>
    //         <TooltipTrigger>{name}</TooltipTrigger>
    //         <TooltipContent>{path}</TooltipContent>
    //     </Tooltip>
    // }
    //                        code={code}
    //                        language={extension}
    //                        popover={popover}
    //                        shard={shard}
    // />;
}