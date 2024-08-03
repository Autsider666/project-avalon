"use server";

import {Shard} from "@/lib/types";
import {Register} from "@/registry/register";

export async function fetchShard(slug: string): Promise<Shard> {
    const shard = Register.find(shard => shard.name === slug);
    if (!shard) {
        throw new Error(`Could not find shard with slug "${slug}"`);
    }

    return shard as Shard; //FIXME
}

export async function fetchFilteredShards(query: string, currentPage: number): Promise<Shard[]> {
    return Register;
}

export async function fetchFilteredShardCount(query: string): Promise<number> {
    return Register.length;
}

export async function fetchShardPages(query: string, itemsPerPage: number = 20): Promise<number> {
    return Math.ceil(Array.from(Register.keys()).length / itemsPerPage);
}