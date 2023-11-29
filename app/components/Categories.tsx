import React, { Fragment, useState } from "react";

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
    const [activeCat, setActiveCat] = useState(-1);
    const styleElems = styleCats.map((val, idx) => {
        return (
            <Link
                href={val[0][1]}
                key={idx}
                className={clsx(
                    "w-full",
                    activeCat == idx && "text-aknoon font-bold",
                )}
                onMouseEnter={() => setActiveCat(idx)}>
                {val[0][0]}
            </Link>
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
    return (
        <div className="righ-auto absolute left-auto top-[100%] w-[60vw] translate-x-[100vw] border-2 bg-white shadow-sm transition-all delay-200 hover:translate-x-0 peer-hover:translate-x-0 peer-hover:delay-0">
            <div className="flex h-[13.5rem] w-24 flex-col content-start justify-start gap-4 border-l-2 p-4">
                {styleElems}
                {showSection && (
                    <section
                        className={`animate-fadeIn absolute right-24 top-0 ml-auto grid grid-flow-col grid-cols-[200px_200px] grid-rows-6 transition-all delay-200`}>
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
    );
}
