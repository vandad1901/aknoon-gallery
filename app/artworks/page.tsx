"use server";

import { artworks as Artwork, Prisma } from "@prisma/client";
import { artworksFields, artworksPossibleValuesType } from "@/config/site";

import DesktopFilters from "@/components/ShopComponents/desktopFilters";
import Image from "next/image";
import MobileFilters from "@/components/ShopComponents/mobileFilters";
import React from "react";
import SearchFilters from "@/components/ShopComponents/filtersChild";
import placeholder from "@/public/artworksPlaceholder.svg";
import prisma from "@/lib/db";

type searchParamType = { [key: string]: string | string[] | undefined };
type props = { searchParams: searchParamType };

export default async function Page({ searchParams }: props) {
    const artworks = await fetchArtworks(searchParams);
    const priceBounds = await fetchPriceBounds(searchParams);
    const possibleValues = await fetchPossibleValues(searchParams);

    return (
        <>
            <MobileFilters>
                <SearchFilters priceBounds={priceBounds} possibleValues={possibleValues} />
            </MobileFilters>

            <div className="flex flex-row gap-4 md:mx-4 md:my-4 md:mt-4">
                <DesktopFilters>
                    <SearchFilters priceBounds={priceBounds} possibleValues={possibleValues} />
                </DesktopFilters>
                {artworks.length !== 0 ? (
                    <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:gap-2 xl:grid-cols-4">
                        {artworks.map((a) => (
                            <ArtworkCard key={a.ID} artwork={a} />
                        ))}
                    </div>
                ) : (
                    <div className="flex w-full justify-center pt-10">
                        <h1 className="text-xl">اثری با این مشخصات یافت نشد</h1>
                    </div>
                )}
            </div>
        </>
    );
}

type ArtworkCardProps = { artwork: Artwork };

function ArtworkCard({ artwork }: ArtworkCardProps) {
    return (
        <div className="flex h-[14rem] w-full flex-col gap-2 border border-t-0 p-2 even:border-r-0 md:h-[22rem] md:rounded-xl md:!border-2 [&:nth-child(-n_+_2)]:border-t">
            <div className="flex aspect-square items-center justify-center ">
                <Image
                    src={placeholder}
                    alt="جاگیرنده مکان"
                    className="h-32 w-32 object-contain md:h-64 md:w-64"
                />
            </div>
            <div className="flex flex-grow flex-col justify-between">
                <p className="line-clamp-2 text-sm md:text-base">
                    {artwork.name}
                    {artwork.model && ` - ${artwork.model}`}
                </p>
                <p className="font-semibold">
                    قیمت: {(artwork.sell_price.toNumber() * 1000).toLocaleString("fa-IR")}
                </p>
            </div>
        </div>
    );
}

async function fetchArtworks(searchParams: searchParamType) {
    const whereObject = Object.fromEntries(
        artworksFields
            .filter((val) => val != "sub_category" && searchParams[val] != null)
            .map((field) => [field, { contains: searchParams[field]?.toString() || "" }]),
    );
    return await prisma.artworks.findMany({
        where: {
            sell_price: {
                gte: Number(searchParams.price?.toString().split("-")[0]) || 0,
                lte: Number(searchParams.price?.toString().split("-")[1]) || 99999999999999,
            },
            ...whereObject,
        },
    });
}

async function fetchPossibleValues(searchParams?: searchParamType) {
    const possibleValues: artworksPossibleValuesType = Object.fromEntries(
        await Promise.all(
            artworksFields.map(async (field) => {
                const distinctValues = await prisma.artworks.findMany({
                    distinct: [field],
                    select: { [field]: true } as Prisma.artworksSelect,
                });
                const values = distinctValues
                    .map((v) => v[field])
                    .filter((v) => v != null)
                    .flatMap((v) => v!.split("،"));
                return [field, Array.from(new Set(values)).sort((a, b) => a.localeCompare(b))];
            }),
        ),
    );
    return possibleValues;
}
async function fetchPriceBounds(searchParams: searchParamType) {
    const priceBounds = await prisma.artworks.aggregate({
        _max: { sell_price: true },
        _min: { sell_price: true },
    });
    const lowestPrice = priceBounds._min?.sell_price?.toNumber() || 0;
    const highestPrice = priceBounds._max?.sell_price?.toNumber() || 0;
    return [lowestPrice, highestPrice] as [number, number];
}
