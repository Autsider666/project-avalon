import {ShikiCodeBlock} from "@/components/ShikiCodeBlock";
import {getCode} from "@/hooks/getCode";
import {ReactElement} from "react";

export async function CodeBlock(): Promise<ReactElement> {
    const {fileName, code} = await getCode('src/components/form/Fieldset.tsx');

    return <ShikiCodeBlock fileName={fileName} code={code}/>;
}