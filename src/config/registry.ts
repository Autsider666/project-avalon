import {ExampleProps} from "@/lib/registry/loadExample";
import {Shard} from "@/types/Shard";
import dynamic from "next/dynamic";

export const ShardRegistry: Shard[] = [
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
            component: dynamic<ExampleProps>(async () => import('@avalon/Excalibur/React/AutoTargetingComponent'), {ssr: false}),
        },
        files: [
            '@avalon/Excalibur/Component/SearchesTargetComponent.ts',
            '@avalon/Excalibur/Component/ChasesTargetComponent.ts',
            '@avalon/Excalibur/Component/HasTargetComponent.ts',
            '@avalon/Excalibur/Component/BaseComponent.ts'
        ],
        categories: ['component'],
    },
    {
        name: 'Running Excalibur in React',
        creator: 'Autsider',
        description: 'Getting Excalibur to run in react is a hassle, especially in development with React StrictMode enabled.',
        files: [
            '@avalon/Excalibur/Utility/ExcaliburContainer.tsx',
        ],
        categories: ['utility', 'react'],
    }
] as const;
