import {ThemeProvider} from "@/components/theme/ThemeProvider";
import {TooltipProvider} from "@/components/ui/Tooltip";
import {cn} from "@/lib/utils";
import type {Metadata} from "next";
import {Inter as FontSans} from "next/font/google";
import "../styles/globals.css";
import {ReactNode} from "react";

type RootLayoutProps = Readonly<{
    children: ReactNode;
}>;

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Project Avalon",
    description: "Gathering all the pieces of Excalibur",
};

export default function RootLayout({children}: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning className={"excalibur"}>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TooltipProvider>
                        {children}
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
