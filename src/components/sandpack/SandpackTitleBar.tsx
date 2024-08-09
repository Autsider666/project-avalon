"use client";

import {Button, buttonVariants} from "@/components/ui/Button";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/Tooltip";
import {cn} from "@/lib/utils";
import {UnstyledOpenInCodeSandboxButton, useSandpack} from "@codesandbox/sandpack-react";
import {ListRestartIcon, SquareArrowOutUpRightIcon} from "lucide-react";
import {ReactElement} from "react";

type SandpackTitleBarProps = {
    title: string,
}

export function SandpackTitleBar({title}: SandpackTitleBarProps): ReactElement {
    const {sandpack} = useSandpack();
    const {resetAllFiles} = sandpack;

    return <div className="mb-0 flex items-center justify-between pl-3 pr-1 py-1 sm:rounded-t-lg w-full"
                style={{backgroundColor: '#151515'}}>
        <span className="text-sm font-bold text-muted-foreground w-full text-center">{title}</span>
        <div className="align-center flex gap-1">
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