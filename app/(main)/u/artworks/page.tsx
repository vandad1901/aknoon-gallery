"use client";

import {
    ColumnFiltersState,
    FilterFn,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

import type { ArtworkRow } from "./columns";
import { DataTable } from "@/components/ui/DataTable/datatable";
import { columns } from "./columns";
import { fetchArtworksRows } from "@/lib/dbServices";
import { rankItem } from "@tanstack/match-sorter-utils";

declare module "@tanstack/react-table" {
    interface FilterFns {
        fuzzy: FilterFn<unknown>;
    }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({
        itemRank,
    });

    // Return if the item should be filtered in/out
    return itemRank.passed;
};

export default function AdminArtworks() {
    const [data, setData] = useState<ArtworkRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            columnFilters,
            globalFilter,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
    });
    useEffect(() => {
        fetchArtworksRows({})
            .then((rows) => {
                setData(rows);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);
    return <DataTable table={table} isLoading={loading} />;
}
