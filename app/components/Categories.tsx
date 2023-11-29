import React, { Fragment, useState } from "react";

import clsx from "clsx";

type nameLink = [string, string];

const styleCats: [nameLink, nameLink[]][] = [
    [
        ["اکسسوری", "accesories"],
        [
            ["گوشواره", "earings"],
            ["گردنبند", "necklace"],
            ["انگشتر", "ring"],
            ["گیره مو", "hairclip"],
            ["دکمه سردست", "cufflinks"],
            ["النگو و دستبند", "bracelet"],
            ["آویز موبایل", "phone-charm"],
        ],
    ],
    [["کفش", "shoe"], []],
    [
        ["لباس", "clothing"],
        [
            ["کراوات", "tie"],
            ["دستمال گردن(مردانه و زنانه)", "neck-scarf"],
            ["پوشت", "handkerchief"],
            ["ست کراوات و پوشت", "handkerchief-tie-set"],
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
            <a
                href={val[0][1]}
                key={idx}
                className="w-full"
                onMouseEnter={() => setActiveCat(idx)}>
                {val[0][0]}
            </a>
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
            <div className="flex h-60 w-24 flex-col content-start justify-start gap-4 border-l-2 py-4 pr-4">
                {styleElems}
                {showSection && (
                    <section
                        className={`animate-fadeIn absolute right-24 ml-auto grid grid-flow-col grid-cols-[200px_200px] grid-rows-6 gap-4 px-4 transition-all delay-200`}>
                        {currentStyle![1].map((val) => (
                            <a
                                href={`artworks/${currentStyle[0][1]}/${val[1]}`}
                                key={val[0]}>
                                {val[0]}
                            </a>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
}
