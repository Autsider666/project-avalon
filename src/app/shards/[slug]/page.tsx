import {CodeBlock} from "@/components/CodeBlock";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/Accordion";
import {Badge} from "@/components/ui/Badge";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/Card";
import {fetchShard} from "@/lib/data";
import {PageProps, Shard} from "@/lib/types";
import {clsx} from "clsx";
import Link from "next/link";
import {redirect} from "next/navigation";
import {ReactElement} from "react";

export default async function ShardPage({params}: PageProps): Promise<ReactElement> {
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

    const {name, creator, categories, description, files} = shard;

    const hasCategories = categories && categories.length > 0;

    return <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className={clsx(
            ' grid  flex-1 auto-rows-max gap-4',
            {
                // 'mx-auto max-w-[59rem]': hasCategories,
            }
        )}>
            <div className="flex items-center gap-4">
                {/*<Button variant="outline" size="icon" className="h-7 w-7">*/}
                {/*    <ChevronLeft className="h-4 w-4"/>*/}
                {/*    <span className="sr-only">Back</span>*/}
                {/*</Button>*/}
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    {name}
                </h1>
                <Link href={`/shards?creator=${creator}`}>
                    <Badge variant="outline" className="ml-auto sm:ml-0">
                        By {creator}
                    </Badge>
                </Link>
                {/*<div className="hidden items-center gap-2 md:ml-auto md:flex">*/}
                {/*    <Button variant="outline" size="sm">*/}
                {/*        Discard*/}
                {/*    </Button>*/}
                {/*    <Button size="sm">Save Product</Button>*/}
                {/*</div>*/}
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
            <div className={`grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8`}>
                <div className={clsx(`grid auto-rows-max items-start gap-4 lg:gap-8 lg:col-span-3`)}>
                    <Card x-chunk="A card with a form to edit the product stock and variants">
                        <CardHeader>
                            <CardTitle>Files</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible defaultValue={files[0]}>
                                {files.map(filePath =>
                                    <AccordionItem key={filePath} value={filePath}>
                                        <AccordionTrigger>{filePath}</AccordionTrigger>
                                        <AccordionContent>
                                            <CodeBlock filePath={filePath}/>
                                        </AccordionContent>
                                    </AccordionItem>)}
                            </Accordion>
                        </CardContent>
                        {/*<CardFooter className="justify-center border-t p-4">*/}
                        {/*    <Button size="sm" variant="ghost" className="gap-1">*/}
                        {/*        <PlusCircle className="h-3.5 w-3.5"/>*/}
                        {/*        Add Variant*/}
                        {/*    </Button>*/}
                        {/*</CardFooter>*/}
                    </Card>
                </div>
            </div>
        </div>
    </main>;
}