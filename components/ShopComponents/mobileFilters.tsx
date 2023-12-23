"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";

export default function MobileFilters({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
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
        </div>
    );
}
