import {LayoutProps} from "@/lib/types";
import {ReactElement} from "react";

export default function DocsLayout({children}: LayoutProps): ReactElement {
    return <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        {children}
    </main>;
}