"use client";

import {FoundryScene} from "@/components/foundry/FoundryScene";
import dynamic from "next/dynamic";
import {ReactElement, useEffect, useRef, useState} from "react";
import 'client-only';

const Container = dynamic(async () => (await import('@avalon/Excalibur/Utility/ExcaliburContainer')).ExcaliburContainer, {ssr: false});

export function FoundryEditor(): ReactElement {
    const [scene, setScene] = useState<FoundryScene | undefined>();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!scene) {
            import('@/components/foundry/FoundryScene').then(({FoundryScene}) => {
                setScene(new FoundryScene());
            }).catch(() => {
            });
        }
    }, [scene]);

    const [isRunning, setIsRunning] = useState(true);

    return <div
        className="relative w-full"
    >
        <div id="pane-container" className="absolute top-0 right-0 grid gap-3 grid-cols-1"
             ref={ref}>{/* Keep empty for the TweakPane element! */}</div>

        {scene ? <Container
            isRunning={isRunning}
            scene="foundry"
            scenes={{foundry: scene}}
            options={{
                width: 900,
                height: 700,
            }}
        /> : undefined}
    </div>;
}