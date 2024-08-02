"use client";

import {ThemeProvider as NextThemesProvider} from "next-themes";
import {ThemeProviderProps} from "next-themes/dist/types";
import {ReactElement} from "react";

export function ThemeProvider({children, ...props}: ThemeProviderProps): ReactElement {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}