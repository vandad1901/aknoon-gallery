import { cn } from "@/lib/utils";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

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
    [["کفش", "shoe"], []],

    [["کیف", "bag"], []],
];

export const categories = { styleCats: styleCats, decoCats: decoCats };

export const topTriggerStyle = cn(
    navigationMenuTriggerStyle(),
    "border-b-2 border-transparent p-2 hover:border-aknoon",
);
