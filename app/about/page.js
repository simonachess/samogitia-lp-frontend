export const metadata = {
  title: "Apie mus",
};

export default function AboutPage() {
  return (
    <section className="w-full bg-primary-50 py-[80px] flex flex-col items-center text-center body-regular-600">
      <div className="max-w-[1200px] items-center w-full px-4 mx-auto body-regular-600 gap-6 flex flex-col">
        <h2 className="page-heading">Apie mus</h2>
        <div className="page-subheading">
          Žemės gerbūvio darbai, technikos ir įrankių nuoma.
        </div>
        <p className="text-lightslategray text-base col-span-full text-center">
          Informacija ruošiama...
        </p>
      </div>
    </section>
  );
}
