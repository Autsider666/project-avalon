import {CopyCodeButton} from "@/components/CopyCodeButton";
import {ReactElement, ReactNode} from "react";
import {BundledLanguage, BundledTheme, codeToHtml} from "shiki";

type ShikiCodeBlockProps = {
    fileName?: ReactNode,
    code: string,
    language?: BundledLanguage,
    theme?: BundledTheme,
}

export async function ShikiCodeBlock({
                                         fileName,
                                         code,
                                         language = "typescript",
                                         theme = "ayu-dark",
                                     }: ShikiCodeBlockProps): Promise<ReactElement> {
    // noinspection ES6RedundantAwait
    const html = await codeToHtml(code, {
        lang: language,
        theme,
    });

    return <fieldset className="relative grid gap-6 rounded-lg border m-1">
        <legend className="ml-1 px-1 text-sm font-medium z-10">
            {fileName}
        </legend>
        <div className="absolute -top-4 right-2 z-10"><CopyCodeButton code={code}/></div>
        <div className="-mt-2 z-0" dangerouslySetInnerHTML={{__html: html}}></div>
    </fieldset>;
}