"use server";

import 'server-only';
import {promises as fs} from "fs";
import {getFilenameAndExtension} from "next/dist/build/webpack/loaders/next-metadata-route-loader";
import path from "node:path";
import {cache} from 'react';

const paths: { search: RegExp, replace: string }[] = [
    {
        search: /^@avalon\//,
        replace: 'src/registry/',
    },
    {
        search: /^@\//,
        replace: 'src/',
    },
] as const;

export const transformAvalonDomainToPath = cache(async (domainPath: string, forSandbox: boolean): Promise<string> => {


    return domainPath.replace(/^@avalon\//, forSandbox ? 'src/' : 'src/registry/');
});

export const getFile = cache(async (domainPath: string): Promise<{
    path: string,
    examplePath: string,
    name: string,
    extension: string,
    code: string
}> => {
    if (!domainPath.startsWith('@avalon/')) {
        throw new Error('Only files in the Avalon domain are allowed to be used here.');
    }

    const filePath = domainPath.replace(/^@avalon\//, 'src/registry/');
    const {name, ext: extension} = getFilenameAndExtension(filePath);

    return {
        path: domainPath.replace(/^@avalon\//, 'src/registry/'),
        examplePath: domainPath.replace(/^@avalon\//, 'src/'),
        code: await readFile(filePath),
        extension,
        name,
    };
});

async function readFile(source: string) {
    const filepath = path.join(process.cwd(), source);
    return await fs.readFile(filepath, "utf-8");
}