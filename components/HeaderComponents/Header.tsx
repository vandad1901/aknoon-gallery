import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import React from "react";
import { validateRequest } from "@/lib/authServices";

export default async function Header() {
    const { isLoggedIn } = await validateRequest();
    return (
        <header className="sticky top-0 z-50">
            <MobileNavbar isLoggedIn={isLoggedIn} />
            <DesktopNavbar isLoggedIn={isLoggedIn} />
        </header>
    );
}
