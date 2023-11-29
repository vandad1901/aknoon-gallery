"use client";

import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

import clsx from "clsx";

export default function UserInfo() {
    const userName = "aknoongallery";
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="box-border flex min-w-[185px] border-spacing-2 flex-row items-center rounded-lg border-2 px-2 py-2">
            <UserCircleIcon className="h-8 w-8 stroke-[0.8]" />
            <span className="text-sm">{userName}</span>
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
