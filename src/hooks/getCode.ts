"use server";

import {promises as fs} from "fs";
import path from "path";

export async function getCode(name: string): Promise<{ fileName: string, code: string }> {
    const code = await readCode(name);

    return {
        fileName: name,
        code,
    };
}

async function readCode(
    name: string,
) {
    return await readFile(name);
}

async function readFile(source: string) {
    const filepath = path.join(process.cwd(), source);
    return await fs.readFile(filepath, "utf-8");
}