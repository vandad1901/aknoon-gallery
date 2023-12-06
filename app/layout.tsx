import "./globals.css";

import Footer from "@/components/FooterComponents/Footer";
import Header from "@/components/HeaderComponents/Header";
import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import clsx from "clsx";

const notoSansArabic = Noto_Sans_Arabic({ subsets: ["arabic"] });

export const metadata: Metadata = {
    title: "اکنون گالری",
    description: "aknoongallery.com",
};

type props = { children: React.ReactNode };

export default function RootLayout({ children }: props) {
    return (
        <html lang="en" dir="rtl">
            <body className={clsx(notoSansArabic.className, "flex min-h-screen flex-col")}>
                <Header></Header>
                <div className="flex-grow">{children}</div>
                <Footer />
            </body>
        </html>
    );
}
