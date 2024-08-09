"use client";

import {Button, buttonVariants} from "@/components/ui/Button";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/Tooltip";
import {cn} from "@/lib/utils";
import {UnstyledOpenInCodeSandboxButton, useSandpack} from "@codesandbox/sandpack-react";
import {CheckIcon, CopyIcon, ListRestartIcon, SquareArrowOutUpRightIcon} from "lucide-react";
import {ReactElement, useEffect, useState} from "react";

type TitleBarProps = {
    title: string,
}

export function TitleBar({title}: TitleBarProps): ReactElement {
    const [hasCopied, setHasCopied] = useState<boolean>(false);
    const {sandpack} = useSandpack();
    const {resetAllFiles, activeFile, files} = sandpack;

    useEffect(() => {
        setTimeout(() => {
            setHasCopied(false);
        }, 2000);
    }, [hasCopied]);

    return <div className="mb-0 flex items-center justify-between pl-3 pr-1 pt-1 pb-2 sm:rounded-t-lg w-full"
                style={{backgroundColor: '#151515'}}>
        <span className="text-xl font-bold text-muted-foreground w-full">{title}</span>
        <div className="align-center flex gap-1 pt-1 pr-1">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        onClick={() => {
                            navigator.clipboard.writeText(files[activeFile].code);

                            setHasCopied(true);
                        }}
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                    >
                        {hasCopied
                            ? <CheckIcon className="w-4 h-4 text-muted-foreground"/>
                            : <CopyIcon className="w-4 h-4 text-muted-foreground"/>}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    {hasCopied ? 'Active file copied!' : ' Copy active file'}
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        onClick={() => resetAllFiles()}
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                    >
                        <ListRestartIcon className="w-5 h-5 text-muted-foreground"/>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    Reset all files
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <UnstyledOpenInCodeSandboxButton
                    title={undefined}
                    className={cn(buttonVariants({variant: 'outline', size: 'icon', className: 'h-7 w-7'}))}
                >
                    <TooltipTrigger asChild>
                        <SquareArrowOutUpRightIcon className="w-4 h-4 text-muted-foreground"/>
                    </TooltipTrigger>
                </UnstyledOpenInCodeSandboxButton>
                <TooltipContent>
                    Open in CodeSandbox
                </TooltipContent>
            </Tooltip>
        </div>
    </div>;
}