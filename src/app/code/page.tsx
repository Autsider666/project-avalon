import {CodeBlock} from "@/components/CodeBlock";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/Card";
import {Register} from "@/registry/register";
import {ReactElement} from "react";

export default function Code(): ReactElement {
    return <div>
        {Register.map(({name, description, files}) => <Card key={name} className="mb-2">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                {description ? <CardDescription>{description}</CardDescription> : undefined}
            </CardHeader>
            <CardContent>
                {files.map(filePath => <CodeBlock key={filePath} filePath={filePath}/>)}
            </CardContent>
        </Card>)}
    </div>;
}