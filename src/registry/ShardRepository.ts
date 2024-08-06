import {getFile} from "@/hooks/getFile";
import Fuse, {Expression, FuseSearchOptions, IFuseOptions} from "fuse.js";

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
    files: File[],
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
    private loaded: boolean = false;
    private readonly items: T[] = [];
    private index!: Fuse<T>;

    constructor(
        private readonly getItems: () => Promise<T[]>,
        private readonly indexOptions: IFuseOptions<T>,
    ) {
    }

    async getAll(): Promise<T[]> {
        await this.loadData();

        return this.items;
    }

    async getKeys(): Promise<string[]> {
        await this.loadData();

        return Array.from(Object.keys(this.items));
    }

    async find(callback: (item: T) => boolean): Promise<T | undefined> {
        await this.loadData();

        for (const item of this.items) {
            if (callback(item)) {
                return item;
            }
        }

        return undefined;
    }

    async search(query?: string | Expression, options?: FuseSearchOptions): Promise<T[]> {
        await this.loadIndex();

        if (!query) {
            return this.getAll();
        }

        return this.index.search(query, options).map(result => result.item);
    }

    private async loadData(): Promise<void> {
        if (this.loaded || this.items.length > 0) {
            return;
        }

        this.items.push(...await this.getItems());

        this.loaded = true;
    }

    private async loadIndex(): Promise<void> {
        await this.loadData();
        if (this.index) {
            return;
        }

        this.index = new Fuse<T>(await this.getAll(), this.indexOptions);
    }
}

export const ShardRepository: Repository<Shard> = new Repository<Shard>(
    async (): Promise<Shard[]> => {
        const shards: Shard[] = [];
        for (const {files, ...shard} of baseShards) {
            const loadedFiles: File[] = [];
            for (const file of files) {
                const [, loadedFile] = await pathToFile(file);

                loadedFiles.push(loadedFile);
            }

            shards.push({
                ...shard,
                files: loadedFiles,
            });
        }

        return shards;
    },
    {
        keys: [
            "name",
            "creator",
            "description",
            "categories",
            "files.identifier",
            "files.path",
            "files.domain",
            "files.code",
        ],
    }
);


