import * as React from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: boolean;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, icon = false, ...props }, ref) => {
        return (
            <div
                className={cn(
                    "flex h-8 items-center rounded-md border-2 border-gray-200 pl-3 pr-1 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
                    className,
                )}>
                {icon && <MagnifyingGlassIcon className="stroke-gray-400 h-6 w-6" />}
                <input
                    {...props}
                    type="search"
                    ref={ref}
                    className="w-full bg-transparent p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
        );
    },
);
Input.displayName = "Input";

export { Input };
