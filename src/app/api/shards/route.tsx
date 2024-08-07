import {fetchShards} from "@/lib/data";
import Fuse from "fuse.js";
import "server-only";

export const dynamic = 'force-static';

export async function GET(): Promise<Response> {
    const shards = await fetchShards();
    const keys = [
        "name",
        "creator",
        "description",
        "categories",
        "files",
        // "files.identifier",
        // "files.path",
        // "files.domain",
        // "files.code",
    ];
    const index = Fuse.createIndex(keys, shards);

    return Response.json({
        shards,
        index,
        keys,
    });
}