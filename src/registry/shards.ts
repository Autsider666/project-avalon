import 'server-only';

export type Shard = {
    name: string,
    creator?: string,
    description?: string,
    files: string[],
    categories?: string[],
};

const shards: Shard[] = [
    {
        name: 'Fieldset Example',
        creator: 'Autsider',
        description: 'Test component',
        files: ['@/components/form/Fieldset.tsx'],
        // categories: ['test'],
    },
    {
        name: 'Auto-targeting',
        creator: 'Autsider',
        files: [
            '@/registry/Excalibur/Component/SearchesTargetComponent.ts',
            '@/registry/Excalibur/Component/HasTargetComponent.ts',
            '@/registry/Excalibur/BaseComponent.ts'
        ],
        categories: ['test'],
    },
] as const;

export function getShards(): Shard[] {
    return shards;
}

export function getShard(name: string): Shard {
    const shard = shards.find(shard => shard.name === name);
    if (!shard) {
        throw new Error(`Shard with name "${name}" does not exist.`);
    }

    return shard;
}