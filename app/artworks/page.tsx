"use server";

import { artworks as Artwork, Prisma } from "@prisma/client";
import { artworksFields, artworksPossibleValuesType } from "@/config/site";

import ArtworksPagination from "@/components/ShopComponents/artworksPagination";
import Image from "next/image";
import MainShopPage from "@/components/ShopComponents/mainShopPage";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
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
        <div className="flex w-full flex-col items-center md:w-auto">
            <MainShopPage priceBounds={priceBounds} possibleValues={possibleValues}>
                <div className="relative flex w-full flex-col gap-5 md:w-auto">
                    {artworks.length === 0 && (
                        <div className="absolute right-1/2 top-10 z-10 flex translate-x-1/2 justify-center rounded-xl bg-white">
                            <h1 className="font-semi rounded-xl border-2 p-6 text-2xl">
                                اثری با این مشخصات یافت نشد
                            </h1>
                        </div>
                    )}
                    <div
                        className={cn(
                            "grid min-h-[14rem] w-full grid-cols-2 gap-[2px] sm:grid-cols-3 md:min-h-[22rem] md:gap-2 xl:grid-cols-4",
                            artworks.length === 0 &&
                                "[&>*:nth-child(n+5)]:hidden sm:[&>*:nth-child(n+5)]:flex sm:[&>*:nth-child(n+7)]:hidden xl:[&>*:nth-child(n+7)]:flex xl:[&>*:nth-child(n+9)]:hidden",
                        )}>
                        {artworks.length !== 0
                            ? artworks.map((a) => <ArtworkCard key={a.ID} artwork={a} />)
                            : Array.from({ length: 12 }).map((_, i) => (
                                  <ArtworkCardSkeleton key={i} />
                              ))}
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
        <div className="flex h-[14rem] w-full flex-col gap-2 p-2 outline outline-2 outline-border md:h-[22rem] md:rounded-xl md:border-2 md:outline-0">
            <div className="flex items-center justify-center ">
                <Image
                    src={placeholder}
                    alt="جا گیرنده مکان"
                    className="h-32 w-32 object-contain md:h-64 md:w-64"
                />
            </div>
            <div className="flex flex-grow flex-col justify-between">
                <p className="max-w-32 md:max-w-64 line-clamp-2 text-ellipsis text-sm md:text-base">
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

function ArtworkCardSkeleton() {
    return (
        <div className="flex h-[14rem] w-full flex-col gap-2 p-2 outline outline-2 outline-border md:h-[22rem] md:rounded-xl md:border-2 md:outline-0">
            <div className="flex items-center justify-center">
                <div className="h-32 w-32 object-contain p-2 md:h-64 md:w-64">
                    <Skeleton className="h-full w-full"></Skeleton>
                </div>
            </div>
            <div className="flex flex-grow flex-col justify-between">
                <Skeleton className="h-5 w-full rounded-lg"></Skeleton>
                <Skeleton className="h-5 w-2/5 rounded-lg"></Skeleton>
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
