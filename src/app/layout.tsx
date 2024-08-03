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
                        <div className="flex min-h-screen w-full flex-col bg-muted/40">
                            <DesktopNavMenu/>
                            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                                <NavHeader/>
                                {/*<header*/}
                                {/*    className="sticky top-0 z-20 flex h-[53px] items-center gap-1 border-b bg-background px-4">*/}
                                {/*    /!*<h1 className="text-xl font-semibold">Playground</h1>*!/*/}
                                {/*    <Drawer>*/}
                                {/*        <DrawerTrigger asChild>*/}
                                {/*            <Button variant="ghost" size="icon" className="md:hidden">*/}
                                {/*                <Settings className="size-4"/>*/}
                                {/*                <span className="sr-only">Settings</span>*/}
                                {/*            </Button>*/}
                                {/*        </DrawerTrigger>*/}
                                {/*        <DrawerContent className="max-h-[80vh]">*/}
                                {/*            <DrawerHeader>*/}
                                {/*                <DrawerTitle>Configuration</DrawerTitle>*/}
                                {/*                <DrawerDescription>*/}
                                {/*                    Configure the settings for the model and messages.*/}
                                {/*                </DrawerDescription>*/}
                                {/*            </DrawerHeader>*/}
                                {/*            <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">*/}
                                {/*                <Fieldset name="Settings">*/}
                                {/*                    <div className="grid gap-3">*/}
                                {/*                        <Label htmlFor="role">Role</Label>*/}
                                {/*                        <Select defaultValue="system">*/}
                                {/*                            <SelectTrigger>*/}
                                {/*                                <SelectValue placeholder="Select a role"/>*/}
                                {/*                            </SelectTrigger>*/}
                                {/*                            <SelectContent>*/}
                                {/*                                <SelectItem value="system">System</SelectItem>*/}
                                {/*                                <SelectItem value="user">User</SelectItem>*/}
                                {/*                                <SelectItem value="assistant">Assistant</SelectItem>*/}
                                {/*                            </SelectContent>*/}
                                {/*                        </Select>*/}
                                {/*                    </div>*/}
                                {/*                    <div className="grid gap-3">*/}
                                {/*                        <Label htmlFor="content">Content</Label>*/}
                                {/*                        <Textarea id="content" placeholder="You are a..."/>*/}
                                {/*                    </div>*/}
                                {/*                </Fieldset>*/}
                                {/*            </form>*/}
                                {/*        </DrawerContent>*/}
                                {/*    </Drawer>*/}
                                {/*    <div className="ml-auto"/>*/}
                                {/*    /!*<Search onChange={value => console.log(value)}/>*!/*/}
                                {/*    <Button*/}
                                {/*        variant="outline"*/}
                                {/*        size="sm"*/}
                                {/*        className="gap-1.5 text-sm"*/}
                                {/*    >*/}
                                {/*        <Share className="size-3.5"/>*/}
                                {/*        Share*/}
                                {/*    </Button>*/}
                                {/*</header>*/}
                                {/*<main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">*/}
                                {children}
                                {/*</main>*/}
                            </div>
                        </div>
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
