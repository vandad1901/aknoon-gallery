import Link from "next/link";

export default function NotFound() {
    return (
        <div className="grid grid-cols-1 justify-items-center gap-1 pt-20">
            <h2>صفحه مورد نظر پیدا نشد!</h2>
            <Link href="/" className="text-aknoon hover:text-aknoon">
                بازگشت به صفحه اصلی
            </Link>
        </div>
    );
}
