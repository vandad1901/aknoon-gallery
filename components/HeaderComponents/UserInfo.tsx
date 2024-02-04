import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { UserIcon } from "@heroicons/react/24/outline";

type props = { isLoggedIn: boolean };
export default async function UserInfo({ isLoggedIn }: props) {
    if (isLoggedIn)
        return (
            <Link href="/profile">
                <UserIcon className="h-6 w-6" />
            </Link>
        );
    return (
        <Button variant={"outline"} asChild>
            <Link href="/login">
                <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                <p>ورود</p>
                <Separator orientation="vertical" className="mx-2" />
                <p>ثبت نام</p>
            </Link>
        </Button>
    );
}
