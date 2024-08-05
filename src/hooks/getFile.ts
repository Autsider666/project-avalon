import {promises as fs} from "fs";
import path from "node:path";

export async function getFile(filePath: string): Promise<{
    path: string,
    name: string,
    extension: string,
    code: string
}> {
    const code = await readCode(filePath.replace(/^@\//, 'src/'));
    // console.log(getFilenameAndExtension(filePath)); //TODO
    return {
        path: filePath,
        code,
        extension: getFileExtension(filePath),
        name: getFileName(filePath),
    };
}

export function getFileName(filePath: string): string {
    return path.basename(filePath);
}

export function getFileExtension(filePath: string): string {
    return path.extname(filePath).split('.').join("");
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