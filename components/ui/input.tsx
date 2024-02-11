import * as React from "react";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: boolean;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className,
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
Input.displayName = "Input";

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, icon = false, ...props }, ref) => {
        return (
            <div
                className={cn(
                    "flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className,
                )}>
                {icon && <Search className="h-6 w-6 stroke-gray-400" />}
                <input
                    {...props}
                    type="search"
                    ref={ref}
                    className="w-full bg-transparent p-2 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none"
                />
            </div>
        );
    },
);
SearchInput.displayName = "SearchInput";

export { SearchInput, Input };
