"use client";

import {Input} from "@/components/ui/Input";
import {SearchIcon} from "lucide-react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {ReactElement} from "react";
import {useDebouncedCallback} from "use-debounce";

type SearchProps = {
    searchParam? : string
}

export function Search({searchParam = 'query'}:SearchProps): ReactElement {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const handleSearch = useDebouncedCallback((term: string): void => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set(searchParam, term);
        } else {
            params.delete(searchParam);
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return <div className="relative ml-auto flex-1 md:grow-0">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
        <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            onChange={({target}) => handleSearch(target.value)}
            defaultValue={searchParams.get(searchParam)?.toString()}
        />
    </div>;
}