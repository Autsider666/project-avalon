"use client";

import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/HoverCard";
import {Shard} from "@/registry/ShardRegister";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {ReactElement} from "react";
import {useDebouncedCallback} from "use-debounce";

type CodeTooltipProps = {
    match: string,
    shard: Shard,
    extension: string,
}

export function CodeTooltip({match, shard, extension}: CodeTooltipProps): ReactElement {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const handleFileFocus = useDebouncedCallback((term: string): void => {
        const params = new URLSearchParams(searchParams);
        params.set('file', term);

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    const {domain,identifier} = shard.files[match.replaceAll("\"", "")];
    if (identifier) {
        return <span
            className="underline decoration-dashed cursor-pointer"
            onClick={() => handleFileFocus(identifier)}
        >{match}</span>;
    }

    return (
        <HoverCard openDelay={100}>
            <HoverCardTrigger className="underline decoration-dotted">{match}</HoverCardTrigger>
            <HoverCardContent className="w-full">
                {domain}
            </HoverCardContent>
        </HoverCard>
    );

    // return (
    //     <span data-link={match} className="relative group inline-block">
    //         <Link href={match}>
    //             <span
    //                 className="underline decoration-dotted hover:bg-primary/20 transition duration-300 ease-in-out transform hover:scale-105"
    //             >{match}</span>
    //         </Link>
    //         <div
    //             // Used to have `w-48` for width
    //             className="opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute mt-2 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg py-2 z-10">
    //             <p className="px-4 py-2">This is a popover component.</p>
    //             <p className="px-4 py-2">You can customize it with your content.</p>
    //         </div>
    //     </span>
    // );
}