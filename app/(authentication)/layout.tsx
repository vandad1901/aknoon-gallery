import AknoonLogo from "@/public/logo-aknoon-gallery.png";
import Image from "next/image";
import Link from "next/link";
type props = { children: React.ReactNode };

export default function AuthLayout({ children }: props) {
    return (
        <div className="mx-auto mt-40 grid grid-cols-[3fr_2fr] items-start justify-center gap-10">
            <Link href="/">
                <Image
                    src={AknoonLogo}
                    alt="لوگوی اکنون"
                    className="h-full w-[40rem] object-contain"
                />
            </Link>
            <div className="flex w-96 flex-col gap-10 rounded-xl border p-4">{children}</div>
        </div>
    );
}
