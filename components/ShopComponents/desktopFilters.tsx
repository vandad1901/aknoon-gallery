import React from "react";

export default function DesktopFilters({ children }: { children: React.ReactNode }) {
    return (
        <aside className="hidden h-min min-w-[16rem] rounded-xl border-2 md:block">
            {children}
        </aside>
    );
}
