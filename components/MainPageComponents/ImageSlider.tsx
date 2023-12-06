import Image from "next/image";
import React from "react";
import slider1 from "@/public/slider-1.jpg";
import slider2 from "@/public/slider-2.jpg";
import slider3 from "@/public/slider-3.jpg";

export default function ImageSlider() {
    return (
        <div className="h-[70vh] w-full overflow-hidden bg-aknoon ">
            <div className="relative left-0 grid h-full w-[100vw] animate-slideShow grid-cols-3 justify-items-center transition-all">
                <Image
                    src={slider1}
                    alt="placeholder"
                    className="absolute left-0 mx-auto h-full w-full object-contain"
                    priority={true}
                />
                <Image
                    src={slider2}
                    alt="placeholder"
                    className="absolute left-[100vw] mx-auto h-full w-full object-contain"
                    priority={true}
                />
                <Image
                    src={slider3}
                    alt="placeholder"
                    className="absolute left-[200vw] mx-auto h-full w-full object-contain"
                    priority={true}
                />
                <Image
                    src={slider1}
                    alt="placeholder"
                    className="absolute left-[300vw] mx-auto h-full w-full object-contain"
                    priority={true}
                />
            </div>
        </div>
    );
}
