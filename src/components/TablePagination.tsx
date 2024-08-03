"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/Pagination";
import {generatePagination} from "@/lib/utils";
import {usePathname, useSearchParams} from "next/navigation";
import {ReactElement} from "react";

type TablePaginationProps = { totalPages: number };

export function TablePagination({totalPages}: TablePaginationProps): ReactElement {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const allPages = generatePagination(currentPage, totalPages);

    return <Pagination className="grow">
        <PaginationContent>
            {currentPage > 1 ? <PaginationItem>
                <PaginationPrevious href={createPageURL(currentPage - 1)}/>
            </PaginationItem> : undefined}

            {allPages.map(page => (
                <PaginationItem key={page}>
                    {page === '...'
                        ? <PaginationEllipsis/>
                        : <PaginationLink href={createPageURL(Number(page))} isActive={page === currentPage}>
                            {page}
                        </PaginationLink>}
                </PaginationItem>
            ))}

            {currentPage < totalPages ? <PaginationItem>
                <PaginationNext href={createPageURL(currentPage - 1)}/>
            </PaginationItem> : undefined}
        </PaginationContent>
    </Pagination>;
}