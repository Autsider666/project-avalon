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
    }
] as const;