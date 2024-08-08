import {ExcaliburContainer, ExcaliburOptions} from "@/registry/Excalibur/Utility/ExcaliburContainer";
import {Scene} from "excalibur";
import {ReactElement} from "react";

export function loadExample(scene: Scene, options?: ExcaliburOptions): () => ReactElement {
    const example = () => <ExcaliburContainer
        options={{
            width: 800,
            height: 500,
            ...options,
        }}
        scene="example"
        scenes={{example: scene}}
    />;

    return example;
}