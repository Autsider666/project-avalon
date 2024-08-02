type RegisterItem = {
    name: string,
    creator?: string,
    description?: string,
    files: string[],
    categories?: string[],
};

export const Register: RegisterItem[] = [
    {
        name: 'Fieldset',
        creator: 'Autsider',
        description: 'Test component',
        files: ['src/components/form/Fieldset.tsx']
    },
    {
        name: 'BaseComponent',
        creator: 'Autsider',
        files: ['src/registry/Excalibur/BaseComponent.ts']
    },
    {
        name: 'HasTargetComponent',
        description: 'The current target of the entity. Can be added manually or by using SearchesTargetComponent',
        creator: 'Autsider',
        files: ['src/registry/Excalibur/Component/HasTargetComponent.ts']
    },
    {
        name: 'SearchesTargetComponent',
        description: 'Searches the surroundings of the entity periodically for its next target.',
        creator: 'Autsider',
        files: ['src/registry/Excalibur/Component/SearchesTargetComponent.ts']
    },
] as const;