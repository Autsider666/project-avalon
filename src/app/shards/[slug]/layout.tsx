import {Badge} from "@/components/ui/Badge";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/Card";
import {fetchShard} from "@/lib/data";
import {LayoutProps} from "@/lib/types";
import {Shard} from "@/registry/ShardRegister";
import {clsx} from "clsx";
import Link from "next/link";
import {redirect} from "next/navigation";
import {ReactElement} from "react";

export default async function Layout({children, params}: LayoutProps): Promise<ReactElement> {
    const slug = params?.slug;
    if (!slug) {
        redirect('/shards');
    }

    let shard: Shard | undefined;

    try {
        shard = await fetchShard(decodeURIComponent(slug));
    } catch (e) {
        redirect('/shards');
    }

    const activeFile = Object.values(shard.files)[0].identifier;

    const {name, creator, categories, description} = shard;

    const hasCategories = categories && categories.length > 0;

    return <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className={clsx(' grid  flex-1 auto-rows-max gap-4')}>
            <div className="flex items-center gap-4">
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    {name}
                </h1>
                <Link href={`/shards?creator=${creator}`}>
                    <Badge variant="outline" className="ml-auto sm:ml-0">
                        By {creator}
                    </Badge>
                </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-1 md:gap-8 lg:grid-cols-3">
                <Card className="col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            <div className="text-2xl font-bold">Description</div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/*<div className="text-2xl font-bold">$45,231.89</div>*/}
                        <p className="text-xs text-muted-foreground">
                            {description ?? <i>Empty</i>}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            <div className="text-2xl font-bold">Categories</div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="text-xs text-muted-foreground">
                            {hasCategories ? categories.map(category => <Link key={category}
                                                                              href={`/shards?category=${category}`}>
                                <Badge variant="outline" className="ml-auto sm:ml-0">
                                    {category}
                                </Badge>
                            </Link>) : <i>Empty</i>}
                        </span>
                    </CardContent>
                </Card>
            </div>
            {children}
        </div>
    </main>;
}