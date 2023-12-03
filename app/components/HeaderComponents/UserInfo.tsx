"use client";

import {
    ChevronDownIcon,
    UserCircleIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";

import clsx from "clsx";

export default function UserInfo() {
    const userName = "aknoongallery";
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="box-border grid sm:w-[12rem] border-spacing-2 grid-cols-[2rem_1.5rem] sm:grid-cols-[2rem_1fr_1.5rem] items-center rounded-lg border-2 px-2 py-1 sm:py-2">
            <UserCircleIcon className="h-8 w-8 stroke-[0.8]" />
            <p
                dir="ltr"
                className="hidden overflow-hidden text-ellipsis whitespace-nowrap text-sm sm:block">
                {userName}
            </p>
            <ChevronDownIcon
                className={clsx(
                    "h-6 w-6 cursor-pointer duration-300",
                    isOpen && "rotate-180",
                )}
                onClick={() => setIsOpen((isOpen) => !isOpen)}
            />
        </div>
    );
}
