import Link from "next/link";
import Header from "../header";
import Footer from "../footer";

export default function Layout({ children }) {
  return (
    <div className="relative bg-gray-white w-full flex flex-col items-center justify-start">
      <Link
        href="#main-content"
        className="absolute left-4 -top-16 z-[100] btn-primary focus:top-4"
      >
        Pereiti prie pagrindinio turinio
      </Link>
      <Header />
      <main id="main-content" className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
