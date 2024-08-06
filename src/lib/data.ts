"use server";

import {Shard, ShardRepository} from "@/registry/Repository/ShardRepository";
import {Expression} from "fuse.js";

export async function fetchShard(slug: string): Promise<Shard> {
    const shard = await ShardRepository.find(shard => shard.name === slug);
    if (!shard) {
        throw new Error(`Could not find shard with slug "${slug}"`);
    }

    return shard;
}

export async function fetchFilteredShards(query: string|Expression, currentPage?: number): Promise<Shard[]> {
    const {results} = await ShardRepository.search(query);
    return results;
}

export async function fetchFilteredShardCount(query: string|Expression): Promise<number> {
    return (await fetchFilteredShards(query)).length;
}

export async function fetchShardPages(query: string|Expression, itemsPerPage: number = 20): Promise<number> {
    return Math.ceil((await fetchFilteredShardCount(query)) / itemsPerPage);
}