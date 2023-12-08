import { NavigationMenuContent, NavigationMenuSub } from "@radix-ui/react-navigation-menu";
import {
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { categories } from "@/config/site";
import { cn } from "@/lib/utils";

export default function Categories() {
    const [styleSubs, catSubs] = [categories.styleCats, categories.decoCats].map((cats) =>
        cats.map((val) => (
            <NavigationMenuItem className="w-full" key={val[0][0]} value={val[0][0]}>
                <NavigationMenuTrigger className="w-full py-2 pr-2 data-[state=open]:text-aknoon">
                    {val[0][0]}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="grid w-full grid-flow-col grid-cols-[200px_1fr] grid-rows-6 data-[motion^=from-]:animate-fadeIn">
                    {val[1].map((subVal) => (
                        <Link
                            className="w-full"
                            key={subVal[0]}
                            href={subVal[1]}
                            legacyBehavior
                            passHref>
                            <NavigationMenuLink
                                className={cn(
                                    navigationMenuTriggerStyle(),
                                    "w-full bg-transparent pr-2 text-center",
                                )}>
                                {subVal[0]}
                            </NavigationMenuLink>
                        </Link>
                    ))}
                </NavigationMenuContent>
            </NavigationMenuItem>
        )),
    );
    return (
        <NavigationMenuSub orientation="vertical" defaultValue={categories.styleCats[0][0][0]}>
            <NavigationMenuList className="h-80 w-24 flex-col content-start justify-start justify-items-stretch border-l-2 pt-2 border-gray-200">
                {catSubs}
                <Separator orientation="horizontal" className="bg-gray-200"/>
                {styleSubs}
            </NavigationMenuList>
            <NavigationMenuViewport className="right-24 top-0 h-80 w-[34rem]" />
        </NavigationMenuSub>
    );
}
