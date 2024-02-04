import ImageSlider from "@/components/MainPageComponents/ImageSlider";
import EventCarousel from "@/components/MainPageComponents/EventCarousel";
import Aknoon from "@/components/Aknoon";

export default function Home() {
    return (
        <main className="flex flex-col items-center gap-9 pt-0">
            <ImageSlider />
            <p
                className="sm:text-md mx-2 max-w-[60ch] hyphens-auto break-words border-dotted text-center text-lg"
                lang="fa">
                <Aknoon /> اشاره به زمان حال دارد. در برابر گذشته ای از کف رفته و آینده ای نامعلوم،‌
                حال تنها چیزی است که ما در دست داریم پس چه بهتر که این حال زیبا شود. <Aknoon />{" "}
                نمایشگاهی برای تماشای زیبایی است. امر زیبا بدون مخاطب بی‌معناست پس <Aknoon /> اصرار
                بر شکلی از هنر دارد که برای بیننده آشناست: هنری بومی، ریشه دار در فرهنگ و آئین ایران
                زمین و متعلق به امروز، به این زمان، به <Aknoon /> . امید <Aknoon /> آن است که در مسیرش
                مهمان نواز باشد و سخاوتمند و آرزویش این که زندگی، خانه و روزگار شما را، کمی هم که
                شده زیباتر سازد: پس به تماشای <Aknoon /> شتاب کن
            </p>
            <EventCarousel />
        </main>
    );
}
