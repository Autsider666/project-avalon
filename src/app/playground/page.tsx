import {Fieldset} from "@/components/form/Fieldset";
import {ModeToggle} from "@/components/theme/ModeToggle";
import {Button} from "@/components/ui/Button";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/Drawer";
import {Label} from "@/components/ui/Label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/Select";
import {Textarea} from "@/components/ui/Textarea";
import {Tooltip, TooltipContent, TooltipTrigger,} from "@/components/ui/Tooltip";
import {Book, Bot, Code2, LifeBuoy, Settings, Settings2, Share, SquareTerminal, SquareUser, Sword,} from "lucide-react";
import {ReactElement} from "react";


export default function Playground(): ReactElement {
    return (
        <div className="grid h-screen w-full pl-[53px]">
            <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
                <div className="border-b p-2">
                    <Button variant="outline" size="icon" aria-label="Home">
                        <Sword className="size-5 fill-foreground" color="#176baa" style={{transform: 'rotate(90deg)'}}/>
                    </Button>
                </div>
                <nav className="grid gap-1 p-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-lg bg-muted"
                                aria-label="Playground"
                            >
                                <SquareTerminal className="size-5"/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            Playground
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-lg"
                                aria-label="Models"
                            >
                                <Bot className="size-5"/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            Models
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-lg"
                                aria-label="API"
                            >
                                <Code2 className="size-5"/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            API
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-lg"
                                aria-label="Documentation"
                            >
                                <Book className="size-5"/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            Documentation
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-lg"
                                aria-label="Settings"
                            >
                                <Settings2 className="size-5"/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            Settings
                        </TooltipContent>
                    </Tooltip>
                </nav>
                <nav className="mt-auto grid gap-1 p-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="mt-auto rounded-lg"
                                aria-label="Help"
                            >
                                <LifeBuoy className="size-5"/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            Help
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="mt-auto rounded-lg"
                                aria-label="Account"
                            >
                                <SquareUser className="size-5"/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            Account
                        </TooltipContent>
                    </Tooltip>
                </nav>
            </aside>
            <div className="flex flex-col">
                <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
                    <h1 className="text-xl font-semibold">Playground</h1>
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Settings className="size-4"/>
                                <span className="sr-only">Settings</span>
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent className="max-h-[80vh]">
                            <DrawerHeader>
                                <DrawerTitle>Configuration</DrawerTitle>
                                <DrawerDescription>
                                    Configure the settings for the model and messages.
                                </DrawerDescription>
                            </DrawerHeader>
                            <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                                <Fieldset name="Settings">
                                    <div className="grid gap-3">
                                        <Label htmlFor="role">Role</Label>
                                        <Select defaultValue="system">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="system">System</SelectItem>
                                                <SelectItem value="user">User</SelectItem>
                                                <SelectItem value="assistant">Assistant</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="content">Content</Label>
                                        <Textarea id="content" placeholder="You are a..."/>
                                    </div>
                                </Fieldset>
                            </form>
                        </DrawerContent>
                    </Drawer>
                    <div className="ml-auto"/>
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 text-sm"
                    >
                        <Share className="size-3.5"/>
                        Share
                    </Button>
                    <ModeToggle size="sm"/>
                </header>
                <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
                    <div
                        className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0"
                    >
                        <form className="grid w-full items-start gap-6">
                            <Fieldset name="Settings">
                                <div className="grid gap-3">
                                    <Label htmlFor="role">Role</Label>
                                    <Select defaultValue="system">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="system">System</SelectItem>
                                            <SelectItem value="user">User</SelectItem>
                                            <SelectItem value="assistant">Assistant</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="content">Content</Label>
                                    <Textarea id="content" placeholder="You are a..."/>
                                </div>
                            </Fieldset>
                        </form>
                    </div>
                    <div
                        className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
                        {/*<div className="flex-1"/>*/}
                        {/*<form*/}
                        {/*    className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"*/}
                        {/*    x-chunk="dashboard-03-chunk-1"*/}
                        {/*>*/}
                        {/*    <Label htmlFor="message" className="sr-only">*/}
                        {/*        Message*/}
                        {/*    </Label>*/}
                        {/*    <Textarea*/}
                        {/*        id="message"*/}
                        {/*        placeholder="Type your message here..."*/}
                        {/*        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"*/}
                        {/*    />*/}
                        {/*    <div className="flex items-center p-3 pt-0">*/}
                        {/*        <Tooltip>*/}
                        {/*            <TooltipTrigger asChild>*/}
                        {/*                <Button variant="ghost" size="icon">*/}
                        {/*                    <Paperclip className="size-4"/>*/}
                        {/*                    <span className="sr-only">Attach file</span>*/}
                        {/*                </Button>*/}
                        {/*            </TooltipTrigger>*/}
                        {/*            <TooltipContent side="top">Attach File</TooltipContent>*/}
                        {/*        </Tooltip>*/}
                        {/*        <Tooltip>*/}
                        {/*            <TooltipTrigger asChild>*/}
                        {/*                <Button variant="ghost" size="icon">*/}
                        {/*                    <Mic className="size-4"/>*/}
                        {/*                    <span className="sr-only">Use Microphone</span>*/}
                        {/*                </Button>*/}
                        {/*            </TooltipTrigger>*/}
                        {/*            <TooltipContent side="top">Use Microphone</TooltipContent>*/}
                        {/*        </Tooltip>*/}
                        {/*        <Button type="submit" size="sm" className="ml-auto gap-1.5">*/}
                        {/*            Send Message*/}
                        {/*            <CornerDownLeft className="size-3.5"/>*/}
                        {/*        </Button>*/}
                        {/*    </div>*/}
                        {/*</form>*/}
                    </div>
                </main>
            </div>
        </div>
    );
}