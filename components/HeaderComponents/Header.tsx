import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import React from "react";

export default function Header() {
    return (
        <header className="sticky top-0 z-50">
            <MobileNavbar />
            <DesktopNavbar />
        </header>
    );
}
