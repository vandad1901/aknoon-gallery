import { MagnifyingGlassIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import NavigationItems from "./Navigation";
import React from "react";
import { Separator } from "@/components/ui/separator";
import UserInfo from "./UserInfo";
import aknoonLogo from "@/public/logo-aknoon-gallery.png";

export default function DesktopNavbar() {
    return (
        <div className="hidden sm:block">
            <div className="relative top-0 z-50 grid grid-cols-[112px_37%_1fr] items-center justify-between gap-3 bg-white px-6 py-4">
                <div className="col-span-1 self-start justify-self-center">
                    <Image
                        src={aknoonLogo}
                        width={112}
                        height={50}
                        alt="Logo of Aknoon Gallery"
                        priority={true}
                    />
                </div>
                <div className="flex flex-row justify-between">
                    <form className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-200 p-2">
                        <button type="submit">
                            <MagnifyingGlassIcon className="h-6 w-6" />
                        </button>
                        <input
                            type="text"
                            placeholder="جستجوی محصولات"
                            className="w-full outline-none"
                        />
                    </form>
                </div>
                <div className="grid grid-cols-[12rem_1fr_1.5rem] items-center justify-self-end">
                    <UserInfo />
                    <Separator orientation="vertical" className="mx-3 h-6" />
                    <ShoppingBagIcon className="h-6 w-6" />
                </div>
            </div>
            <NavigationItems />
        </div>
    );
}
