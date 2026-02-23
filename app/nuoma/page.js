// app/nuoma/page.js
import Image from "next/image";
import InfoCard from "../../components/info-card";
import { client, urlFor } from "../../lib/sanity";
import groq from "groq";

export const revalidate = 60;

export default async function RentPage() {
  const items = await client.fetch(
    groq`*[_type == "rent"] | order(title asc) {
      _id,
      title,
      description,
      pricePerDay,
      pricePerHour,
      "slug": slug.current,
      icon
    }`,
  );

  return (
    <section className="page-section">
      <div className="page-container page-section-inner font-body-regular-400 animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
        <div className="flex w-full flex-col gap-6 items-center">
          <h1 className="page-heading">Technikos ir įrankių nuoma</h1>
          <div className="page-subheading">
            Nuomojame techniką ir įrankius sklypo, kiemo ir kitų teritorijų
            darbams. Pasirinkite įrangą pagal savo poreikius.
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] w-full max-w-[960px] gap-4">
          {items.length === 0 ? (
            <p className="text-lightslategray">Informacija ruošiama...</p>
          ) : (
            items.map((item) => {
              let priceText = "";
              if (item.pricePerDay || item.pricePerHour) {
                const parts = [];
                if (item.pricePerDay) {
                  parts.push(`Nuo ${item.pricePerDay} €/diena`);
                }
                if (item.pricePerHour) {
                  parts.push(`nuo ${item.pricePerHour} €/val.`);
                }
                priceText = parts.join(" · ");
              }

              return (
                <InfoCard
                  key={item._id}
                  icon={
                    item.icon ? (
                      <Image
                        src={urlFor(item.icon).width(64).height(64).url()}
                        alt=""
                        width={64}
                        height={64}
                        sizes="64px"
                        className="w-16 h-16 object-contain"
                      />
                    ) : null
                  }
                  title={item.title}
                  // Show description, and if empty, show price text instead
                  description={
                    item.description ||
                    priceText ||
                    "Plačiau apie nuomos sąlygas..."
                  }
                  href={`/nuoma/${item.slug}`}
                />
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
