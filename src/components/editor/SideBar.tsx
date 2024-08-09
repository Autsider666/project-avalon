"use client";

import {Console} from "@/components/editor/Console";
import {Preview} from "@/components/editor/Preview";
import {Button} from "@/components/ui/Button";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/Tooltip";
import {useSandpack, useSandpackNavigation} from "@codesandbox/sandpack-react";
import {clsx} from "clsx";
import {RefreshCwIcon} from "lucide-react";
import {ReactElement, useEffect, useState} from "react";
import 'client-only';

type SideBarMode = 'console' | 'preview';

export function SideBar(): ReactElement {
    const [mode, setMode] = useState<SideBarMode>('preview');

    const [reloading, setReloading] = useState(false);
    const {sandpack, listen} = useSandpack();
    const {refresh} = useSandpackNavigation();
    const activeClass = 'border-b border-amber-500';

    useEffect(() => {
        const stopListening = listen((msg) => {
            if (msg.type === 'status' && msg?.status === 'idle') {
                setReloading(false);
            }
        });

        return () => stopListening();
    }, [listen]);

    return (
        <>
            {/*className="flex w-full items-center justify-between border border-zinc-700 bg-zinc-900 px-3"*/}
            <div className="flex w-full items-center justify-between border-y border-zinc-700 bg-zinc-900 px-1">
                <div>
                    <Button
                        variant="ghost"
                        className={clsx(
                            'ml-1 py-0 rounded-none',
                            mode === 'preview' ? activeClass : null
                        )}
                        onClick={() => setMode('preview')}
                    >
                        Preview
                    </Button>
                    <Button
                        variant="ghost"
                        className={clsx(
                            'py-0 rounded-none',
                            mode === 'console' ? activeClass : null
                        )}
                        onClick={() => setMode('console')}
                    >
                        Console
                    </Button>
                </div>
                <div>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={() => {
                                    setReloading(true);
                                    refresh();
                                }}
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                            >
                                <RefreshCwIcon
                                    className={clsx(
                                        'h-5 w-5 text-zinc-400',
                                        reloading && 'animate-spin',
                                        sandpack?.status === 'idle' && 'text-zinc-600'
                                    )}
                                />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Refresh
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
            <div className="rounded-b-lg w-full h-full bg-zinc-900">
                <Preview visible={mode === 'preview'}/>
                <Console visible={mode === 'console'}/>
            </div>
        </>
    );
}