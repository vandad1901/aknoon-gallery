import Image from "next/image";
import React from "react";
import desktopSlider1 from "@/public/Sliders/desktop_slider_1.jpg";
import desktopSlider2 from "@/public/Sliders/desktop_slider_2.jpg";
import desktopSlider3 from "@/public/Sliders/desktop_slider_3.jpg";

import mobileSlider1 from "@/public/Sliders/mobile_slider_1.jpg";
import mobileSlider2 from "@/public/Sliders/mobile_slider_2.jpg";
import mobileSlider3 from "@/public/Sliders/mobile_slider_3.jpg";

export default function ImageSlider() {
    return (
        <div className="h-[500px] md:h-[400px] w-full overflow-hidden bg-aknoon ">
            <div className="relative left-0 grid h-full w-[100vw] animate-slideShow grid-cols-3 justify-items-center transition-all">
                <Image
                    src={desktopSlider1}
                    alt="placeholder"
                    className="absolute left-0 mx-auto hidden h-full w-full object-contain md:block"
                    height={400}
                    priority={true}
                />
                <Image
                    src={mobileSlider1}
                    alt="placeholder"
                    className="absolute left-0 mx-auto h-full w-full object-contain md:hidden"
                    height={500}
                    priority={true}
                />
                <Image
                    src={desktopSlider2}
                    alt="placeholder"
                    height={400}
                    className="absolute left-[100vw] mx-auto hidden h-full w-full object-contain md:block"
                />
                <Image
                    src={mobileSlider2}
                    alt="placeholder"
                    height={500}
                    className="absolute left-[100vw] mx-auto h-full w-full object-contain md:hidden"
                />
                <Image
                    src={desktopSlider3}
                    alt="placeholder"
                    height={400}
                    className="absolute left-[200vw] mx-auto hidden h-full w-full object-contain md:block"
                />
                <Image
                    src={mobileSlider3}
                    alt="placeholder"
                    height={500}
                    className="absolute left-[200vw] mx-auto h-full w-full object-contain md:hidden"
                />
                <Image
                    src={desktopSlider1}
                    alt="placeholder"
                    className="absolute left-[300vw] mx-auto hidden h-full w-full object-contain md:block"
                    priority={true}
                    height={400}
                />
                <Image
                    src={mobileSlider1}
                    alt="placeholder"
                    className="absolute left-[300vw] mx-auto h-full w-full object-contain md:hidden"
                    priority={true}
                    height={500}
                />
            </div>
        </div>
    );
}
