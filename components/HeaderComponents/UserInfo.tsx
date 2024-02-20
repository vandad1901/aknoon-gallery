"use client";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, LogOut, UserRound } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { authLogout } from "@/lib/authServices";
import { profileItems } from "@/config/site";

type props = { isLoggedIn: boolean; email: string | undefined };
export default function UserInfo({ isLoggedIn, email }: props) {
    const [logOutOpen, setLogOutOpen] = useState(false);
    if (isLoggedIn)
        return (
            <>
                <DropdownMenu dir="rtl">
                    <DropdownMenuTrigger>
                        <UserRound
                            strokeWidth={1.5}
                            className="h-8 w-8 rounded-md border-2 stroke-gray-600 p-1 sm:rounded-none sm:border-0 sm:p-0"
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 p-2">
                        <p className="text-md truncate">{email}</p>
                        <DropdownMenuSeparator />
                        {profileItems[0].items.map(({ name, link, Icon }) => {
                            return (
                                <DropdownMenuItem key={name}>
                                    <Link
                                        href={`/u/${link}`}
                                        className="inline-flex flex-row content-center items-center justify-center gap-2 text-sm">
                                        <Icon strokeWidth={1.25} />
                                        {name}
                                    </Link>
                                </DropdownMenuItem>
                            );
                        })}{" "}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={() => setLogOutOpen(true)}>
                            <div className="inline-flex flex-row content-center items-center justify-center gap-2 text-sm">
                                <LogOut strokeWidth={1.25} />
                                خروج
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialog open={logOutOpen} onOpenChange={setLogOutOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>خروج از حساب</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogDescription>
                            آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                            <AlertDialogCancel>لغو</AlertDialogCancel>
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    authLogout();
                                }}>
                                خروج
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </>
        );
    return (
        <Button
            variant="outline"
            asChild
            className="h-8 w-8 border-2 p-0 sm:h-10 sm:w-auto sm:border sm:px-4 sm:py-2">
            <Link href="/login">
                <LogIn strokeWidth={1.5} className="ml-1 hidden h-6 w-6 -scale-[1] sm:block" />
                <p className="hidden sm:block">ورود</p>
                <Separator orientation="vertical" className="mx-2 hidden sm:block" />
                <p className="hidden sm:block">ثبت نام</p>

                <UserRound className="h-8 w-8 stroke-gray-600 p-1 sm:hidden" />
            </Link>
        </Button>
    );
}
