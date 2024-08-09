"use client";

import {ReactElement} from "react";
// @ts-expect-error Dev over there messed up
import {SandpackFilesProvider, SandpackFileTree} from "sandpack-file-explorer";

export function FileExplorer(): ReactElement {
    // This version of the SandpackFileExplorer doesn't like to be in server components directly
    return <SandpackFilesProvider>
        <div className="*:!max-w-full *:h-screen">
            <SandpackFileTree/>
        </div>
    </SandpackFilesProvider>;
}