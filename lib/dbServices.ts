"use server";

import { artworksFields, artworksPossibleValuesType } from "@/config/site";

import { getPrismaWhereObject } from "@/lib/artworksUtils";
import prisma from "@/lib/db";
import type { searchParamType } from "@/lib/artworksUtils";

export async function fetchArtworks(searchParams: searchParamType) {
    const whereObject = getPrismaWhereObject(searchParams);
    return await prisma.artwork.findMany({
        take: 12,
        skip: (Number(searchParams.page) - 1) * 12 || 0,
        where: whereObject,
    });
}

export async function fetchPossibleValues(searchParams?: searchParamType) {
    const valuesArray = await prisma.$transaction([
        prisma.artwork.findMany({ distinct: "sub_category", select: { sub_category: true } }),
        prisma.artwork.findMany({ distinct: "name", select: { name: true } }),
        prisma.artwork.findMany({ distinct: "material", select: { material: true } }),
        prisma.artwork.findMany({ distinct: "technique", select: { technique: true } }),
        prisma.artwork.findMany({ distinct: "style", select: { style: true } }),
        prisma.artwork.findMany({ distinct: "form", select: { form: true } }),
        prisma.artwork.findMany({ distinct: "size", select: { size: true } }),
        prisma.artwork.findMany({ distinct: "color", select: { color: true } }),
        prisma.artwork.findMany({ distinct: "stone_type", select: { stone_type: true } }),
    ]);
    const possibleValues = Object.fromEntries(
        artworksFields.map((field, index) => {
            const distinctValues = valuesArray[index] as { [field: string]: string }[];
            const values = distinctValues
                .map((v) => v[field])
                .filter((v) => v != null)
                .flatMap((v) => v.split("،"));
            return [field, Array.from(new Set(values)).sort((a, b) => a.localeCompare(b))];
        }),
    );
    return possibleValues as artworksPossibleValuesType;
}
export async function fetchPriceBounds(searchParams: searchParamType) {
    const priceBounds = await prisma.artwork.aggregate({
        _max: { sell_price: true },
        _min: { sell_price: true },
    });
    const lowestPrice = priceBounds._min?.sell_price?.toNumber() || 0;
    const highestPrice = priceBounds._max?.sell_price?.toNumber() || 0;
    return [lowestPrice, highestPrice] as [number, number];
}

export async function fetchPageInfo(searchParams: searchParamType) {
    const whereObject = getPrismaWhereObject(searchParams);
    const count = await prisma.artwork.count({ where: whereObject });
    return Math.max(Math.ceil(count / 12), 1);
}

export async function fetchArtworksRows(searchParams: searchParamType) {
    const whereObject = getPrismaWhereObject(searchParams);
    const [res, count] = await prisma.$transaction([
        prisma.artwork.findMany({
            where: whereObject,
        }),
        prisma.artwork.count({ where: whereObject }),
    ]);

    const pickedData = res.map((row) => {
        return {
            ID: row.ID,
            artist: row.artist,
            name: row.name || "",
            buy_price: Number(row.buy_price),
            sell_price: Number(row.sell_price),
            category: row.category == "decor" ? "دکوراسیون" : "استایل",
            sub_category: row.sub_category,
            form: row.form || "",
            stone_type: row.stone_type || "",
            size: row.size || "",
            color: row.color || "",
            material: row.material || "",
            technique: row.technique || "",
            style: row.style || "",
        };
    });

    return pickedData;
}
