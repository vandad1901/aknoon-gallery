import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                aknoon: "#FDC828",
            },
            animation: {
                fadeIn: "fadeIn 0.3s normal forwards ease-in-out",
                slideShow:
                    "slideshow 12s infinite normal backwards ease-in-out",
            },
            keyframes: {
                fadeIn: {
                    "1% ": { opacity: "0", visibility: "hidden" },
                    "2%": { opacity: "0", visibility: "visible" },
                    "100%": { opacity: "1", visibility: "visible" },
                },
                slideshow: {
                    "0%": { transform: "translate3d(0, 0, 0)" },
                    "16%": { transform: "translate3d(0, 0, 0)" },
                    "33%": { transform: "translate3d(-100vw, 0, 0)" },
                    "50%": { transform: "translate3d(-100vw, 0, 0)" },
                    "67%": { transform: "translate3d(-200vw, 0, 0)" },
                    "83%": { transform: "translate3d(-200vw, 0, 0)" },
                    "100%": { transform: "translate3d(-300vw, 0, 0)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
