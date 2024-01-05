"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { sortFields } from "@/config/site";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { FunnelIcon, BarsArrowDownIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { addQueryStringKV, UpdateQueryStringKV } from "@/lib/utils";

export default function MobileFilters({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    return (
        <div className="w-full">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        className="mx-2 my-1 h-8 px-0 text-base focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                        <FunnelIcon className="h-5 w-5 stroke-gray-700" />
                        <p className="text-gray-700">فیلتر ها</p>
                        <span className="sr-only">باز کردن منو</span>
                    </Button>
                </SheetTrigger>
                <SheetContent>{children}</SheetContent>
            </Sheet>
            <DropdownMenu dir="rtl">
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="mx-2 my-1 h-8 px-0 text-base focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                        <BarsArrowDownIcon className="h-5 w-5 stroke-gray-700" />
                        <p className="text-gray-700">مرتب سازی</p>
                        <span className="sr-only">باز کردن منو</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuRadioGroup
                        value={searchParams.get("sort") || sortFields[0].value}
                        onValueChange={(value) => {
                            router.push(
                                pathname + "?" + UpdateQueryStringKV("sort", value, searchParams),
                                { scroll: false },
                            );
                        }}>
                        {sortFields.map((field, index) => (
                            <DropdownMenuRadioItem key={field.name} value={field.value}>
                                {field.name}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
