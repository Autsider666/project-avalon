import {Badge} from "@/components/ui/Badge";
import {Button} from "@/components/ui/Button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/DropdownMenu";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/Table";
import {fetchFilteredShards} from "@/lib/data";
import {MoreHorizontal} from "lucide-react";
import Link from "next/link";
import {ReactElement} from "react";

type ShardTableProps = {
    query: string,
    currentPage: number,
}

export async function ShardTable({query, currentPage}: ShardTableProps): Promise<ReactElement> {
    const shards = await fetchFilteredShards(query, currentPage);
    return <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">
                    Creator
                </TableHead>
                <TableHead>
                    <span className="sr-only">Actions</span>
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {shards.map(
                ({name, creator, categories = []}) =>
                    <Link key={name} href={`/shards/${name}`} legacyBehavior={true}>
                        <TableRow>
                            <TableCell className="font-medium">{name}</TableCell>
                            <TableCell>
                                {categories.map(category => <Badge key={category} variant="outline">{category}</Badge>)}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{creator}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            aria-haspopup="true"
                                            size="icon"
                                            variant="ghost"
                                        >
                                            <MoreHorizontal className="h-4 w-4"/>
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                        <DropdownMenuItem>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    </Link>
            )}
        </TableBody>
    </Table>
        ;
}