"use server";

import 'server-only';
import dynamic from "next/dynamic";
import {ComponentType} from "react";

export type Shard = {
    name: string,
    creator?: string,
    description?: string,
    example?: {
        example: string,
        scene: string,
        component: ComponentType,
    },
    files: string[],
    categories?: string[],
};

const shards: Shard[] = [
    // {
    //     name: 'Fieldset Example',
    //     creator: 'Autsider',
    //     description: 'Test component',
    //     files: ['@/components/form/Fieldset.tsx'],
    //     // categories: ['test'],
    // },
    {
        name: 'Auto-targeting',
        creator: 'Autsider',
        example: {
            example: '@avalon/Excalibur/Example/AutoTargetingExample.ts',
            scene: '@avalon/Excalibur/Scene/AutoTargetingScene.ts',
            component: dynamic(async () => import('@avalon/Excalibur/React/AutoTargetingComponent'), {ssr: false}),
        },
        files: [
            '@avalon/Excalibur/Component/SearchesTargetComponent.ts',
            '@avalon/Excalibur/Component/ChasesTargetComponent.ts',
            '@avalon/Excalibur/Component/HasTargetComponent.ts',
            '@avalon/Excalibur/Component/BaseComponent.ts'
        ],
        categories: ['test'],
    },
] as const;

export async function getShards(): Promise<Shard[]> {
    return shards;
}

export async function getShard(name: string): Promise<Shard> {
    const shard = shards.find(shard => shard.name === name);
    if (!shard) {
        throw new Error(`Shard with name "${name}" does not exist.`);
    }

    return shard;
}