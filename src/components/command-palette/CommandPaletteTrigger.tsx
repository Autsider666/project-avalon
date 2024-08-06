import {Button} from "@/components/ui/Button";
import {cn} from "@/lib/utils";
import * as React from "react";
import {ReactElement} from "react";

type CommandPaletteTriggerProps = {
    onClick: () => void,
    className?: string,
}

export const CommandPaletteTrigger = ({onClick, className}: CommandPaletteTriggerProps): ReactElement => {
    return <Button
        variant="outline"
        className={cn(
            "relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-60 lg:w-64",
            className,
        )}
        onClick={onClick}
    >
        {/*<span className="hidden lg:inline-flex">Search...</span>*/}
        <span className="inline-flex">Search...</span>
        <span className="sm:flex absolute right-[0.3rem] top-[0.3rem] pointer-events-none hidden">
            <kbd
                className="h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex"
            >
            <span className="text-xs">⌘</span>K
            </kbd> or
            <kbd
                className="h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex"
            >/</kbd>
        </span>
    </Button>;
};