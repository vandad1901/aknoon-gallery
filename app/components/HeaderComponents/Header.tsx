import {
    MagnifyingGlassIcon,
    ShoppingBagIcon,
} from "@heroicons/react/24/outline";

import Image from "next/image";
import NavigationItems from "./Navigation";
import React from "react";
import UserInfo from "./UserInfo";
import aknoonLogo from "../../../public/logo-aknoon-gallery.png";

export default function Header() {
    return (
        <header className="sticky top-0 shadow-md sm:shadow-none z-50">
            <div className="relative top-0 z-50 grid grid-cols-[9fr_1fr] items-center justify-between gap-3 bg-white p-3 sm:grid-cols-[112px_37%_1fr] sm:px-6 sm:py-4">
                <div className="col-span-2 justify-self-center sm:col-span-1 sm:self-start">
                    <Image
                        src={aknoonLogo}
                        width={112}
                        height={50}
                        alt="Logo of Aknoon Gallery"
                        priority={true}
                    />
                </div>
                <div className="flex flex-row justify-between">
                    <form className="flex w-full max-w-xs items-center justify-center gap-2 rounded-lg border-2 border-gray-200 p-2 sm:max-w-none">
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
                <div className="grid grid-cols-[4.5rem] sm:grid-cols-[12rem_1fr_1.5rem] items-center justify-self-end">
                    <UserInfo />
                    <i className="hidden sm:block mx-3 h-6 w-[1px] bg-gray-300" />
                    <ShoppingBagIcon className="hidden sm:block h-6 w-6" />
                </div>
            </div>
            <NavigationItems />
        </header>
    );
}
