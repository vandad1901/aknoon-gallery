"use client";

import * as React from "react";

import { Column, Table as TanTable, flexRender } from "@tanstack/react-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./datatablePagination";
import { DataTableToolbar } from "./datatableToolbar";
import { DebouncedInput } from "@/components/ui/input";
import { ScrollAreaThumb } from "@radix-ui/react-scroll-area";

interface DataTableProps<TData, TValue> {
    table: TanTable<TData>;
}

export function DataTable<TData, TValue>({ table }: DataTableProps<TData, TValue>) {
    return (
        <ScrollArea type="auto" dir="rtl">
            <div className="m-4 flex flex-col gap-4">
                <DataTableToolbar table={table} />
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead
                                                className="px-2"
                                                key={header.id}
                                                colSpan={header.colSpan}>
                                                <div className="flex flex-col gap-2">
                                                    {header.column.getCanFilter() ? (
                                                        <Filter
                                                            column={header.column}
                                                            table={table}
                                                        />
                                                    ) : (
                                                        <span className="text-center">
                                                            {header.isPlaceholder
                                                                ? null
                                                                : flexRender(
                                                                      header.column.columnDef
                                                                          .header,
                                                                      header.getContext(),
                                                                  )}
                                                        </span>
                                                    )}
                                                </div>
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={Math.min(3, table.getAllColumns().length)}
                                        className="h-24 text-center">
                                        نتیجه ای یافت نشد.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <DataTablePagination table={table} />
                <ScrollBar orientation="horizontal">
                    <ScrollAreaThumb />
                </ScrollBar>
            </div>
        </ScrollArea>
    );
}

function Filter({ column, table }: { column: Column<any, unknown>; table: TanTable<any> }) {
    const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

    const columnFilterValue = column.getFilterValue();
    const facetedUniqueValues = column.getFacetedUniqueValues();
    const sortedUniqueValues = React.useMemo(
        () => (typeof firstValue === "number" ? [] : Array.from(facetedUniqueValues.keys()).sort()),
        [facetedUniqueValues, firstValue],
    );

    return typeof firstValue === "number" ? (
        <div>
            <div className="flex gap-2">
                <DebouncedInput //TODO: replace with verbose sliders
                    type="number"
                    min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
                    max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
                    value={(columnFilterValue as [number, number])?.[0] ?? ""}
                    onChange={(value) =>
                        column.setFilterValue((old: [number, number]) => [value, old?.[1]])
                    }
                    placeholder={`Min ${
                        column.getFacetedMinMaxValues()?.[0]
                            ? `(${column.getFacetedMinMaxValues()?.[0]})`
                            : ""
                    }`}
                    className="w-28 rounded border shadow"
                />
                <DebouncedInput
                    type="number"
                    min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
                    max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
                    value={(columnFilterValue as [number, number])?.[1] ?? ""}
                    onChange={(value) =>
                        column.setFilterValue((old: [number, number]) => [old?.[0], value])
                    }
                    placeholder={`Max ${
                        column.getFacetedMinMaxValues()?.[1]
                            ? `(${column.getFacetedMinMaxValues()?.[1]})`
                            : ""
                    }`}
                    className="w-28 rounded border shadow"
                />
            </div>
        </div>
    ) : (
        <>
            <datalist id={column.id + "list"}>
                {sortedUniqueValues.slice(0, 5000).map((value: any) => (
                    <option value={value} key={value} />
                ))}
            </datalist>
            <DebouncedInput
                type="text"
                value={(columnFilterValue ?? "") as string}
                onChange={(value) => column.setFilterValue(value)}
                placeholder={`${column.columnDef.header} (${column.getFacetedUniqueValues().size})`}
                className="min-w-[8rem] rounded border shadow"
                list={column.id + "list"}
            />
        </>
    );
}
