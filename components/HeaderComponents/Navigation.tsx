"use client";

import { Home, Info, Menu, Phone, Store } from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    topTriggerStyle,
} from "@/components/ui/navigation-menu";
import React, { useEffect, useState } from "react";

import Categories from "./Categories";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
        <NavigationMenu
            className={cn(
                "relative top-full z-10 hidden w-full origin-top justify-center bg-white text-sm shadow-md transition-all duration-300 sm:flex",
                scrollDir == "down" && " -translate-y-full",
            )}
            dir="rtl">
            <NavigationMenuList className="gap-5">
                <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className={topTriggerStyle}>
                            <Home strokeWidth={1.5} className="h-6 w-6" aria-hidden={true} />
                            صفحه اصلی
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className={topTriggerStyle}>
                        <Menu strokeWidth={1.5} className="h-6 w-6" aria-hidden={true} />
                        دسته بندی
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="right-0">
                        <Categories />
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/artworks" legacyBehavior passHref>
                        <NavigationMenuLink className={topTriggerStyle}>
                            <Store strokeWidth={1.5} className="h-6 w-6" aria-hidden={true} />
                            آثار
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/about" legacyBehavior passHref>
                        <NavigationMenuLink className={topTriggerStyle}>
                            <Info strokeWidth={1.5} className="h-6 w-6" aria-hidden={true} />
                            درباره ما
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/contact" legacyBehavior passHref>
                        <NavigationMenuLink className={topTriggerStyle}>
                            <Phone strokeWidth={1.5} className="h-6 w-6" aria-hidden={true} />
                            تماس با ما
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuViewport
                dir="rtl"
                className="left-0 right-0 top-full mx-auto box-content h-80 w-[40rem] border-2 bg-white shadow-sm"
            />
        </NavigationMenu>
    );
}
