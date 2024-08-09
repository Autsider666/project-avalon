"use server";

import dynamic from "next/dynamic";
import {ReactElement} from "react";

const Editor = dynamic(
    async () => (await import("@/components/foundry/FoundryEditor")).FoundryEditor,
    {ssr: false}
);
export default async function FoundryPage(): Promise<ReactElement> {
    return <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Editor/>
    </main>;
}