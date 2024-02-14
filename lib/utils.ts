import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type NoTryResult<T> = [null, T] | [Error, null];

export function noTry<T>(fn: () => T, handleErr = (error: Error) => null): NoTryResult<T> {
    const result: [unknown, unknown] = [null, null];
    try {
        result[1] = fn();
    } catch (err: any) {
        result[0] = err;
        handleErr(err);
    }
    return result as NoTryResult<T>;
}
export async function noTryAsync<T>(
    fn: () => Promise<T>,
    handleErr = (error: Error) => null,
): Promise<NoTryResult<T>> {
    const result: [unknown, unknown] = [null, null];
    try {
        result[1] = await fn();
    } catch (err: any) {
        result[0] = err;
        handleErr(err);
    }
    return result as NoTryResult<T>;
}
