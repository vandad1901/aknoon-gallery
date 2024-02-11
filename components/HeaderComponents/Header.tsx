import { Search, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import MobileNavMenu from "@/components/HeaderComponents/MobileNavMenu";
import NavigationItems from "@/components/HeaderComponents/Navigation";
import React from "react";
import { SearchInput } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import UserInfo from "@/components/HeaderComponents/UserInfo";
import aknoonLogo from "@/public/logo-aknoon-gallery.png";
import { validateRequest } from "@/lib/authServices";

export default async function Header() {
    const authResult = await validateRequest();
    return (
        <header className="sticky top-0 z-50 flex w-full flex-col border-b bg-white sm:border-b-0">
            <div className="z-50 mx-auto flex w-full max-w-7xl flex-row items-center gap-3 bg-white px-4 py-4 sm:px-6">
                <MobileNavMenu />
                <Link href="/">
                    <Image
                        src={aknoonLogo}
                        className="h-8 w-auto object-contain sm:h-12"
                        alt="لوگوی گالری اکنون"
                    />
                </Link>
                <SearchInput
                    icon={true}
                    type="search"
                    placeholder="جستجوی محصولات"
                    className="hidden w-1/3 min-w-[16rem] max-w-md outline-none sm:flex"
                />
                <div className="flex-grow"></div>
                <Button
                    variant="ghost"
                    className="h-8 w-8 rounded-md border-2 p-1 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 sm:hidden">
                    <Search
                        strokeWidth={1.5}
                        aria-hidden={true}
                        className="h-full w-full stroke-gray-600"
                    />
                    <span className="sr-only">جستجو در محصولات</span>
                </Button>
                <UserInfo isLoggedIn={authResult.isLoggedIn} email={authResult.user?.email} />
                <Separator orientation="vertical" className="hidden h-6 sm:block" />
                <Link
                    href="/u/orders"
                    className="h-8 w-8 rounded-md border-2 p-1 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 sm:border-0 sm:p-0">
                    <ShoppingBag
                        strokeWidth={1.5}
                        aria-hidden={true}
                        className="h-full w-full stroke-gray-600"
                    />
                    <span className="sr-only">سبد خرید</span>
                </Link>
            </div>
            <NavigationItems />
        </header>
    );
}
