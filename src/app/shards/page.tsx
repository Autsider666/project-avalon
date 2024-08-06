import {ShardTable} from "@/components/shards/ShardTable";
import {TablePagination} from "@/components/TablePagination";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/Card";
import {fetchFilteredShardCount, fetchShardPages} from "@/lib/data";
import {PageProps} from "@/lib/types";
import {ReactElement, Suspense} from "react";

type SearchParams = {
    search?: string,
    page?: string,
}

export default async function ShardsPage({searchParams}: PageProps<SearchParams>): Promise<ReactElement> {
    const query = Array.isArray(searchParams?.query) ? searchParams?.query.join(' ') : searchParams?.query || '';
    const shardsPerPage: number = 20;
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchShardPages(query, shardsPerPage);
    const totalShards = await fetchFilteredShardCount(query);

    return <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        {/*<Tabs defaultValue="all">*/}
        {/*    <div className="flex items-center">*/}
        {/*        <TabsList>*/}
        {/*            <TabsTrigger value="all">All</TabsTrigger>*/}
        {/*            <TabsTrigger value="active">Active</TabsTrigger>*/}
        {/*            <TabsTrigger value="draft">Draft</TabsTrigger>*/}
        {/*            <TabsTrigger value="archived" className="hidden sm:flex">*/}
        {/*                Archived*/}
        {/*            </TabsTrigger>*/}
        {/*        </TabsList>*/}
        {/*        <div className="ml-auto flex items-center gap-2">*/}
        {/*            <DropdownMenu>*/}
        {/*                <DropdownMenuTrigger asChild>*/}
        {/*                    <Button variant="outline" size="sm" className="h-8 gap-1">*/}
        {/*                        <ListFilter className="h-3.5 w-3.5"/>*/}
        {/*                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">*/}
        {/*                Filter*/}
        {/*              </span>*/}
        {/*                    </Button>*/}
        {/*                </DropdownMenuTrigger>*/}
        {/*                <DropdownMenuContent align="end">*/}
        {/*                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>*/}
        {/*                    <DropdownMenuSeparator/>*/}
        {/*                    <DropdownMenuCheckboxItem checked>*/}
        {/*                        Active*/}
        {/*                    </DropdownMenuCheckboxItem>*/}
        {/*                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>*/}
        {/*                    <DropdownMenuCheckboxItem>*/}
        {/*                        Archived*/}
        {/*                    </DropdownMenuCheckboxItem>*/}
        {/*                </DropdownMenuContent>*/}
        {/*            </DropdownMenu>*/}
        {/*            <Button size="sm" variant="outline" className="h-8 gap-1">*/}
        {/*                <File className="h-3.5 w-3.5"/>*/}
        {/*                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">*/}
        {/*            Export*/}
        {/*          </span>*/}
        {/*            </Button>*/}
        {/*            <Button size="sm" className="h-8 gap-1">*/}
        {/*                <PlusCircle className="h-3.5 w-3.5"/>*/}
        {/*                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">*/}
        {/*            Add Product*/}
        {/*          </span>*/}
        {/*            </Button>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*    <TabsContent value="all">*/}
        <Card
            x-chunk="A list of shards">
            <CardHeader>
                <CardTitle>Shards</CardTitle>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>1-{totalShards - ((currentPage - 1) * shardsPerPage)}</strong> of <strong>{totalShards}</strong>{" "}Shards
                </div>
            </CardHeader>
            <CardContent>

                <Suspense key={`${query}-${currentPage}`}>
                    <ShardTable query={query} currentPage={currentPage}/>
                </Suspense>
            </CardContent>
            <CardFooter>
                <TablePagination totalPages={totalPages}/>
            </CardFooter>
        </Card>
        {/*    </TabsContent>*/}
        {/*</Tabs>*/}
    </main>;
}