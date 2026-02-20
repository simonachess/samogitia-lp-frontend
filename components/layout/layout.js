import Header from "../header";
import Footer from "../footer";

export default function Layout({ children }) {
  return (
    <div className="relative bg-gray-white w-full flex flex-col items-center justify-start">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
