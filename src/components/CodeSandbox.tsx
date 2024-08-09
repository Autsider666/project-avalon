"use server";

import {SandpackTitleBar} from "@/components/sandpack/SandpackTitleBar";
import {getFile} from "@/hooks/getFile";
import {fetchShard} from "@/lib/data";
import {
    SandpackCodeEditor,
    SandpackConsole,
    SandpackFileExplorer,
    SandpackFiles,
    SandpackLayout,
    SandpackPreview,
    SandpackProvider
} from "@codesandbox/sandpack-react";
import {ReactElement} from "react";

type CodeSandboxProps = {
    slug: string,
    autorun?: boolean,
}

export async function CodeSandbox({slug, autorun = false}: CodeSandboxProps): Promise<ReactElement> {
    const shard = await fetchShard(decodeURIComponent(slug), true);
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

    return (
        <div className="flex h-full flex-col">
            {/*<div className="flex items-center justify-between border-1 rounded-t-lg py-2"*/}
            {/*     style={{*/}
            {/*         backgroundColor: '#151515', color: '#c0caf5', borderColor: '#252525',*/}
            {/*     }}*/}
            {/*>*/}
            {/*    <div className="flex-1 pl-8"></div>*/}
            {/*    <a href="https://kempo.io" target="_blank" className="font-showcase text-xl font-black"*/}
            {/*       rel="noreferrer">Kempo</a>*/}
            {/*    <div className="mt-0.5 flex h-full flex-1 justify-end gap-6 pr-8"></div>*/}
            {/*</div>*/}
            <SandpackProvider
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
            >
                <SandpackLayout className="!-mx-4 !rounded-none sm:!mx-0 sm:!rounded-lg">
                    <SandpackTitleBar title={shard.name}/>
                    <SandpackFileExplorer
                        style={{
                            height: "400px",
                            minWidth: "20%",
                        }}
                    />
                    <SandpackCodeEditor
                        style={{
                            height: "400px",
                            minWidth: "70%",
                        }}
                        showLineNumbers
                        showTabs
                    />
                    <SandpackPreview
                        style={{
                            height: "400px",
                            minWidth: "70%",
                        }}
                        showOpenInCodeSandbox={false}
                    />
                    <SandpackConsole
                        showHeader={true}
                        style={{
                            height: "400px",
                            minWidth: "25%",
                        }}

                    />
                </SandpackLayout>
            </SandpackProvider>
        </div>
    );
}