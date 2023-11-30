import "./globals.css";

import Header from "./components/HeaderComponents/Header";
import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";

const notoSansArabic = Noto_Sans_Arabic({ subsets: ["arabic"] });

export const metadata: Metadata = {
    title: "اکنون گالری",
    description: "aknoongallery.com",
};

type props = { children: React.ReactNode };

export default function RootLayout({ children }: props) {
    return (
        <html lang="en" dir="rtl">
            <body className={notoSansArabic.className}>
                <Header></Header>
                {children}
            </body>
        </html>
    );
}
