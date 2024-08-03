// import {ShikiCodeBlock} from "@/components/ShikiCodeBlock";
import {ShikiCodeBlock} from "@/components/ShikiCodeBlock";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/Tooltip";
// import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/Tooltip";
import {getCode} from "@/hooks/getCode";
import {ReactElement} from "react";

import SyntaxHighlighter from 'react-syntax-highlighter';
import {darcula} from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism';
// import {darcula} from 'react-syntax-highlighter/dist/esm/styles/prism';
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

    // return <fieldset className="relative grid gap-6 rounded-lg border m-1">
    //     <legend className="ml-1 px-1 text-sm font-medium z-10">
    //         {name}
    //     </legend>
    //     <SyntaxHighlighter
    //         language={extension}
    //         style={darcula}
    //         // wrapLines={true}
    //         wrapLongLines={true}
    //         showLineNumbers={true}
    //         customStyle={{
    //             // width: '100%',
    //             // whiteSpace: 'pre-wrap',
    //         }}
    //     >
    //         {code}
    //     </SyntaxHighlighter>
    // </fieldset>;

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