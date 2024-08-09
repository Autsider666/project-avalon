"use client";

import {SandpackFileExplorer} from "@codesandbox/sandpack-react";
import {ReactElement} from "react";
// @ts-expect-error Dev over there messed up
import {SandpackFilesProvider, SandpackFileTree} from "sandpack-file-explorer";

type FileExplorerProps = {
    extended: boolean
}

export function FileExplorer({extended}: FileExplorerProps): ReactElement {
    // This version of the SandpackFileExplorer doesn't like to be in server components directly
    return extended ? <SandpackFilesProvider>
        <div className="*:!max-w-full *:h-screen">
            <SandpackFileTree/>
        </div>
    </SandpackFilesProvider> : <SandpackFileExplorer
        style={{
            height: "100%",
            minWidth: "100%",
        }}
    />;
}