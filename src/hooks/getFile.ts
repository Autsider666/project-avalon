import 'server-only';
import {promises as fs} from "fs";
import path from "node:path";
import {cache} from 'react';

//TODO still needed?
export const preload = (filePath: string): void => {
    void getFile(filePath);
};

export const getFile = cache(async (filePath: string): Promise<{
    path: string,
    name: string,
    extension: string,
    code: string
}> => {
    const code = await readFile(filePath.replace(/^@\//, 'src/'));
    // console.log(getFilenameAndExtension(filePath)); //TODO
    // console.log('getFile', filePath, process.cwd());
    return {
        path: filePath,
        code,
        extension: getFileExtension(filePath),
        name: getFileName(filePath),
    };
});

export function getFileName(filePath: string): string {
    return path.basename(filePath);
}

export function getFileExtension(filePath: string): string {
    return path.extname(filePath).split('.').join("");
}

async function readFile(source: string) {
    const filepath = path.join(process.cwd(), source);
    return await fs.readFile(filepath, "utf-8");
}