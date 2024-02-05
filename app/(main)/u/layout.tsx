import Link from "next/link";
import React from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { profileItems } from "@/config/site";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="fle w-max grid-cols-[12rem_1fr] px-20 pt-10">
            <nav className="flex flex-col gap-3 rounded-xl border px-4 py-2">
                {profileItems.map(({ name, items }) => {
                    return (
                        <section key={name} className="space-y-2">
                            <h2 className="font-bold">{name}</h2>
                            <ul className="flex flex-col">
                                {items.map(({ name, link, Icon }) => {
                                    return (
                                        <li key={name}>
                                            <Link
                                                href={link}
                                                className="inline-flex flex-row content-center items-center justify-center gap-1">
                                                <Icon strokeWidth={1.75} />
                                                {name}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    );
                })}
            </nav>
            <div>{children}</div>
        </div>
    );
}
