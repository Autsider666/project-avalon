import {ReactNode} from "react";

export type PageProps<ParamProps extends Record<string, unknown> = {}, SearchProps extends Record<string, unknown> = {}> = Readonly<{
    params: ParamProps,
    searchParams: SearchProps,
}>

export type LayoutProps<ParamProps extends Record<string, unknown> = {}> = Readonly<{
    params: ParamProps,
    children: ReactNode;
}>;