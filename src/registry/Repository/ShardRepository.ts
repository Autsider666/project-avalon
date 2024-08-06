import {getFile} from "@/hooks/getFile";
import {BaseRepository} from "@/registry/Repository/BaseRepository";

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


let repositoryLoaded: boolean = false;

export const ShardRepository: BaseRepository<Shard> = new BaseRepository<Shard>(
    async (): Promise<Shard[]> => {
        if (repositoryLoaded) {
            return [];
        }

        const shards: Shard[] = [];
        for (const {files, ...shard} of baseShards) {
            const loadedFiles: File[] = [];
            for (const file of files) {
                const [, loadedFile] = await pathToFile(file);

                loadedFiles.push(loadedFile);
            }

            shards.push({
                ...shard,
                categories: [...(shard.categories ?? []), 'shard'],
                files: loadedFiles,
            });
        }

        repositoryLoaded = true;

        return shards;
    },
    {
        includeScore: true,
        includeMatches: true,
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


