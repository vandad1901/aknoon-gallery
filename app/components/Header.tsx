"use client";

import {
    Bars3Icon,
    BuildingStorefrontIcon,
    HomeIcon,
    MagnifyingGlassIcon,
    PhoneIcon,
    ShoppingBagIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

import Categories from "./Categories";
import Image from "next/image";
import UserInfo from "./UserInfo";
import aknoonLogo from "../../public/logo-aknoon-gallery-cropped.png";
import clsx from "clsx";

export default function Header() {
    const [scrollDir, setScrollDir] = useState("scrolling down");

    useEffect(() => {
        const threshold = 0;
        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateScrollDir = () => {
            const scrollY = window.scrollY;

            if (Math.abs(scrollY - lastScrollY) < threshold) {
                ticking = false;
                return;
            }
            setScrollDir(scrollY > lastScrollY ? "down" : "up");
            lastScrollY = Math.max(scrollY, 0);
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollDir);
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [scrollDir]);
    const iconLinkCss =
        "inline-flex border-b-2 border-transparent hover:border-yellow-300 box-border pb-2 transition-all flex flex-row gap-2";
    return (
        <header className="sticky top-0">
            <div
                className={clsx(
                    "relative top-0 z-50 flex flex-row items-center justify-between bg-white px-6 py-4",
                )}>
                <div className="">
                    <Image
                        src={aknoonLogo}
                        width={112}
                        height={50}
                        alt="Logo of Aknoon Gallery"
                        priority={true}
                    />
                </div>
                <div className="flex w-[89%] flex-row justify-between">
                    <form className="ml-7 flex min-w-[42%] max-w-xl items-center gap-1 rounded-lg border-2 border-gray-200 p-2">
                        <button type="submit">
                            <MagnifyingGlassIcon className="h-6 w-6" />
                        </button>
                        <input
                            type="text"
                            placeholder="جستجوی محصولات"
                            className="w-full outline-none"
                        />
                    </form>
                    <div className="flex flex-row items-center">
                        <UserInfo />
                        <i className="mx-3 h-6 w-[1px] bg-gray-300" />
                        <ShoppingBagIcon className="h-6 w-6" />
                    </div>
                </div>
            </div>
            <div
                className={clsx(
                    "absolute top-full z-[-1] box-border flex w-full origin-top flex-row justify-center gap-5 bg-white px-3 text-sm shadow-md transition-all duration-300",
                    scrollDir == "down" && " -translate-y-full",
                )}>
                <a href="/" className={iconLinkCss}>
                    <HomeIcon className="h-6 w-6" />
                    صفحه اصلی
                </a>
                <a href="#" className={clsx(iconLinkCss, "peer")}>
                    <Bars3Icon className="h-6 w-6" />
                    دسته بندی
                </a>
                <Categories />
                <a href="artworks" className={iconLinkCss}>
                    <BuildingStorefrontIcon className="h-6 w-6" />
                    آثار
                </a>
                <a href="about" className={iconLinkCss}>
                    <UserGroupIcon className="h-6 w-6" />
                    درباره ما
                </a>
                <a href="contact" className={iconLinkCss}>
                    <PhoneIcon className="h-6 w-6" />
                    تماس با ما
                </a>
            </div>
        </header>
    );
}
