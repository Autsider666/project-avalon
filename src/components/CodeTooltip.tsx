"use client";

import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/HoverCard";
import {Shard} from "@/registry/ShardRegister";
import Link from "next/link";
import {ReactElement} from "react";

type CodeTooltipProps = {
    match: string,
    shard: Shard,
    extension: string,
}

export function CodeTooltip({match, shard}: CodeTooltipProps): ReactElement {


    const {domain, identifier} = shard.files[match.replaceAll("\"", "")];
    if (identifier) {
        return <Link
            className="underline decoration-dashed cursor-pointer underline-offset-4"
            href={`/shards/${shard.name}/${domain}`}
        >{match}</Link>;
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