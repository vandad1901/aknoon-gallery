type nameLink = [string, string];

const decoCats: [nameLink, nameLink[]][] = [
    [["تابلو", "tableau"], [["همه تابلو ها", "tableau"]]],
    [["مجسمه", "sculpture"], [["همه مجسمه ها", "sculpture"]]],
    [
        ["حجم کابردی", "functional-volumetrics"],
        [
            ["زیرسیگاری", "ashtray"],
            ["ساعت", "clock"],
            ["لامپ", "lamp"],
            ["شمعدان", "candle-holder"],
            ["جاعودی", "incense-holder"],
        ],
    ],
    [
        ["ظروف", "tableware-and-utensils"],
        [
            ["کاسه", "bowl"],
            ["بشقاب", "plate"],
            ["ماگ", "mug"],
            ["قاشق", "spoon"],
        ],
    ],
];
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
    [["کفش", "shoe"], [["همه کفش ها", "shoe"]]],

    [["کیف", "bag"], [["همه کیف ها", "bag"]]],
];

export const categories = { styleCats: styleCats, decoCats: decoCats };
export const artworksFields = [
    "sub_category",
    "name",
    "material",
    "technique",
    "style",
    "form",
    "size",
    "color",
    "stone_type",
] as const;
export const persianArtworksFields: { [K in (typeof artworksFields)[number]]: string } = {
    sub_category: "زیر دسته",
    name: "نام",
    material: "جنس",
    technique: "تکنیک",
    style: "سبک",
    form: "شکل",
    size: "اندازه",
    color: "رنگ",
    stone_type: "نوع سنگ",
};

export type artworksPossibleValuesType = {
    [K in (typeof artworksFields)[number]]: string[];
};

export const sortFields = [
    { name: "پرطرفدارترین", value: "popularity" },
    { name: "جدیدترین", value: "newest" },
    { name: "قدیمی ترین", value: "oldest" },
    { name: "ارزان ترین", value: "cheapest" },
    { name: "گران ترین", value: "most_expensive" },
];

export const siteConfig = {
    name: "گالری اکنون",
    description: "فروشگاه اینترنتی گالری اکنون، فروش آثار هنری و کاربردی هنرمندان ایرانی",
    url: "https://aknoongallery.com",
    ogImage: "/og.png",
};
