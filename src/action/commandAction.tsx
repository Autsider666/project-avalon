"use server";

import {getServerContext} from "@/hooks/getServerContext";
import {actionClient} from "@/lib/safe-action";
import {ShardRepository} from "@/registry/Repository/ShardRepository";
import {ThemeRepository} from "@/registry/Repository/ThemeRepository";
import {LaptopIcon, MoonIcon, SunIcon} from "@radix-ui/react-icons";
import {FuseResult} from "fuse.js";
import {PuzzleIcon} from "lucide-react";
import * as React from "react";
import {ReactElement} from "react";
import {z} from "zod";

type Command = {
    label: string,
    type: 'link' | 'theme',
    value: string,
    icon?: ReactElement,
    keywords?: string[],
}

type CommandGroup = {
    groupLabel: string,
    groupIcon?: ReactElement
    groupItems: Command[],
    score?: number,
}

type PossibleCommands = CommandGroup[]

const schema = z.object({
    query: z.string(),
});

const themeIcons: Record<string, ReactElement> = {
    system: <LaptopIcon className="mr-2 h-4 w-4"/>,
    light: <SunIcon className="mr-2 h-4 w-4"/>,
    dark: <MoonIcon className="mr-2 h-4 w-4"/>,
} as const;

function getGroupScore(results?: FuseResult<unknown>[]): number {
    if (!results || results.length === 0) {
        return 0;
    }

    return results?.reduce(
        (previous, current) => (current.score ?? 0) < (previous.score ?? 0) ? current : previous
    ).score ?? 0;
}

export const commandAction = actionClient
    .schema(schema)
    .action(async ({parsedInput: {query}}): Promise<PossibleCommands> => {
        const {results: shards, fuse: fuseShards} = await ShardRepository.search(query);
        const {results: themes, fuse: fuseThemes} = await ThemeRepository.search(query);
        // console.log(query, JSON.stringify(fuseShards, null, 4), JSON.stringify(fuseThemes, null, 4));

        return [
            {
                groupLabel: 'shards',
                groupIcon: <PuzzleIcon className="mr-2 h-4 w-4"/>,
                groupItems: shards.map(({name}): Command => ({
                    label: name,
                    type: 'link',
                    value: `/shards/${name}`,
                })),
                score: getGroupScore(fuseShards),
            },
            {
                groupLabel: 'themes',
                groupItems: themes
                    .map(({theme}): Command => ({
                        label: theme,
                        type: 'theme',
                        value: theme,
                        icon: themeIcons[theme],
                    })),
                score: getGroupScore(fuseThemes),
            }
        ].sort((a, b) => {
            if (a.score === b.score) {
                return 0;
            }

            return a.score > b.score ? 1 : -1;
        });
    });