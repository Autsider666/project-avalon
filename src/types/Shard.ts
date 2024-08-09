import {ExampleComponent} from "@/lib/registry/loadExample";

export type Shard = Readonly<{
    name: string,
    creator?: string,
    description?: string,
    example?: {
        example: string,
        scene: string,
        component: ExampleComponent,
    },
    files: string[],
    categories?: string[],
}>;