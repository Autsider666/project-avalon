"use server";

import {getShard, getShards, Shard} from "@avalon/shards";
import {Expression} from "fuse.js";
import 'server-only';

export async function fetchShard(slug: string, includeExample: boolean = false): Promise<Shard> {
    const shard = {
        ...await getShard(slug),
    };
    if (!shard) {
        throw new Error(`Could not find shard with slug "${slug}"`);
    }

    if (!includeExample) {
        delete shard.example;
    }

    return shard;
}

export async function fetchShards(): Promise<Shard[]> {
    return getShards();
}

export async function fetchFilteredShards(query: string | Expression, currentPage?: number): Promise<Shard[]> {
    // const {results} = await ShardRepository.search(query);
    return getShards();
}

export async function fetchFilteredShardCount(query: string | Expression): Promise<number> {
    return (await fetchFilteredShards(query)).length;
}

export async function fetchShardPages(query: string | Expression, itemsPerPage: number = 20): Promise<number> {
    return Math.ceil((await fetchFilteredShardCount(query)) / itemsPerPage);
}