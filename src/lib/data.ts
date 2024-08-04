"use server";

import {Shard, ShardRegister} from "@/registry/ShardRegister";

export async function fetchShard(slug: string): Promise<Shard> {
    const shard = ShardRegister.find(shard => shard.name === slug);
    if (!shard) {
        throw new Error(`Could not find shard with slug "${slug}"`);
    }

    return shard;
}

export async function fetchFilteredShards(query: string, currentPage: number): Promise<Shard[]> {
    return ShardRegister;
}

export async function fetchFilteredShardCount(query: string): Promise<number> {
    return ShardRegister.length;
}

export async function fetchShardPages(query: string, itemsPerPage: number = 20): Promise<number> {
    return Math.ceil(Array.from(ShardRegister.keys()).length / itemsPerPage);
}