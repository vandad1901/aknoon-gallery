"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { news } from "@/config/site";
import Image from "next/image";

export default function EventCarousel() {
    return (
        <div className="w-4/5 max-w-[calc(100vw-6rem)] rounded-xl bg-gray-300">
            <Carousel
                dir="rtl"
                opts={{
                    align: "start",
                    direction: "rtl",
                }}>
                <CarouselContent className="-m-0">
                    {news.map((newsItem) => (
                        <CarouselItem
                            key={newsItem.title}
                            className="aspect-square p-1 sm:aspect-[3/4] sm:basis-1/2 sm:p-2 md:basis-1/3 lg:p-3 xl:basis-1/4">
                            <div className="group relative h-full w-full overflow-hidden rounded-xl bg-white p-4">
                                <div className="relative h-full w-full">
                                    <Dialog>
                                        <DialogTrigger>
                                            <Image
                                                src={`/events/${newsItem.image}`}
                                                fill={true}
                                                alt={newsItem.title}
                                                className="object-contain"
                                            />
                                            <div className="absolute top-[calc(100%-3.75rem)] h-96 w-full border-t-2 border-aknoon bg-white transition-all">
                                                <h1 className="line-clamp-3 font-medium">
                                                    {newsItem.title}
                                                </h1>
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <div className="relative h-[60vh] w-full">
                                                <Image
                                                    src={`/events/${newsItem.image}`}
                                                    fill={true}
                                                    alt={newsItem.title}
                                                    className="object-contain"
                                                />
                                            </div>
                                            <p className="line-clamp-6">{newsItem.description}</p>
                                            <p className="text-slate-500">
                                                {new Intl.DateTimeFormat("fa-IR", {
                                                    dateStyle: "medium",
                                                    timeStyle: "short",
                                                })
                                                    .format(newsItem.date)
                                                    .replace("،", "\n")}
                                            </p>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext />
                <CarouselPrevious />
            </Carousel>
        </div>
    );
}
