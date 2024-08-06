import Fuse, {Expression, FuseResult, FuseSearchOptions, IFuseOptions} from "fuse.js";

export class BaseRepository<T> {
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

    async search(query?: string | Expression, options?: FuseSearchOptions): Promise<{
        results: T[],
        fuse?: FuseResult<T>[]
    }> {
        await this.loadIndex();

        if (!query) {
            return {results: await this.getAll()};
        }

        const results = this.index.search(query, options);

        return {
            results: results.map(result => result.item),
            fuse: results,
        };
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