import {ShikiCodeBlock} from "@/components/ShikiCodeBlock";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/Tooltip";
import {getCode} from "@/hooks/getCode";
import {ReactElement} from "react";
import {BundledLanguage} from "shiki";
import {bundledLanguages} from "shiki/langs";

function isBundledLanguage(extension: string): extension is BundledLanguage {
    return Object.keys(bundledLanguages).includes(extension) !== undefined;
}

type CodeBlockProps = {
    filePath: string,
}

export async function CodeBlock({filePath}: CodeBlockProps): Promise<ReactElement> {
    const {name, path, code, extension} = await getCode(filePath);

    if (!isBundledLanguage(extension)) {
        throw new Error('Invalid extension: ' + extension);
    }

    return <ShikiCodeBlock fileName={
        <Tooltip>
            <TooltipTrigger>{name}</TooltipTrigger>
            <TooltipContent>{path}</TooltipContent>
        </Tooltip>
    }
                           code={code}
                           language={extension}
    />;
}