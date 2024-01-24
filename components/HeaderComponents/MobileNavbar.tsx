"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    ShoppingBagIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import Link, { LinkProps } from "next/link";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "../ui/separator";
import aknoonLogo from "@/public/logo-aknoon-gallery.png";
import { categories } from "@/config/site";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function MobileNavbar() {
    const [open, setOpen] = useState(false);

    const [styleAccord, decorAccords] = [categories.styleCats, categories.decoCats].map((cats) =>
        cats.map((val) => (
            <AccordionItem key={val[0][0]} value={val[0][0]}>
                <AccordionTrigger className="w-full py-2 font-medium data-[state=open]:text-aknoon">
                    {val[0][0]}
                </AccordionTrigger>
                <AccordionContent className="flex w-full flex-col gap-4">
                    {val[1].map((item) => (
                        <MobileLink
                            key={item[1]}
                            href={item[1]}
                            onOpenChange={setOpen}
                            className="text-muted-foreground">
                            {item[0]}
                        </MobileLink>
                    ))}
                </AccordionContent>
            </AccordionItem>
        )),
    );
    return (
        <div className="flex w-full flex-row items-center justify-between gap-2 border-b bg-background p-4 sm:hidden">
            <div className="flex flex-row gap-4">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            className="h-8 w-8 rounded-md border-2 p-1 text-base focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                            <Bars3Icon
                                aria-hidden={true}
                                className="h-full w-full stroke-gray-600"
                            />
                            <span className="sr-only">باز کردن منو</span>
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="right" className="pl-2 pr-3 pt-14">
                        <Link href="/" className="absolute right-3 top-3 h-8 w-[4.5rem]">
                            <Image
                                src={aknoonLogo}
                                width={71}
                                height={32}
                                className="object-contain"
                                alt="لوگوی گالری اکنون"
                            />
                        </Link>
                        <Separator orientation="horizontal" />
                        <ScrollArea dir="rtl" className="h-full w-full pb-5 pl-4">
                            <div className="flex flex-col space-y-3 pt-4">
                                <MobileLink
                                    href="artworks"
                                    onOpenChange={setOpen}
                                    className="font-medium">
                                    آثار
                                </MobileLink>
                                <MobileLink
                                    href="about"
                                    onOpenChange={setOpen}
                                    className="font-medium">
                                    درباره ما
                                </MobileLink>
                                <MobileLink
                                    href="contact"
                                    onOpenChange={setOpen}
                                    className="font-medium">
                                    تماس با ما
                                </MobileLink>
                                <div className="flex flex-col space-y-2">
                                    <Accordion
                                        type="single"
                                        className="flex flex-col space-y-3 pt-6"
                                        collapsible>
                                        {decorAccords}
                                        {styleAccord}
                                    </Accordion>
                                </div>
                            </div>
                        </ScrollArea>
                    </SheetContent>
                </Sheet>
                <Link href="/" className="h-8 w-[4.5rem]">
                    <Image
                        src={aknoonLogo}
                        width={71}
                        height={32}
                        className="object-contain"
                        alt="لوگوی گالری اکنون"
                    />
                </Link>
            </div>
            <div className="flex justify-end gap-3">
                <Button
                    variant="ghost"
                    className="h-8 w-8 rounded-md border-2 p-1 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                    <MagnifyingGlassIcon
                        aria-hidden={true}
                        className="h-full w-full stroke-gray-600"
                    />
                    <span className="sr-only">جستجو در محصولات</span>
                </Button>
                <Button
                    variant="ghost"
                    className="h-8 w-8 rounded-md border-2 p-1 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                    <UserIcon
                        aria-hidden={true}
                        className="h-full w-full stroke-gray-600 stroke-[1.3]"
                    />
                    <span className="sr-only">صفحه شخصی</span>
                </Button>
                <Button
                    variant="ghost"
                    className="h-8 w-8 rounded-md border-2 p-1 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                    <ShoppingBagIcon aria-hidden={true} className="h-full w-full stroke-gray-600" />
                    <span className="sr-only">سبد خرید</span>
                </Button>
            </div>
        </div>
    );
}

interface MobileLinkProps extends LinkProps {
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
    className?: string;
}

function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
    const router = useRouter();
    return (
        <Link
            href={href}
            onClick={() => {
                router.push(href.toString());
                onOpenChange?.(false);
            }}
            className={cn(className)}
            {...props}>
            {children}
        </Link>
    );
}
