import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";

export default function UserInfo() {
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
