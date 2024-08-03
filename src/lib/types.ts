export type PageProps<SearchProps extends Record<string, unknown> = {}> = {
    params: { slug?: string }
    searchParams: { [key: string]: string | string[] | undefined } & SearchProps
}

export type Shard = {
    name: string,
    creator?: string,
    description?: string,
    files: string[],
    categories?: string[],
}