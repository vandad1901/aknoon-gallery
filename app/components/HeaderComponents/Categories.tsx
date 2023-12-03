import React, { useCallback, useEffect, useRef, useState } from "react";

import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";

type nameLink = [string, string];

const decoCats: [nameLink, nameLink[]][] = [[["", ""], []]];
const styleCats: [nameLink, nameLink[]][] = [
    [
        ["زیورآلات", "accesories"],
        [
            ["گوشواره", "earings"],
            ["گردنبند", "necklace"],
            ["انگشتر", "ring"],
            ["گیره مو", "hairclip"],
            ["دکمه سردست", "cufflinks"],
            ["النگو و دستبند", "bracelet"],
            ["آویز موبایل", "phone-charm"],
            ["آویز ایردپاد", "airpor-charm"],
            ["اکسسوری ساعت", "watch-accessory"],
        ],
    ],
    [["کفش", "shoe"], []],
    [
        ["لباس", "clothing"],
        [
            ["کراوات", "tie"],
            ["دستمال گردن", "neck-scarf"],
            ["پوشت", "handkerchief"],
            ["مانتو", "manteau"],
            ["کت", "coat"],
            ["پیراهن", "shirt"],
            ["دامن", "skirt"],
            ["جلیقه", "jacket"],
        ],
    ],
    [["کیف", "bag"], []],
];

export default function Categories() {
    const [navOpen, setNavOpen] = useState(false);
    const enableMenu = useCallback(() => setNavOpen(true), [setNavOpen]);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setNavOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setNavOpen]);
    const [activeCat, setActiveCat] = useState(-1);
    const styleElems = styleCats.map((val, idx) => {
        if (activeCat == idx) {
            return (
                <Link
                    href={val[0][1]}
                    key={idx}
                    className="w-full py-2 font-bold text-aknoon">
                    {val[0][0]}
                </Link>
            );
        }
        return (
            <p
                key={idx}
                className="w-full py-2"
                onMouseEnter={() => setActiveCat(idx)}>
                {val[0][0]}
            </p>
        );
    });

    let showSection: boolean = false;
    let currentStyle: [nameLink, nameLink[]];
    if (activeCat != -1) {
        currentStyle = styleCats[activeCat];
        if (currentStyle[1].length != 0) {
            showSection = true;
        }
    }
    const iconLinkCss =
        "flex border-b-2 border-transparent hover:border-aknoon box-border pb-2 transition-all flex-row gap-2";
    return (
        <>
            <p
                className={iconLinkCss}
                onMouseEnter={enableMenu}
                onClick={enableMenu}>
                <Bars3Icon className="h-6 w-6" />
                دسته بندی
            </p>
            <div
                ref={ref}
                className={clsx(
                    "absolute left-auto right-auto top-[100%] w-[60vw]  border-2 bg-white shadow-sm transition-all ",
                    navOpen
                        ? "translate-x-0 delay-0"
                        : "translate-x-[100vw] delay-200",
                )}>
                <div className="flex h-[13.5rem] w-24 flex-col content-start justify-start border-l-2 px-4 pt-2">
                    {styleElems}
                    {showSection && (
                        <section
                            className={`absolute right-24 top-0 ml-auto grid animate-fadeIn grid-flow-col grid-cols-[200px_200px] grid-rows-6 transition-all delay-200`}>
                            {currentStyle![1].map((val) => (
                                <Link
                                    href={`artworks/${currentStyle[0][1]}/${val[1]}`}
                                    key={val[0]}
                                    className="h-full w-full p-2 transition-all hover:bg-gray-200">
                                    {val[0]}
                                </Link>
                            ))}
                        </section>
                    )}
                </div>
            </div>
        </>
    );
}
