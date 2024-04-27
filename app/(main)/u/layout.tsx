import { RedirectType, redirect } from "next/navigation";

import Link from "next/link";
import { profileItems } from "@/config/site";
import { validateRequest } from "@/lib/authServices";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { session } = await validateRequest();
    if (session == null) {
        return redirect("/login", RedirectType.replace);
    }
    return (
        <div className="flex flex-row gap-20 sm:px-20 sm:pt-10">
            <nav className="hidden h-min w-48 flex-col gap-3 rounded-xl border px-4 py-2 sm:flex">
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
            <div className="overflow-hidden rounded-xl border">{children}</div>
        </div>
    );
}
