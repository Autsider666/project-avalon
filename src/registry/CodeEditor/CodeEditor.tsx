"use client";

import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/Resizable";
import {FileExplorer} from "@avalon/CodeEditor/FileExplorer";
import {SideBar} from "@avalon/CodeEditor/SideBar";
import {TitleBar} from "@avalon/CodeEditor/TitleBar";
import {SandpackCodeEditor, SandpackLayout, SandpackProvider, SandpackProviderProps} from "@codesandbox/sandpack-react";
import {ReactElement} from "react";

type CodeEditorProps = SandpackProviderProps & {
    autorun?: boolean,
    title?: string,
}

export function CodeEditor({autorun, title, ...props}: CodeEditorProps): ReactElement {
    return <div className="code-sandbox min-h-max w-full">
        <SandpackProvider {...props}>
            <SandpackLayout className="!-mx-4 !rounded-none sm:!mx-0 sm:!rounded-lg">
                <TitleBar title={title}/>
                <ResizablePanelGroup
                    direction="vertical"
                    className="min-h-screen border"
                >
                    <ResizablePanel defaultSize={60} minSize={25} collapsible collapsedSize={0}>
                        <ResizablePanelGroup
                            direction="horizontal"
                        >
                            <ResizablePanel defaultSize={25} minSize={10} maxSize={50}>
                                <FileExplorer extended={true}/>
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
                                    closableTabs
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
    </div>;
}