import {Badge} from "@/components/ui/Badge";
import {Button} from "@/components/ui/Button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/Card";
import {fetchShard} from "@/lib/data";
import {LayoutProps} from "@/lib/types";
import {Shard} from "@/registry/Repository/ShardRepository";
import {clsx} from "clsx";
import Link from "next/link";
import {redirect} from "next/navigation";
import {ReactElement} from "react";

export default async function Layout({children, params}: LayoutProps<{ slug: string }>): Promise<ReactElement> {
    const slug = params.slug;

    let shard: Shard | undefined;

    try {
        shard = await fetchShard(decodeURIComponent(slug));
    } catch (e) {
        redirect('/shards');
    }

    const {name, creator, categories: unfilteredCategories, description} = shard;

    //TODO find a better way to search for command group names than adding shard/theme
    const categories = unfilteredCategories?.filter(category => category !== 'shard');

    const hasCategories = categories && categories.length > 0;

    return <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className={clsx(' grid  flex-1 auto-rows-max gap-4')}>
            <div className="flex items-center gap-4 justify-between">
                <span>
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-2xl font-bold tracking-tight sm:grow-0">
                    {name}
                </h1>
                <Link href={`/shards?creator=${creator}`} className="text-xs text-muted-foreground">
                    By
                    <Button variant="link" className="px-1">
                       {creator}
                    </Button>
                </Link>
                </span>

                {hasCategories ? categories.map(category => <Link key={category}
                                                                  href={`/shards?category=${category}`}>
                    <Badge variant="default" className="ml-auto sm:ml-0 capitalize text-xs">
                        {category}
                    </Badge>
                </Link>) : undefined}
            </div>
            {description ? <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold">
                        Description
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground">
                        {description}
                    </p>
                </CardContent>
            </Card> : undefined}

            {children}
        </div>
    </main>;
}