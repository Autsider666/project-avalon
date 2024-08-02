"use client";

import {Button, ButtonProps} from "@/components/ui/Button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {capitalize} from "@/lib/utils";
import {MoonIcon, SunIcon} from "@radix-ui/react-icons";
import {useTheme} from "next-themes";
import * as React from "react";
import {ReactElement} from "react";

type ModeToggleProps = {
    size?: ButtonProps["size"],
}

export function ModeToggle({size = 'icon'}: ModeToggleProps): ReactElement {
    const {setTheme, theme, themes} = useTheme();
    console.log(theme, themes);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size={size}
                >
                    <SunIcon
                        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
                    <MoonIcon
                        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {themes.map(
                    themeOption => <DropdownMenuCheckboxItem
                        key={themeOption}
                        checked={theme === themeOption}
                        onClick={() => setTheme(themeOption)}
                    >
                        {capitalize(themeOption)}
                    </DropdownMenuCheckboxItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
