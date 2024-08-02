import {ReactElement, ReactNode} from "react";

type FieldsetProps = {
    name: string,
    children: ReactNode[] | ReactNode,
}

export function Fieldset({name, children}: FieldsetProps): ReactElement {
    return <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">
            {name}
        </legend>
        {/*{(Array.isArray(children) ? children : [children]).map(*/}
        {/*    (child, index) => <div key={index} className="grid gap-3">{child}</div>*/}
        {/*)}*/}
        {children}
    </fieldset>;
}