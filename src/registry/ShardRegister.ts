export type File = {
    identifier: string,
    path: string,
    domain: string,
}

export type Shard = {
    name: string,
    creator?: string,
    description?: string,
    files: Record<string, File>,
    categories?: string[],
};

const pathToFile = (path: string): [string, File] => {
    const domain = path.split('.')[0];
    const domainParts = domain.split('/');
    return [domain, {
        identifier: domainParts[domainParts.length - 1],
        path,
        domain,
    }];
};

const baseShards: (Omit<Shard, 'files'> & { files: string[] })[] = [
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

export const ShardRegister: Shard[] = [];

for (const {files, ...shard} of baseShards) {
    ShardRegister.push({
        ...shard,
        files: Object.fromEntries(files.map(pathToFile))
    });
}
