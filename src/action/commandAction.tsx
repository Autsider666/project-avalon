"use server";

import {actionClient} from "@/lib/safe-action";
import {ThemeRepository} from "@/registry/Repository/ThemeRepository";
import {getShards, Shard} from "@/registry/shards";
import {LaptopIcon, MoonIcon, SunIcon} from "@radix-ui/react-icons";
import Fuse, {FuseResult} from "fuse.js";
import {PuzzleIcon} from "lucide-react";
import * as React from "react";
import {cache, ReactElement} from "react";
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
    score: number,
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

const createIndex = cache(async () => new Fuse(
    await getShards(),
    {
        includeScore: true,
        includeMatches: true,
        keys: [
            "name",
            "creator",
            "description",
            "categories",
            "files.identifier",
            "files.path",
            "files.domain",
            "files.code",
        ],
    },
));

async function searchShards(query: string): Promise<FuseResult<Shard>[]> {
    return (await createIndex()).search(query);
}

async function getShardsGroup(query: string): Promise<CommandGroup> {
    const group: CommandGroup = {
        groupLabel: 'shards',
        groupIcon: <PuzzleIcon className="mr-2 h-4 w-4"/>,
        groupItems: [],
        score: 0,
    };

    if (query) {
        const results = await searchShards(query);
        group.score = getGroupScore(results);
        group.groupItems = results.map(({item: {name}}): Command => ({
            label: name,
            type: 'link',
            value: `/shards/${name}`,
        }));
    } else {
        group.groupItems = (await getShards()).map(({name}): Command => ({
            label: name,
            type: 'link',
            value: `/shards/${name}`,
        }));
    }

    return group;
}

export const commandAction = actionClient
    .schema(schema)
    .action(async ({parsedInput: {query}}): Promise<PossibleCommands> => {
        const {results: themes, fuse: fuseThemes} = await ThemeRepository.search(query);

        return [
            await getShardsGroup(query),
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