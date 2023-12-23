import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ReadonlyURLSearchParams } from "next/navigation";
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export function createQueryString(
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
    return params.toString();
}
