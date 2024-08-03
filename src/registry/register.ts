type RegisterItem = {
    name: string,
    creator?: string,
    description?: string,
    files: string[],
    categories?: string[],
};

export const Register: RegisterItem[] = [
    {
        name: 'Fieldset Example',
        creator: 'Autsider',
        description: 'Test component',
        files: ['src/components/form/Fieldset.tsx'],
        // categories: ['test'],
    },
    {
        name: 'Auto-targeting',
        creator: 'Autsider',
        files: [
            'src/registry/Excalibur/Component/SearchesTargetComponent.ts',
            'src/registry/Excalibur/Component/HasTargetComponent.ts',
            'src/registry/Excalibur/BaseComponent.ts'
        ],
        categories: ['test'],
    },
] as const;