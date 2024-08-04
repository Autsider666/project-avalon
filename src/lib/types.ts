export type PageProps<SearchProps extends Record<string, unknown> = {}> = {
    params: { slug?: string }
    searchParams: SearchProps & { [key: string]: string | string[] | undefined }
}