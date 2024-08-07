"use client";

import {commandAction} from "@/action/commandAction";
import {Button} from "@/components/ui/Button";
import {CommandDialog, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/Command";
import {cn} from "@/lib/utils";
import {useAction} from "next-safe-action/hooks";
import {useTheme} from "next-themes";
import {useRouter} from "next/navigation";
import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {useDebouncedCallback} from "use-debounce";

type CommandMenuProps = {
    className?: string,
}

const emptyQuery = '';

export function CmdkCommandMenu({className}: CommandMenuProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState(emptyQuery);
    const {setTheme} = useTheme();
    const {
        execute,
        result: {data},
    } = useAction(commandAction, {
        executeOnMount: {
            input: {query},
        },
        onError(error) {
            console.error(error);
        }
    });

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
                if (
                    (e.target instanceof HTMLElement && e.target.isContentEditable) ||
                    e.target instanceof HTMLInputElement ||
                    e.target instanceof HTMLTextAreaElement ||
                    e.target instanceof HTMLSelectElement
                ) {
                    return;
                }

                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const closeDialog = useCallback(() => {
        setOpen(false);
        setQuery(emptyQuery);
        execute({query: emptyQuery});
    }, [execute]);

    const runCommand = useCallback((command: () => unknown) => {
        closeDialog();
        command();
    }, [closeDialog]);

    const handleValueChange = useDebouncedCallback(
        (query: string) => execute({query: query.trim()}),
        300
    );

    return (
        <>
            <Button
                variant="outline"
                className={cn(
                    "relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-60 lg:w-64",
                    className,
                )}
                onClick={() => setOpen(true)}
            >
                <span className="hidden lg:inline-flex">Search...</span>
                <span className="inline-flex lg:hidden">Search...</span>
                <span className="sm:flex absolute right-[0.3rem] top-[0.3rem] pointer-events-none hidden">
                    <kbd
                        className="h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd> or
                <kbd
                    className="h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    /                </kbd>
                </span>
            </Button>
            <CommandDialog open={open} onOpenChange={(value) => {
                if (value === false) {
                    closeDialog();
                } else {
                    setOpen(value);
                }
            }} shouldFilter={false}>
                <CommandInput
                    placeholder="Type a command or search..."
                    value={query}
                    onValueChange={value => {
                        handleValueChange(value);
                        setQuery(value);
                    }}
                />
                <CommandList>
                    {(data ?? []).map(({groupLabel, groupItems, groupIcon, score}) => {
                        if (groupItems.length === 0) {
                            return undefined;
                        }

                        return <CommandGroup
                            key={groupLabel}
                            value={groupLabel}
                            heading={<span className="capitalize">{groupLabel}</span>}
                            className="*:*:first:has-[:aria-selected]:bg-primary"
                        >
                            {groupItems.map(({
                                                 label,
                                                 value,
                                                 keywords,
                                                 type,
                                                 icon,
                                             }) => {
                                return <CommandItem
                                    className="command-item"
                                    key={`${groupLabel}-${label}`}
                                    value={value}
                                    keywords={keywords}
                                    onSelect={() => {
                                        switch (type) {
                                            case "link":
                                                runCommand(() => router.push(value));
                                                break;
                                            case "theme":
                                                runCommand(() => setTheme(value));
                                                break;
                                        }
                                    }}
                                >
                                    {icon ?? groupIcon}
                                    {label}
                                </CommandItem>;
                            })}
                        </CommandGroup>;
                    })}
                    {/*<CommandGroup heading="Theme">*/}
                    {/*    {themeOptions.map(({theme, icon}) => (*/}
                    {/*        <CommandItem*/}
                    {/*            key={theme}*/}
                    {/*            value={getCategoryMarkedValue('theme', theme)}*/}
                    {/*            onSelect={() => runCommand(() => setTheme(theme))}*/}
                    {/*            className="capitalize"*/}
                    {/*        >*/}
                    {/*            {icon}*/}
                    {/*            {theme}*/}
                    {/*        </CommandItem>*/}
                    {/*    ))}*/}
                    {/*</CommandGroup>*/}
                </CommandList>
            </CommandDialog>
        </>
    );
}