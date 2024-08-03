import {CodeBlock} from "@/components/CodeBlock";
import {Fieldset} from "@/components/form/Fieldset";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/Card";
import {Label} from "@/components/ui/Label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/Select";
import {Textarea} from "@/components/ui/Textarea";
import {Register} from "@/registry/register";
import {ReactElement} from "react";


export default function Playground(): ReactElement {
    return (<main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
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
        <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            {Register.map(({name, description, files}) => <Card key={name} className="mb-2">
                <CardHeader>
                    <CardTitle>{name}</CardTitle>
                    {description ? <CardDescription>{description}</CardDescription> : undefined}
                </CardHeader>
                <CardContent>
                    {files.map(filePath => <CodeBlock key={filePath} filePath={filePath}/>)}
                </CardContent>
            </Card>)}
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
    </main>);
}