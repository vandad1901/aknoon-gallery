import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { UpdateQueryStringKV, type searchParamType } from "@/lib/utils";

type props = { currentPage: number; totalPages: number; searchParams: searchParamType };

export default function ArtworksPagination({ currentPage, totalPages, searchParams }: props) {
    return (
        <Pagination className="flex-grow">
            <PaginationContent>
                <PaginationPrevious
                    isActive={currentPage > 1}
                    href={`artworks?${UpdateQueryStringKV(
                        "page",
                        (currentPage - 1).toString(),
                        searchParams,
                    )}`}
                />
                {paginationPageNumbers(currentPage, totalPages).map((pageNumber, i) =>
                    typeof pageNumber === "number" ? (
                        <PaginationLink
                            key={i}
                            isActive={pageNumber !== currentPage}
                            href={`artworks?${UpdateQueryStringKV(
                                "page",
                                pageNumber.toString(),
                                searchParams,
                            )}`}>
                            {pageNumber}
                        </PaginationLink>
                    ) : (
                        <PaginationEllipsis key={i} />
                    ),
                )}
                <PaginationNext
                    isActive={currentPage < totalPages}
                    href={`artworks?${UpdateQueryStringKV(
                        "page",
                        (currentPage + 1).toString(),
                        searchParams,
                    )}`}></PaginationNext>
            </PaginationContent>
        </Pagination>
    );
}

function paginationPageNumbers(currentPage: number, totalPages: number) {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
        return [1, 2, 3, 4, 5, 6, "...", totalPages];
    }
    if (currentPage > totalPages - 4) {
        return [
            1,
            "...",
            totalPages - 5,
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
        ];
    }
    return [
        1,
        "...",
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
        "...",
        totalPages,
    ];
}
