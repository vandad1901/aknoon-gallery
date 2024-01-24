"use client";

import { BarsArrowDownIcon, FunnelIcon } from "@heroicons/react/24/outline";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";
import { ReadonlyToObject, UpdateQueryStringKV } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "../ui/button";
import { sortFields } from "@/config/site";

type props = {
    children: React.ReactNode;
    areInputsDisabled: boolean;
    setAreInputsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ShopHeader({ children, areInputsDisabled, setAreInputsDisabled }: props) {
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
                {
                    // TODO: Make it show up on desktop too
                }
                <DropdownMenuTrigger asChild disabled={areInputsDisabled}>
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
                                pathname +
                                    "?" +
                                    UpdateQueryStringKV(
                                        "sort",
                                        value,
                                        ReadonlyToObject(searchParams),
                                    ),
                                { scroll: false },
                            );
                            setAreInputsDisabled(true);
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
