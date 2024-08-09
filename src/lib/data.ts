"use server";

import {ShardRegistry} from "@/config/registry";
import {Shard} from "@/types/Shard";
import {Expression} from "fuse.js";
import 'server-only';

export async function fetchShard(slug: string, includeExample: boolean = false): Promise<Shard> {
    const shard = ShardRegistry.find(({name}) => name === slug);
    if (!shard) {
        throw new Error(`Could not find shard with slug "${slug}"`);
    }

    if (!includeExample) {
        return {
            ...shard,
            example: undefined,
        };
    }

    return shard;
}

export async function fetchShards(): Promise<Shard[]> {
    return ShardRegistry;
}

export async function fetchFilteredShards(query: string | Expression, currentPage?: number): Promise<Shard[]> {
    // const {results} = await ShardRepository.search(query);
    return await fetchShards();
}

export async function fetchFilteredShardCount(query: string | Expression): Promise<number> {
    return (await fetchFilteredShards(query)).length;
}

export async function fetchShardPages(query: string | Expression, itemsPerPage: number = 20): Promise<number> {
    return Math.ceil((await fetchFilteredShardCount(query)) / itemsPerPage);
}