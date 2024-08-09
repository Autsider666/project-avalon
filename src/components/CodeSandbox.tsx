"use server";

import {FileExplorer} from "@/components/editor/FileExplorer";
import {SideBar} from "@/components/editor/SideBar";
import {TitleBar} from "@/components/editor/TitleBar";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/Resizable";
import {getFile} from "@/hooks/getFile";
import {fetchShard} from "@/lib/data";
import {SandpackCodeEditor, SandpackFiles, SandpackLayout, SandpackProvider} from "@codesandbox/sandpack-react";
import dynamic from "next/dynamic";
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

    return (
        <>
            <div className="min-h-max w-full">
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
                        <TitleBar title={shard.name}/>
                        <ResizablePanelGroup
                            direction="vertical"
                            // className="flex h-screen flex-col border"
                            className="min-h-screen border"
                        >
                            <ResizablePanel defaultSize={60} minSize={25} collapsible collapsedSize={0}>
                                <ResizablePanelGroup
                                    direction="horizontal"
                                >
                                    <ResizablePanel defaultSize={25} minSize={10} maxSize={50}>
                                        <FileExplorer/>
                                    </ResizablePanel>
                                    <ResizableHandle withHandle className="z-50"/>
                                    <ResizablePanel defaultSize={75}>
                                        <SandpackCodeEditor
                                            style={{
                                                height: "100%",
                                                minWidth: "100%",
                                            }}
                                            showLineNumbers
                                            showTabs
                                            showInlineErrors
                                            showRunButton={false}
                                        />
                                    </ResizablePanel>
                                </ResizablePanelGroup>
                            </ResizablePanel>
                            <ResizableHandle withHandle/>
                            <ResizablePanel collapsible collapsedSize={4} defaultSize={40} minSize={25}>
                                <SideBar/>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </SandpackLayout>
                </SandpackProvider>
            </div>
        </>
    );
}