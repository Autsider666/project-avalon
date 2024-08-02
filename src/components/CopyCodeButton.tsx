"use client";

import {Button, ButtonProps} from "@/components/ui/Button";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/Tooltip";
import {cn} from "@/lib/utils";
import {CheckIcon, ClipboardIcon} from "lucide-react";
import {ReactElement, useEffect, useState} from "react";

type CopyCodeButtonProps = {
    code: string
} & ButtonProps

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
                    size="icon"
                    variant="outline"
                    className={cn(
                        "[&_svg]-h-3.5 h-7 w-7 rounded-[6px] [&_svg]:w-3.5",
                        className
                    )}
                    onClick={() => {
                        navigator.clipboard.writeText(code);

                        setHasCopied(true);
                    }}
                    {...props}
                >
                    <span className="sr-only">Copy</span>
                    {hasCopied ? <CheckIcon/> : <ClipboardIcon/>}
                </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-black text-white">Copy code</TooltipContent>
        </Tooltip>
    );
}