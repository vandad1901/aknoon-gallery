"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useState } from "react";
import { ReadonlyToObject, UpdateQueryStringKV, addQueryStringKV } from "@/lib/utils";
import { artworksPossibleValuesType, persianArtworksFields } from "@/config/site";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchInput } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

type props = {
    priceBounds: number[];
    possibleValues: artworksPossibleValuesType;
    areInputsDisabled: boolean;
    setAreInputsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchFilters({
    priceBounds,
    possibleValues,
    areInputsDisabled,
    setAreInputsDisabled,
}: props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [bounds, setBounds] = useState([
        Number(searchParams.get("price")?.split("-")[0]) || priceBounds[0],
        Number(searchParams.get("price")?.split("-")[1]) || priceBounds[1],
    ]);
    const [currentSearchingField, setCurrentSearchingField] = useState<
        keyof artworksPossibleValuesType | null
    >(null);
    const [searchText, setSearchText] = useState("");

    const fieldCheckboxes = (key: keyof artworksPossibleValuesType, possibleValues: string[]) =>
        possibleValues
            .filter((val) => key != currentSearchingField || val.includes(searchText))
            .map((value) => (
                <div key={value} className="flex flex-row items-center gap-2 py-[0.375rem]">
                    <Checkbox
                        className="disabled:cursor-wait"
                        id={value}
                        defaultChecked={searchParams.has(key, value)}
                        onCheckedChange={(checked) => {
                            setAreInputsDisabled(true);
                            router.push(
                                pathname +
                                    "?" +
                                    addQueryStringKV(
                                        key,
                                        value,
                                        checked as boolean,
                                        ReadonlyToObject(searchParams),
                                    ),
                                { scroll: false },
                            );
                        }}
                        disabled={areInputsDisabled}
                    />
                    <label htmlFor={value} className="text-sm leading-none">
                        {value}
                    </label>
                </div>
            ));

    const accordionItems = (key: keyof artworksPossibleValuesType, possibleValues: string[]) =>
        possibleValues.length > 0 && (
            <AccordionItem key={key} value={key}>
                <AccordionTrigger>
                    <p className="text-base font-medium">
                        {persianArtworksFields[key as keyof typeof persianArtworksFields]}
                    </p>
                </AccordionTrigger>
                <AccordionContent className="m-1 flex flex-col gap-3">
                    {possibleValues.length > 5 ? (
                        <>
                            <SearchInput
                                className="mb-2"
                                type="search"
                                icon={true}
                                id={key}
                                onChange={(e) => {
                                    setCurrentSearchingField(
                                        key as keyof artworksPossibleValuesType,
                                    );
                                    setSearchText(e.target.value);
                                }}
                                value={currentSearchingField != key ? "" : searchText}
                            />
                            <ScrollArea dir="rtl" className="h-40">
                                {fieldCheckboxes(key, possibleValues)}
                            </ScrollArea>
                        </>
                    ) : (
                        <div>{fieldCheckboxes(key, possibleValues)}</div>
                    )}
                </AccordionContent>
            </AccordionItem>
        );
    const filters = (
        <div className="flex flex-col gap-2 pt-4 md:px-4">
            <div className="flex flex-row justify-between">
                <p>{(bounds[1] * 1000).toLocaleString("fa-IR")}</p>
                <p>{(bounds[0] * 1000).toLocaleString("fa-IR")}</p>
            </div>
            <Slider
                disabled={areInputsDisabled}
                defaultValue={bounds}
                step={1}
                minStepsBetweenThumbs={1}
                min={priceBounds[0]}
                max={priceBounds[1]}
                onValueChange={setBounds}
                onValueCommit={(value) => {
                    setAreInputsDisabled(true);
                    router.push(
                        pathname +
                            "?" +
                            UpdateQueryStringKV(
                                "price",
                                value.join("-"),
                                ReadonlyToObject(searchParams),
                            ),
                        { scroll: false },
                    );
                }}
            />
            <Accordion
                className="[&>*:last-child]:border-0"
                type="multiple"
                defaultValue={Array.from(searchParams.keys())}>
                {Object.entries(possibleValues).map(([key, possibleValues]) =>
                    accordionItems(key as keyof artworksPossibleValuesType, possibleValues),
                )}
            </Accordion>
        </div>
    );
    return filters;
}
