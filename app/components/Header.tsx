"use client";

import {
    Bars3Icon,
    BuildingStorefrontIcon,
    HomeIcon,
    MagnifyingGlassIcon,
    PhoneIcon,
    ShoppingBagIcon,
    UserGroupIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

import Categories from "./Categories";
import Image from "next/image";
import Link from "next/link";
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
        "flex border-b-2 border-transparent hover:border-aknoon box-border pb-2 transition-all flex flex-row gap-2";
    return (
        <header className="sticky top-0 shadow-md sm:shadow-none">
            <div className="xs:px-6 relative top-0 z-50 grid grid-cols-[9fr_1fr] items-center justify-between gap-3 bg-white p-3 sm:grid-cols-[112px_37%_1fr] sm:py-4">
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
                <div className="hidden flex-row items-center justify-self-end sm:flex">
                    <UserInfo className="" />
                    <i className="mx-3  h-6 w-[1px] bg-gray-300" />
                    <ShoppingBagIcon className="h-6 w-6" />
                </div>
                <UserIcon className="box-content h-6 w-6 justify-self-center rounded-xl border-2 border-gray-200 bg-white p-2 drop-shadow-sm sm:hidden" />
            </div>
            <div
                className={clsx(
                    "relative top-full z-[-1] box-border hidden w-full origin-top flex-row justify-center gap-5 bg-white px-3 text-sm shadow-md transition-all duration-300 sm:flex",
                    scrollDir == "down" && " -translate-y-full",
                )}>
                <Link href="/" className={iconLinkCss}>
                    <HomeIcon className="h-6 w-6" />
                    صفحه اصلی
                </Link>
                <Link href="#" className={clsx(iconLinkCss, "peer")}>
                    <Bars3Icon className="h-6 w-6" />
                    دسته بندی
                </Link>
                <Categories />
                <Link href="artworks" className={iconLinkCss}>
                    <BuildingStorefrontIcon className="h-6 w-6" />
                    آثار
                </Link>
                <Link href="about" className={iconLinkCss}>
                    <UserGroupIcon className="h-6 w-6" />
                    درباره ما
                </Link>
                <Link href="contact" className={iconLinkCss}>
                    <PhoneIcon className="h-6 w-6" />
                    تماس با ما
                </Link>
            </div>
        </header>
    );
}
