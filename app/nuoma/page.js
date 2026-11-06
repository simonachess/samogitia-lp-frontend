// app/nuoma/page.js
import Image from "next/image";
import InfoCard from "../../components/info-card";
import ContactActions from "../../components/contact-actions";
import { client, urlFor } from "../../lib/sanity";
import { getSiteUrl } from "../../lib/env";
import groq from "groq";

export const revalidate = 60;

export const metadata = {
  title: "Technikos ir įrankių nuoma",
  description:
    "Informacija apie Samogitia Group technikos ir įrankių nuomos pasiūlymus Žemaitijoje.",
  alternates: {
    canonical: `${getSiteUrl()}/nuoma`,
  },
};

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
    <div className="rent-page">
      <section className="rent-listing" aria-labelledby="nuoma-heading">
        <div className="rent-page-container">
          <div className="rent-heading">
            <h1 id="nuoma-heading">Technikos ir įrankių nuoma</h1>
            <p>
              Informacija apie galimus nuomos pasiūlymus skelbiama šiame
              puslapyje.
            </p>
          </div>

          {items.length === 0 ? (
            <div className="rent-empty-state" role="status">
              <p>
                Šiuo metu nuomojamos technikos ar įrankių neturime. Kai
                pasiūlymai bus prieinami, informacija atsiras čia.
              </p>
            </div>
          ) : (
            <div className="rent-grid">
              {items.map((item) => {
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
                  <article key={item._id}>
                    <InfoCard
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
                      description={
                        item.description ||
                        priceText ||
                        "Plačiau apie nuomos sąlygas..."
                      }
                      href={`/nuoma/${item.slug}`}
                    />
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="rent-contact" aria-labelledby="rent-contact-heading">
        <h2 id="rent-contact-heading">Susisiekite</h2>
        <p>
          Turite klausimų apie nuomą ar kitus mūsų darbus? Susisiekite su mumis.
        </p>
        <ContactActions className="rent-contact-actions" />
      </section>
    </div>
  );
}
