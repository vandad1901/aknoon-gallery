import Image from "next/image";
import InstaLogo from "@/public/svg logos/instagram.svg";
import Link from "next/link";
import { MapPinIcon } from "@heroicons/react/24/outline";
import React from "react";
import TgLogo from "@/public/svg logos/telegram.svg";
import telephoneIcon from "@/public/svg logos/telephone.svg";
import whatsappLogo from "@/public/svg logos/whatsapp.svg";
export default function Footer() {
    return (
        <footer className="h-min w-full border-t-2">
            <div className="m-6 flex flex-col gap-2">
                <address className="not-italic">
                    <MapPinIcon className="inline h-8 w-8" />
                    <strong className="flex-grow sm:flex-grow-0">به زودی: </strong>
                    یوسف آباد، بین ۵۱ و ۵۳، مجتمع تجاری رز، طبقه همکف، واحد ۲۰
                </address>
                <div className="flex flex-row justify-between">
                    <div className="grid grid-cols-1 font-sans gap-y-1 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-3">
                        <Link
                            href="https://www.instagram.com/aknoongallery/"
                            className="grid grid-cols-[2rem_1fr] gap-1">
                            <Image alt="لوگوی اینستاگرام" src={InstaLogo} />
                            <p className="m-[0.125rem]">aknoongallery</p>
                        </Link>
                        <Link
                            href="https://www.instagram.com/aknoongallery.jewelry/"
                            className="grid grid-cols-[2rem_1fr] gap-1">
                            <Image alt="لوگوی اینستاگرام" src={InstaLogo} />
                            <p className="m-[0.125rem]">aknoongallery.jewelry</p>
                        </Link>
                        <Link
                            href="https://www.instagram.com/aknoongallery.style/"
                            className="grid grid-cols-[2rem_1fr] gap-1">
                            <Image alt="لوگوی اینستاگرام" src={InstaLogo} />
                            <p className="m-[0.125rem]">aknoongallery.style</p>
                        </Link>
                        <Link href="tel:02188068652" className="grid grid-cols-[2rem_1fr] gap-1">
                            <Image alt="عکس یک تلفن" src={telephoneIcon} />
                            <p className="m-[0.125rem]">02188068652</p>
                        </Link>

                        <Link
                            href="https://wa.me/+989203193849/"
                            className="grid grid-cols-[2rem_1fr] gap-1">
                            <Image alt="لوگوی واتسپ" src={whatsappLogo} />
                            <p className="m-[0.125rem]">Aknoon Gallery</p>
                        </Link>
                        <Link
                            href="https://t.me/+989203193849/"
                            className="grid grid-cols-[2rem_1fr] gap-1">
                            <Image alt="لوگوی تلگرام" src={TgLogo} />
                            <p className="m-[0.125rem]">Aknoon Gallery</p>
                        </Link>
                    </div>
                    <Link
                        className="min-h-[115px] self-center rounded-xl bg-gray-200"
                        referrerPolicy="origin"
                        target="_blank"
                        href="https://trustseal.enamad.ir/?id=418623&Code=LyJryUNAUpR0wZlD711pJyOZ48W8bB9e">
                        <Image
                            unoptimized={true}
                            referrerPolicy="origin"
                            src="https://trustseal.enamad.ir/logo.aspx?id=418623&Code=LyJryUNAUpR0wZlD711pJyOZ48W8bB9e"
                            alt="نماد تجارت الکترونیکی"
                            className="my-auto cursor-pointer bg-transparent p-2"
                            id="LyJryUNAUpR0wZlD711pJyOZ48W8bB9e"
                            width={80}
                            height={87.04}
                        />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
