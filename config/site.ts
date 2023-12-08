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
export const siteConfig = {
    name: "گالری اکنون",
    description: "فروشگاه اینترنتی گالری اکنون، فروش آثار هنری و کاربردی هنرمندان ایرانی",
    url: "https://aknoongallery.com",
    ogImage: "/og.png",
};
