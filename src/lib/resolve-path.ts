import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const nextJsRootDir = path.resolve(__dirname, '../../');

export function resolve(importMetaUrl: string, ...paths: string[]) {
    const dirname = path.dirname(fileURLToPath(importMetaUrl));
    const absPath = path.resolve(dirname, ...paths);

    return path.resolve(process.cwd(), absPath.replace(nextJsRootDir, '.'));
}