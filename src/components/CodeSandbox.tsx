"use server";

import {getFile} from "@/hooks/getFile";
import {fetchShard} from "@/lib/data";
import {CodeEditor} from "@avalon/CodeEditor/CodeEditor";
import {SandpackFiles} from "@codesandbox/sandpack-react";
import {ReactElement} from "react";

type CodeSandboxProps = {
    slug: string,
    autorun?: boolean,
}


export async function CodeSandbox({slug, autorun = true}: CodeSandboxProps): Promise<ReactElement | undefined> {
    const shard = await fetchShard(decodeURIComponent(slug), true);
    if (!shard.example) {
        return undefined;
    }

    const files: SandpackFiles = {
        "/tsconfig.json": {
            code: JSON.stringify({
                "compilerOptions": {
                    "target": "ES2020",
                    "useDefineForClassFields": true,
                    "module": "ESNext",
                    "lib": ["ES2020", "DOM", "DOM.Iterable"],
                    "skipLibCheck": true,

                    /* Bundler mode */
                    "moduleResolution": "bundler",
                    "allowImportingTsExtensions": true,
                    "resolveJsonModule": true,
                    "isolatedModules": true,
                    "noEmit": true,

                    /* Linting */
                    "strict": true,
                    "noUnusedLocals": true,
                    "noUnusedParameters": true,
                    "noFallthroughCasesInSwitch": true,

                    "baseUrl": ".",
                    "paths": {
                        "@avalon/*": ["./src/*"]
                    }
                }
            }, null, 4)
        },
        "/sandbox.config.json": {
            code: JSON.stringify({}, null, 4)
        },
    };

    if (shard.example) {
        files['/index.ts'] = (await getFile(shard.example.example)).code;

        const {code, examplePath} = await getFile(shard.example.scene);
        files[examplePath] = code;
    }

    for (const fileDomain of shard.files) {
        const {code, examplePath} = await getFile(fileDomain);
        files[examplePath] = code;
    }

    return <CodeEditor
        files={files}
        theme="dark"
        template="vanilla-ts"
        options={{
            autoReload: false,
            autorun,
            visibleFiles: ['/index.ts'],
            activeFile: '/index.ts',
        }}
        customSetup={{
            dependencies: {
                excalibur: 'next',
            },
        }}
        autorun={autorun}
        title={shard.name}
    />;
}