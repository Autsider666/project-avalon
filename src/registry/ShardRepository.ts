import {getFile} from "@/hooks/getFile";

export type File = {
    identifier: string,
    path: string,
    domain: string,
    code: string,
}

export type Shard = {
    name: string,
    creator?: string,
    description?: string,
    files: Record<string, File>,
    categories?: string[],
};

const pathToFile = async (path: string): Promise<[string, File]> => {
    const domain = path.split('.')[0];
    const domainParts = domain.split('/');
    const file = await getFile(path);
    return [domain, {
        identifier: domainParts[domainParts.length - 1],
        path,
        domain,
        code: file.code,
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

class Repository<T> {
    private loaded:boolean = false;
    private readonly items: T[] = [];

    constructor(
        private readonly getItems: () => Promise<T[]>,
    ) {
    }

    async getAll():Promise<T[]> {
        await this.load();

        return this.items;
    }

    async getKeys():Promise<string[]> {
        await this.load();

        return Array.from(Object.keys(this.items));
    }

    async find(callback: (item:T) => boolean): Promise<T | undefined> {
        await this.load();

        for (const item of this.items) {
            if (callback(item)) {
                return item;
            }
        }

        return undefined;
    }

    private async load():Promise<void> {
        if (this.loaded) {
            return;
        }

        this.items.push(...await this.getItems());

        this.loaded = true;
    }
}

export const ShardRepository: Repository<Shard> = new Repository<Shard>(async ():Promise<Shard[]> => {
    const shards:Shard[] = [];
    for (const {files, ...shard} of baseShards) {
        const loadedFiles:Record<string,File> = {};
        for (const file of files) {
            const [key, loadedFile] = await pathToFile(file);

            loadedFiles[key] = loadedFile;
        }

        shards.push({
            ...shard,
            files: loadedFiles,
        });
    }

    return shards;
});


