import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        theme: {
            colors: {
                aknoon: "#FDC828",
            },
        },
        extend: {
            animation: {
                fadeIn: "fadeIn 0.3s normal forwards ease-in-out",
            },
            keyframes: {
                fadeIn: {
                    "1% ": { opacity: "0", visibility: "hidden" },
                    "2%": { opacity: "0", visibility: "visible" },
                    "100%": { opacity: "1", visibility: "visible" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
