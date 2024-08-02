"use client";

import {Input} from "@/components/ui/Input";
import {SearchIcon} from "lucide-react";
import {ChangeEvent, ReactElement} from "react";

type SearchProps = {
    onChange: (value: string) => void,
}

export function Search({onChange}: SearchProps): ReactElement {
    // const [value, setValue] = useState<string | undefined>(undefined);

    const handleChange = ({target}: ChangeEvent<HTMLInputElement>): void => {
        const newValue = target.value;

        // setValue(newValue);

        onChange(newValue);
    };

    return <div className="relative ml-auto flex-1 md:grow-0">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
        <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[225px]"
            // value={value}
            onChange={handleChange}
        />
    </div>;
}