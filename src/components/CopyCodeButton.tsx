"use client";

import {Button, ButtonProps} from "@/components/ui/Button";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/Tooltip";
import {CheckIcon, ClipboardIcon, CopyIcon} from "lucide-react";
import {ReactElement, useEffect, useState} from "react";

type CopyCodeButtonProps = {
    code: string
} & ButtonProps

// TODO Copy as file: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/write
export function CopyCodeButton({
                                   code,
                                   className,
                                   ...props
                               }: CopyCodeButtonProps): ReactElement {
    const [hasCopied, setHasCopied] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setHasCopied(false);
        }, 2000);
    }, [hasCopied]);

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="outline"
                    className="rounded-full max-md:px-2.5 md:px-3"
                    onClick={() => {
                        navigator.clipboard.writeText(code);

                        setHasCopied(true);
                    }}
                    {...props}
                >
                    {hasCopied ? <CheckIcon className="size-3.5"/> : <CopyIcon className="size-3.5" />}
                    <span className="max-md:sr-only md:ml-2">Copy</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-black text-white">Copy code</TooltipContent>
        </Tooltip>
    );
}