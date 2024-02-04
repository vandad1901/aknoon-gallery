import "@/app/globals.css";

import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import clsx from "clsx";
import { siteConfig } from "@/config/site";

const notoSansArabic = Noto_Sans_Arabic({ subsets: ["arabic"] });

export const metadata: Metadata = {
    metadataBase: new URL("https://aknoongallery.com"),
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    openGraph: {
        type: "website",
        locale: "fa_IR",
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
        ],
    },
};

type props = { children: React.ReactNode };

export default function RootLayout({ children }: props) {
    return (
        <html lang="en" dir="rtl">
            <body
                className={clsx(
                    notoSansArabic.className,
                    "flex min-h-screen flex-col overflow-y-scroll",
                )}>
                {children}
            </body>
        </html>
    );
}
