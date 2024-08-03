import {CodeBlock} from "@/components/CodeBlock";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/Card";
import {Register} from "@/registry/register";
import {ReactElement} from "react";

export default function Code(): ReactElement {
    return <main className="grid flex-1 gap-4 overflow-auto p-4">
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
        </div>
    </main>;
}