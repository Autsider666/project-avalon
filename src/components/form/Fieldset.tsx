import {ReactElement, ReactNode} from "react";

type FieldsetProps = {
    name: ReactNode,
    children: ReactNode[] | ReactNode,
}

export function Fieldset({name, children}: FieldsetProps): ReactElement {
    return <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">
            {name}
        </legend>
        {children}
    </fieldset>;
}