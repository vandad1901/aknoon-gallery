import AknoonLogo from "@/public/logo-aknoon-gallery.png";
import Image from "next/image";
import Link from "next/link";
type props = { children: React.ReactNode };

export default function AuthLayout({ children }: props) {
    return (
        <div className="mx-2 mt-10 flex flex-col items-start justify-center gap-5 md:mx-10 md:mt-40 md:grid md:grid-cols-[3fr_2fr] md:gap-10">
            <Link href="/" className="w-full">
                <Image
                    src={AknoonLogo}
                    alt="لوگوی اکنون"
                    className="mx-auto h-full w-[20rem] object-contain md:relative md:top-10 md:w-[40rem]"
                />
            </Link>
            <div className="flex w-full flex-col gap-10 rounded-xl p-4 md:w-96 md:border">
                {children}
            </div>
        </div>
    );
}
