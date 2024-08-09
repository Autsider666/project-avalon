import {CodeTooltip} from "@/components/CodeTooltip";
import {isBundledLanguage} from "@/lib/type-check";
import {Shard} from "@/types/Shard";
import {transformerRemoveLineBreak} from "@shikijs/transformers";
import parse, {Element, HTMLReactParserOptions} from "html-react-parser";
import {ReactElement, ReactNode} from "react";
import {codeToHtml as shikiCodeToHtml, ShikiTransformer} from "shiki";

export type CodeReplacer = (
    element: Element,
    index: number,
) => ReactElement | string | null | boolean | object | void;

type Options = Readonly<{
    transformers?: ShikiTransformer[],
    replacers?: CodeReplacer[],
    popover?: boolean,
    useLineNumbers?: boolean,
    minLine?: number,
    maxLine?: number,
}>

export const getPopoverReplacer: (shard: Shard, language: string) => CodeReplacer =
    // eslint-disable-next-line react/display-name
    (shard, language): CodeReplacer => (element) => {
        const popover = element.attribs['data-popover'];
        if (popover) {
            return <CodeTooltip match={popover} shard={shard} language={language}/>;
        }
    };

type BaseTransformerOptions = {
    popover?: boolean,
    preClassName?: string,
    codeClassName?: string,
}

function getBaseTransformer({
                                popover,
                                preClassName,
                                codeClassName,
                            }: BaseTransformerOptions): ShikiTransformer {
    const transformer: ShikiTransformer = {};
    if (preClassName) {
        transformer.pre = function (element): void {
            this.addClassToHast(element, preClassName);
        };
    }

    if (codeClassName) {
        transformer.code = function (element): void {
            this.addClassToHast(element, codeClassName);
        };
    }

    if (popover) {
        transformer.postprocess = function (html, line) {
            return html.replaceAll(
                /"(@(?:avalon)?\/[\w\/]*)"/gm,
                (match): string => `<span data-popover=${match}>${match}</span>`,
            );
        };
    }

    return transformer;
}

export async function codeToHtml(
    code: string,
    language: string,
    {
        transformers: optionsTransformers = [],
        popover = true,
        useLineNumbers = true,
        minLine = 0,
        maxLine = 0,
        replacers = [],
    }: Options,
): Promise<ReactNode> {
    if (!isBundledLanguage(language)) {
        throw new Error('Invalid language: ' + language);
    }

    const transformers: ShikiTransformer[] = [
        ...optionsTransformers,
        transformerRemoveLineBreak(),
        getBaseTransformer({
            popover,
            preClassName: 'whitespace-pre-wrap rounded-lg px-4',
        }),
    ];

    // noinspection ES6RedundantAwait
    const html = await shikiCodeToHtml(code, {
        lang: language,
        theme: "ayu-dark",
        transformers,
    });

    let lineNumber: number = 0;
    return parse(html, {
        replace(element, index) {
            if (!(element instanceof Element)) {
                return;
            }

            for (const replacer of replacers) {
                const result = replacer(element, index);
                if (result) {
                    return result;
                }
            }
        },
        transform(reactNode, element, index): ReactElement | string | void {
            if (!(element instanceof Element)) {
                return reactNode as string;
            }

            if (element.attribs['class']?.includes('line')) {
                lineNumber++;
                if ((minLine > 0 && lineNumber < minLine) || (maxLine > minLine && lineNumber > maxLine)) {
                    return <></>;
                }

                return <div key={index} className="table-row *:first:pt-5 *:last:pb-2">
                    {useLineNumbers ? <div className="table-cell w-12 text-right pr-6 text-muted-foreground border-r-2">
                        {lineNumber}
                    </div> : undefined}
                    {useLineNumbers ? <span className="table-cell w-2"></span> : undefined}
                    {reactNode}
                </div>;
            }

            return reactNode as string;
        }
    } satisfies HTMLReactParserOptions);
}