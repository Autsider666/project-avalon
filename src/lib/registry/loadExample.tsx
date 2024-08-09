"use client";

import {Label} from "@/components/ui/Label";
import {Switch} from "@/components/ui/Switch";
import {ExcaliburContainer, ExcaliburOptions} from "@avalon/Excalibur/Utility/ExcaliburContainer";
import {Scene} from "excalibur";
import {ComponentType, useState} from "react";

export type ExampleProps = {
    autorun?: boolean
};

export type ExampleComponent = ComponentType<ExampleProps>;

export function loadExample(scene: Scene, options?: ExcaliburOptions): ExampleComponent {
    // eslint-disable-next-line react/display-name
    return ({autorun = false}: ExampleProps) => {
        const [isRunning, setIsRunning] = useState(autorun);

        return <div className="grid grid-cols-0 gap-3">
            <div className="flex items-center space-x-2">
                <Switch id="example-toggle" checked={isRunning} onCheckedChange={setIsRunning}/>
                <Label htmlFor="example-toggle">Run Example</Label>
            </div>
            <ExcaliburContainer
                options={{
                    width: 800,
                    height: 500,
                    ...options,
                }}
                scene="example"
                scenes={{
                    example: scene,
                }}
                isRunning={isRunning}
            />
        </div>;
    };
}