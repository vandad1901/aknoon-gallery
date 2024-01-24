"use client";

import React, { useEffect, useState } from "react";

import SearchFilters from "@/components/ShopComponents/searchFilters";
import ShopHeader from "@/components/ShopComponents/shopHeader";
import type { artworksPossibleValuesType } from "@/config/site";
import { useSearchParams } from "next/navigation";

type props = {
    children: React.ReactNode;
    priceBounds: [number, number];
    possibleValues: artworksPossibleValuesType;
};

export default function MainShopPage({ children, priceBounds, possibleValues }: props) {
    const [areInputsDisabled, setAreInputsDisabled] = useState(false);
    const searchParams = useSearchParams();
    useEffect(() => {
        setAreInputsDisabled(false);
    }, [searchParams]);
    const filters = SearchFilters({
        priceBounds,
        possibleValues,
        areInputsDisabled,
        setAreInputsDisabled,
    });
    return (
        <>
            <ShopHeader
                areInputsDisabled={areInputsDisabled}
                setAreInputsDisabled={setAreInputsDisabled}>
                {filters}
            </ShopHeader>

            <div className="flex w-full flex-row gap-4 md:m-4 md:w-auto lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px]">
                <aside className="hidden h-min w-[16rem] rounded-xl border-2 md:block">
                    {filters}
                </aside>
                {children}
            </div>
        </>
    );
}
