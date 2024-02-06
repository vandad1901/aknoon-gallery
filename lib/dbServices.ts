import { artworksFields, artworksPossibleValuesType } from "@/config/site";

import { getPrismaWhereObject } from "@/lib/utils";
import prisma from "@/lib/db";
import type { searchParamType } from "@/lib/utils";

export async function fetchArtworks(searchParams: searchParamType) {
    const whereObject = getPrismaWhereObject(searchParams);
    return await prisma.artwork.findMany({
        take: 12,
        skip: (Number(searchParams.page) - 1) * 12 || 0,
        where: whereObject,
    });
}

export async function fetchPossibleValues(searchParams?: searchParamType) {
    const valuesArray = await prisma.$transaction(
        artworksFields.map((field) =>
            prisma.artwork.findMany({ distinct: [field], select: { [field]: true } }),
        ),
    );
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
