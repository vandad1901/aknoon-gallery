"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useCallback, useEffect, useState } from "react";
import { artworksPossibleValuesType, persianArtworksFields } from "@/config/site";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Checkbox } from "../ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Slider } from "@/components/ui/slider";

type props = { priceBounds: number[]; possibleValues: artworksPossibleValuesType };

export default function SearchFilters({ priceBounds, possibleValues }: props) {
    const [bounds, setBounds] = useState(priceBounds);
    const [areInputsDisabled, setAreInputsDisabled] = useState(false);
    const [currentSearchingField, setCurrentSearchingField] = useState<
        keyof artworksPossibleValuesType | null
    >(null);
    const [searchText, setSearchText] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    useEffect(() => {
        setAreInputsDisabled(false);
    }, [searchParams]);
    const createQueryString = useCallback(
        (key: string, value: string, checked: boolean) => {
            const params = new URLSearchParams(searchParams);
            if (!checked && params.getAll(key).includes(value)) {
                const updatedNames = params.getAll(key).filter((val) => val !== value);
                params.delete(key);
                updatedNames.forEach((val) => params.append(key, val));
            } else if (checked) {
                params.append(key, value);
            }
            return params.toString();
        },
        [searchParams],
    );

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
                                pathname + "?" + createQueryString(key, value, checked as boolean),
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
                            <Input
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

    return (
        <div className="h-min w-1/5 rounded-xl border-2">
            <div className="flex flex-col gap-2 px-4 pt-4">
                <div className="flex flex-row justify-between">
                    <p>{(bounds[1] * 1000).toLocaleString("fa-IR")}</p>
                    <p>{(bounds[0] * 1000).toLocaleString("fa-IR")}</p>
                </div>
                <Slider
                    disabled={areInputsDisabled}
                    defaultValue={priceBounds}
                    step={1}
                    minStepsBetweenThumbs={1}
                    min={priceBounds[0]}
                    max={priceBounds[1]}
                    onValueChange={setBounds}
                    onValueCommit={(value) => {
                        router.push(
                            pathname +
                                "?" +
                                new URLSearchParams({ price: value.join("-") }).toString(),
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
        </div>
    );
}
