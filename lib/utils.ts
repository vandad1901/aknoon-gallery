import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ReadonlyURLSearchParams } from "next/navigation";
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export function addQueryStringKV(
    key: string,
    value: string,
    checked: boolean,
    searchParams: ReadonlyURLSearchParams,
) {
    const params = new URLSearchParams(searchParams);
    if (!checked && params.getAll(key).includes(value)) {
        const updatedNames = params.getAll(key).filter((val) => val !== value);
        params.delete(key);
        updatedNames.forEach((val) => params.append(key, val));
    } else if (checked) {
        params.append(key, value);
    }
    // turn params into and array of key value pairs, sort them by keys and the values, then turn it back

    return sortParams(params).toString();
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

export function UpdateQueryStringKV(
    key: string,
    value: string,
    searchParams: ReadonlyURLSearchParams,
) {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    params.append(key, value);

    return sortParams(params).toString();
}
