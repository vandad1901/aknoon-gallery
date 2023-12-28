import ImageSlider from "@/components/MainPageComponents/ImageSlider";
import EventCarousel from "@/components/MainPageComponents/EventCarousel";

export default function Home() {
    return (
        <main className="flex flex-col items-center gap-9 pt-0">
            <ImageSlider />
            <p
                className="sm:text-md mx-2 my-8 max-w-[60ch] hyphens-auto break-words rounded-lg border-dotted text-center text-lg"
                lang="fa">
                <span className="text-aknoon">اکنون </span> اشاره به زمان حال دارد. در برابر گذشته
                ای از کف رفته و آینده ای نامعلوم،‌ حال تنها چیزی است که ما در دست داریم پس چه بهتر
                که این حال زیبا شود. <span className="text-aknoon">اکنون </span> نمایشگاهی برای
                تماشای زیبایی است. امر زیبا بدون مخاطب بی‌معناست پس{" "}
                <span className="text-aknoon">اکنون </span> اصرار بر شکلی از هنر دارد که برای بیننده
                آشناست: هنری بومی، ریشه دار در فرهنگ و آئین ایران زمین و متعلق به امروز، به این
                زمان، به <span className="text-aknoon">اکنون</span>. امید اکنون آن است که در مسیرش
                مهمان نواز باشد و سخاوتمند و آرزویش این که زندگی، خانه و روزگار شما را، کمی هم که
                شده زیباتر سازد: پس به تماشای <span className="text-aknoon">اکنون </span> شتاب کن
            </p>
            <EventCarousel />
        </main>
    );
}
