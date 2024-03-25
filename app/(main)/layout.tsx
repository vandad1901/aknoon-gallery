import Footer from "@/components/FooterComponents/Footer";
import Header from "@/components/HeaderComponents/Header";

type props = { children: React.ReactNode };

export default function RootLayout({ children }: props) {
    return (
        <>
            <Header />
            <div className="flex-grow pb-4">{children}</div>
            <Footer />
        </>
    );
}
