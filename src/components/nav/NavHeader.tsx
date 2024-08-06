import {CmdkCommandMenu} from "@/components/CmdkCommandMenu";
import {CommandPalette} from "@/components/command-palette/ComandPalette";
import {MobileNavMenu} from "@/components/nav/MobileNavMenu";
import {ReactElement} from "react";

export function NavHeader(): ReactElement {
    return <header
        className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <MobileNavMenu/>
        <CommandPalette
            // className="ml-auto"
        />
        <CmdkCommandMenu className="ml-auto"/>
    </header>;
}