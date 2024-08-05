"use server";

import {Shard, ShardRepository} from "@/registry/ShardRepository";

export async function fetchShard(slug: string): Promise<Shard> {
    const shard = await ShardRepository.find(shard => shard.name === slug);
    if (!shard) {
        throw new Error(`Could not find shard with slug "${slug}"`);
    }

    return shard;
}

export async function fetchFilteredShards(query: string, currentPage?: number): Promise<Shard[]> {
    return ShardRepository.getAll();
}

export async function fetchFilteredShardCount(query: string): Promise<number> {
    return (await fetchFilteredShards(query)).length;
}

export async function fetchShardPages(query: string, itemsPerPage: number = 20): Promise<number> {
    return Math.ceil((await fetchFilteredShardCount(query)) / itemsPerPage);
}