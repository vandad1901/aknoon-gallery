"use server";

import { artworks as Artwork, Prisma } from "@prisma/client";
import { artworksFields, artworksPossibleValuesType } from "@/config/site";

import ArtworksPagination from "@/components/ShopComponents/artworksPagination";
import Image from "next/image";
import MainShopPage from "@/components/ShopComponents/mainShopPage";
import React from "react";
import { getPrismaWhereObject } from "@/lib/utils";
import placeholder from "@/public/artworksPlaceholder.svg";
import prisma from "@/lib/db";
import type { searchParamType } from "@/lib/utils";

type props = { searchParams: searchParamType };

export default async function Page({ searchParams }: props) {
    const [artworks, priceBounds, possibleValues, totalPages] = await Promise.all([
        fetchArtworks(searchParams),
        fetchPriceBounds(searchParams),
        fetchPossibleValues(searchParams),
        fetchPageInfo(searchParams),
    ]);
    const currentPage = Number(searchParams.page) || 1;
    return (
        <div className="flex flex-col items-center">
            <MainShopPage priceBounds={priceBounds} possibleValues={possibleValues}>
                <div className="flex flex-col gap-5">
                    <div className="grid min-h-[14rem] w-full grid-cols-2 sm:grid-cols-3 md:min-h-[22rem] md:gap-2 xl:grid-cols-4">
                        {artworks.length !== 0 ? (
                            artworks.map((a) => <ArtworkCard key={a.ID} artwork={a} />)
                        ) : (
                            <div className="absolute top-10 flex justify-center">
                                <h1 className="text-xl">اثری با این مشخصات یافت نشد</h1>
                            </div>
                        )}
                    </div>
                    <ArtworksPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        searchParams={searchParams}
                    />
                </div>
            </MainShopPage>
        </div>
    );
}

type ArtworkCardProps = { artwork: Artwork };

function ArtworkCard({ artwork }: ArtworkCardProps) {
    return (
        <div className="flex h-[14rem] w-full flex-col gap-2 border border-t-0 p-2 even:border-r-0 md:h-[22rem] md:rounded-xl md:!border-2 [&:nth-child(-n_+_2)]:border-t">
            <div className="flex items-center justify-center ">
                <Image
                    src={placeholder}
                    alt="جا گیرنده مکان"
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
    const whereObject = getPrismaWhereObject(searchParams);
    return await prisma.artworks.findMany({
        take: 12,
        skip: (Number(searchParams.page) - 1) * 12 || 0,
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

async function fetchPageInfo(searchParams: searchParamType) {
    const whereObject = getPrismaWhereObject(searchParams);
    const count = await prisma.artworks.count({ where: { ...whereObject } });
    return count % 12 === 0 ? count / 12 : count / 12 + 1;
}
