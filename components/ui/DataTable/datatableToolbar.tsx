"use client";

import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "./datatableViewOptions";
import { DebouncedInput } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
    const globalFilter = table.getState().globalFilter;
    const isFiltered =
        table.getState().columnFilters.length > 0 || (globalFilter !== null && globalFilter !== "");

    return (
        <div className="flex items-center gap-4">
            <DataTableViewOptions table={table} />
            <DebouncedInput
                placeholder="سرچ در تمام ستون ها..."
                value={globalFilter ?? ""}
                onChange={(value) => table.setGlobalFilter(value)}
                className="h-10 w-[10rem] lg:w-[18rem]"
            />
            {isFiltered && (
                <Button
                    variant="ghost"
                    onClick={() => {
                        table.resetColumnFilters();
                        table.setGlobalFilter(null);
                    }}
                    className="h-10 px-2 lg:px-3">
                    ریست
                    <X className="mr-2 h-4 w-4" />
                </Button>
            )}
        </div>
    );
}
