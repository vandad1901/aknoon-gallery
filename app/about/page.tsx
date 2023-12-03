import React from "react";

export default function page() {
    return (
        <main className="m-4 grid h-full grid-cols-1 justify-items-center gap-4 md:m-6 md:grid-cols-2">
            <p
                className="text-md max-w-[60ch] hyphens-auto break-words rounded-lg border-dotted text-justify md:justify-self-start md:text-right"
                lang="fa">
                گالری <strong className="text-aknoon">اکنون </strong>
                از سال ۱۳۹۳ تلاش کرده‌است، بین آفرینشگران آثار هنری و علاقمندان
                به این آثار، پیوندی جدید برقرار کند. گالری
                <strong className="text-aknoon"> اکنون </strong>
                مکانیست مساعد برای آشنایی، سفارش، خرید و فروش آثار و دست ساخته
                های هنرمندان ایران . اگر شما هم جزو ستایشگران زیبایی هستید و در
                پی فرصتی می‌گردید تا حاصل دست و دل و جان هنرمندان را زینت بخش
                فضای کار یا محیط زندگیتان کنید، به
                <strong className="text-aknoon"> اکنون</strong> سری بزنید. و اگر
                به دنبال زنده کردن خاطره ای،‌ اجرای مراسمی، به جای آوردن وعدهای
                یا دادن هدیه ای باشید یا شاید بخواهید با ساخته دست یک هنرمند یا
                صنعتگر به فضای زندگی یا محیط کارتان زیبایی بیشتری ببخشید، به
                سراغمان بیایید. اطمینان داریم در اینجا، در گالری
                <strong className="text-aknoon"> اکنون</strong> گم کرده خود را
                پیدا می‌کنید و اگر نیافتیدش، یقین داریم با کشف تازه ای به خانه
                بازگردید.
            </p>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d680.7597940734876!2d51.40490847587094!3d35.744473659596785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1701599979429!5m2!1sen!2s"
                className="aspect-[4/3] w-[80%] rounded-md border-2 border-aknoon md:h-full md:w-auto md:max-w-full md:justify-self-end"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"></iframe>
        </main>
    );
}
