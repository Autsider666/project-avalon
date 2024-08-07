import {Fieldset} from "@/components/form/Fieldset";
import {Label} from "@/components/ui/Label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/Select";
import {Textarea} from "@/components/ui/Textarea";
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
           TODO
        </div>
    </main>);
}