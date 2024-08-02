"use server";

import {promises as fs} from "fs";
import path from "node:path";

export async function getCode(filePath: string): Promise<{ path: string, name: string, extension: string, code: string }> {
    const code = await readCode(filePath);

    return {
        path: filePath,
        code,
        extension: path.extname(filePath).split('.').join(""),
        name: path.basename(filePath),
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