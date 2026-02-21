import Header from "../header";
import Footer from "../footer";

export default function Layout({ children }) {
  return (
    <div className="relative bg-gray-white w-full flex flex-col items-center justify-start">
      <Header />
      <main id="main-content" className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
