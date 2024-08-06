import {DesktopNavMenu} from "@/components/nav/DesktopNavMenu";
import {NavHeader} from "@/components/nav/NavHeader";
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
                        <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
                            <DesktopNavMenu/>
                            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                                <NavHeader/>
                                {children}
                            </div>
                        </div>
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
