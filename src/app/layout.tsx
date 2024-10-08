import {DesktopNavMenu} from "@/components/nav/DesktopNavMenu";
import {NavHeader} from "@/components/nav/NavHeader";
import {SandPackStyles} from "@/components/sandpack-styles";
import {ThemeProvider} from "@/components/theme/ThemeProvider";
import {TooltipProvider} from "@/components/ui/Tooltip";
import {SiteName} from "@/constants";
import {cn} from "@/lib/utils";
import {Analytics} from "@vercel/analytics/next";
import {SpeedInsights} from "@vercel/speed-insights/next";
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
    title: SiteName,
    description: "Gathering all the pieces of Excalibur",
};

export default function RootLayout({children}: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning className={"excalibur"}>
            <head>
                <SandPackStyles/>
            </head>
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
                <SpeedInsights debug={false}/>
                <Analytics debug={false}/>
            </body>
        </html>
    );
}
