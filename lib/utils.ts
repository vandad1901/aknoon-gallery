import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { artworksFields } from "@/config/site";
import { ReadonlyURLSearchParams } from "next/navigation";

export type searchParamType = { [key: string]: string | string[] | undefined };

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

function sortParams(params: URLSearchParams) {
    const paramsArray: [string, string][] = Array.from(params.entries());
    paramsArray.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1].localeCompare(b[1]);
        }
        return a[0].localeCompare(b[0]);
    });

    return new URLSearchParams(paramsArray);
}

export function addQueryStringKV(
    key: string,
    value: string,
    checked: boolean,
    searchParams: searchParamType,
) {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([paramKey, paramValue]) => {
        const paramValuesArray = Array.isArray(paramValue) ? paramValue : [paramValue];
        paramValuesArray.forEach((val) => {
            if (!(!checked && paramKey === key && value === val) && val && paramKey !== "page") {
                params.append(paramKey, val);
            }
        });
    });
    if (checked) {
        params.append(key, value);
    }

    return sortParams(params).toString();
}

export function UpdateQueryStringKV(key: string, value: string, searchParams: searchParamType) {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([paramKey, paramValue]) => {
        if (paramKey !== key && paramKey !== "page") {
            if (Array.isArray(paramValue)) {
                paramValue.forEach((val) => params.append(paramKey, val));
            } else if (paramValue != null) {
                params.append(paramKey, paramValue);
            }
        }
    });
    params.append(key, value);

    return sortParams(params).toString();
}

type whereType = {
    [key: string]: {
        contains?: string;
        gte?: number;
        lte?: number;
    };
};
export function getPrismaWhereObject(searchParams: searchParamType): whereType {
    return {
        ...Object.fromEntries(
            artworksFields
                .filter((val) => val != "sub_category" && searchParams[val] != null)
                .map((field) => [field, { contains: searchParams[field]?.toString() || "" }]),
        ),
        sell_price: {
            gte: Number(searchParams.price?.toString().split("-")[0]) || 0,
            lte: Number(searchParams.price?.toString().split("-")[1]) || 99999999999999,
        },
    };
}

export function ReadonlyToObject(searchParams: ReadonlyURLSearchParams) {
    const params: searchParamType = {};
    Array.from(searchParams.keys()).forEach((key) => {
        params[key] = searchParams.getAll(key);
    });
    return params;
}
