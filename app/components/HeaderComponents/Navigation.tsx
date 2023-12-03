"use client";

import {
    BuildingStorefrontIcon,
    HomeIcon,
    PhoneIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

import Categories from "./Categories";
import Link from "next/link";
import clsx from "clsx";

const iconLinkCss =
    "flex border-b-2 border-transparent hover:border-aknoon box-border pb-2 transition-all flex-row gap-2";

export default function NavigationItems() {
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

    return (
        <div
            className={clsx(
                "relative top-full z-10 box-border hidden w-full origin-top flex-row justify-center gap-5 bg-white px-3 text-sm shadow-md transition-all duration-300 sm:flex",
                scrollDir == "down" && " -translate-y-full",
            )}>
            <Link href="/" className={iconLinkCss}>
                <HomeIcon className="h-6 w-6" />
                صفحه اصلی
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
    );
}
