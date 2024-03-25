"use client";

import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "./datatableViewOptions";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
    const isFiltered =
        table.getState().columnFilters.length > 0 || table.getState().globalFilter !== null;

    return (
        <div className="flex flex-col items-start gap-4">
            <DataTableViewOptions table={table} />
            <div className="flex items-center gap-2">
                <Input
                    placeholder="سرچ بر اساس نام..."
                    value={table.getState().globalFilter ?? ""}
                    onChange={(event) => table.setGlobalFilter(event.target.value)}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => {
                            table.resetColumnFilters();
                            table.setGlobalFilter(null);
                        }}
                        className="h-8 px-2 lg:px-3">
                        ریست
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
