import ImageSlider from "./components/MainPageComponents/ImageSlider";

export default function Home() {
    return (
        <main className="grid grid-cols-1 justify-items-center gap-1 pt-0">
            <ImageSlider />
            <p className="text-lg sm:text-md text-center max-w-[60ch] my-8 mx-2 hyphens-auto break-words rounded-lg border-dotted" lang="fa">
            <strong className="text-aknoon">اکنون </strong> اشاره به زمان حال دارد. در برابر گذشته ای از کف رفته و
                آینده ای نامعلوم،‌ حال تنها چیزی است که ما در دست داریم پس چه
                بهتر که این حال زیبا شود. <strong className="text-aknoon">اکنون </strong> نمایشگاهی برای تماشای زیبایی
                است. امر زیبا بدون مخاطب بی‌معناست پس <strong className="text-aknoon">اکنون </strong> اصرار بر شکلی از هنر
                دارد که برای بیننده آشناست: هنری بومی، ریشه دار در فرهنگ و آئین
                ایران زمین و متعلق به امروز، به این زمان، به <strong className="text-aknoon">اکنون </strong>. امید اکنون
                آن است که در مسیرش مهمان نواز باشد و سخاوتمند و آرزویش این که
                زندگی، خانه و روزگار شما را، کمی هم که شده زیباتر سازد: پس به
                تماشای <strong className="text-aknoon">اکنون </strong> شتاب کن
            </p>
        </main>
    );
}
