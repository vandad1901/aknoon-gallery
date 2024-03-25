"use client";

import { ColumnDef, SortingFn, sortingFns } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RankingInfo, compareItems } from "@tanstack/match-sorter-utils";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export type ArtworkRow = {
    ID: string;
    artist: String;
    name: String;
    buy_price: Number;
    sell_price: Number;
    category: String;
    sub_category: String;
    form: String;
    stone_type: String;
    size: String;
    color: String;
    material: String;
    technique: String;
    style: String;
};

declare module "@tanstack/react-table" {
    interface FilterMeta {
        itemRank: RankingInfo;
    }
}

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
    let dir = 0;

    // Only sort by rank if the column has ranking information
    if (rowA.columnFiltersMeta[columnId]) {
        dir = compareItems(
            rowA.columnFiltersMeta[columnId]?.itemRank!,
            rowB.columnFiltersMeta[columnId]?.itemRank!,
        );
    }

    // Provide an alphanumeric fallback for when the item ranks are equal
    return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

export const columns: ColumnDef<ArtworkRow>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="box-content"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
        enableColumnFilter: false,
    },
    { accessorKey: "ID", header: "کد" },
    { accessorKey: "artist", header: "آرتیست", sortingFn: fuzzySort, filterFn: "fuzzy" },
    { id: "name", accessorKey: "name", header: "نام", sortingFn: fuzzySort, filterFn: "fuzzy" },
    {
        accessorKey: "buy_price",
        header: "خرید",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("buy_price"));
            const formatted = amount.toLocaleString("fa-IR");

            return formatted;
        },
    },
    {
        accessorKey: "sell_price",
        header: "فروش",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("sell_price"));
            const formatted = amount.toLocaleString("fa-IR");

            return formatted;
        },
    },
    {
        accessorKey: "category",
        header: "گروه اصلی",
    },
    {
        accessorKey: "sub_category",
        header: "گروه فرعی",
    },
    { accessorKey: "form", header: "فرم", sortingFn: fuzzySort, filterFn: "fuzzy" },
    { accessorKey: "stone_type", header: "نوع سنگ", sortingFn: fuzzySort, filterFn: "fuzzy" },
    { accessorKey: "size", header: "اندازه" },
    { accessorKey: "color", header: "رنگ", sortingFn: fuzzySort, filterFn: "fuzzy" },
    { accessorKey: "material", header: "متریال", sortingFn: fuzzySort, filterFn: "fuzzy" },
    { accessorKey: "technique", header: "تکنیک", sortingFn: fuzzySort, filterFn: "fuzzy" },
    { accessorKey: "style", header: "استایل", sortingFn: fuzzySort, filterFn: "fuzzy" },
    {
        enableColumnFilter: false,
        id: "عملیات",
        header: "عملیات",
        cell: ({ row }) => {
            return (
                //TODO: Add edit and delete functionality
                <DropdownMenu dir="rtl">
                    <DropdownMenuTrigger asChild>
                        <Button variant={"outline"} className="px-2EDT">
                            عملیات
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40">
                        <DropdownMenuItem asChild>
                            <Button variant={"ghost"} className="w-full">
                                ویرایش
                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Button variant={"ghost"} className="w-full">
                                حذف
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
