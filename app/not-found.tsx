import Link from "next/link";

export default function NotFound() {
    return (
        <div className="grid grid-cols-1 justify-items-center gap-1 pt-40">
            <h2>صفحه مورد نظر پیدا نشد!</h2>
            <Link href="/" className="text-sky-700">
                بازگشت به صفحه اصلی
            </Link>
        </div>
    );
}
