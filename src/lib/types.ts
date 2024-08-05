import {ReactNode} from "react";

type Params = {
    item: string | string[] | undefined,
} & Record<string, string | undefined>;

export type PageProps<SearchProps extends Record<string, unknown> = {}> = Readonly<{
    params: Params,
    searchParams: SearchProps & { [key: string]: string | string[] | undefined },
}>

export type LayoutProps = Readonly<{
    params: Params,
    children: ReactNode;
}>;