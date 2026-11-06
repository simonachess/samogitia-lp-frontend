import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../lib/sanity";
import { portableTextToPlainText } from "../lib/portable-text";
import RichBody from "./rich-body";
import Breadcrumb from "./breadcrumb";
import ContactActions from "./contact-actions";
import ServiceAreaSection from "./service-area-section";
import { Check } from "lucide-react";

const SERVICE_AREAS = [
  "Telšiuose",
  "Šiauliuose",
  "Plungėje",
  "Mažeikiuose",
  "Klaipėdos regione",
  "Visoje Žemaitijoje",
];

function getBlockText(block) {
  return (block.children || [])
    .map((child) => child.text || "")
    .join("")
    .trim();
}

function isStrongHeading(block) {
  const children = (block.children || []).filter(
    (child) => typeof child.text === "string" && child.text.trim(),
  );
  const strongMarkKeys = new Set(
    (block.markDefs || [])
      .filter((definition) => definition._type === "strong")
      .map((definition) => definition._key),
  );

  return (
    /^h[1-6]$/.test(block.style || "") ||
    (children.length > 0 &&
      children.every((child) =>
        (child.marks || []).some(
          (mark) => mark === "strong" || strongMarkKeys.has(mark),
        ),
      ))
  );
}

function splitStrongHeadings(blocks) {
  return blocks.flatMap((block) => {
    const children = block.children || [];
    const result = [];
    let bodyChildren = [];

    const flushBody = (key) => {
      if (!getBlockText({ children: bodyChildren }).trim()) {
        bodyChildren = [];
        return;
      }

      const lastIndex = bodyChildren.length - 1;
      const trimmedChildren = bodyChildren.map((child, index) =>
        index === lastIndex && typeof child.text === "string"
          ? { ...child, text: child.text.replace(/\s+$/, "") }
          : child,
      );
      result.push({
        ...block,
        _key: `${block._key || "block"}-${key}`,
        children: trimmedChildren,
      });
      bodyChildren = [];
    };

    children.forEach((child, index) => {
      const marks = child.marks || [];
      const isStrong = marks.some(
        (mark) =>
          mark === "strong" ||
          (block.markDefs || []).some(
            (definition) =>
              definition._key === mark && definition._type === "strong",
          ),
      );
      const bodyText = bodyChildren.map((item) => item.text || "").join("");
      const hasParagraphBreak = /\n\s*\n$/.test(bodyText);

      if (isStrong && (!bodyText.trim() || hasParagraphBreak)) {
        flushBody(`body-${index}`);
        const heading = {
          ...child,
          text: typeof child.text === "string" ? child.text.trim() : child.text,
        };
        result.push({
          ...block,
          _key: `${block._key || "block"}-heading-${index}`,
          children: [heading],
        });
      } else {
        bodyChildren.push(child);
      }
    });

    flushBody("body-end");
    return result.length ? result : [block];
  });
}

function splitServiceDescription(value) {
  const blocks = splitStrongHeadings(Array.isArray(value) ? value : []);
  const introTitleIndex = blocks.findIndex((block) => block.style === "h2");
  const introTitle =
    introTitleIndex >= 0 ? getBlockText(blocks[introTitleIndex]) : "";
  const intro = [];
  const sections = [];
  let currentSection = null;

  blocks.forEach((block, index) => {
    const text = getBlockText(block);
    if (!text || index === introTitleIndex) return;

    if (isStrongHeading(block)) {
      currentSection = { title: text, blocks: [] };
      sections.push(currentSection);
    } else if (currentSection) {
      currentSection.blocks.push(block);
    } else {
      intro.push(block);
    }
  });

  return { introTitle, intro, sections };
}

function ServiceTextBlocks({ blocks, className = "" }) {
  return blocks.map((block, index) => {
    const text = getBlockText(block);
    if (!text) return null;

    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const isChecklist =
      lines.length > 1 && lines.every((line) => line.startsWith("✔"));

    if (isChecklist) {
      return (
        <ul
          className={`service-redesign-checklist ${className}`}
          key={block._key || index}
        >
          {lines.map((line, lineIndex) => (
            <li key={lineIndex}>
              <Check className="ui-icon" size={17} aria-hidden="true" />
              <span>{line.replace(/^✔\s*/, "")}</span>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <div
        className={`service-redesign-rich-block ${className}`}
        key={block._key || index}
      >
        <RichBody value={[block]} />
      </div>
    );
  });
}

function RedesignedServiceDescription({
  value,
  relatedImage,
  serviceTitle,
  descriptionImage,
  descriptionImageSide = "right",
  contentSections = [],
  whyChooseUs,
}) {
  const { introTitle, intro, sections } = splitServiceDescription(value);
  const areaSectionIndex = sections.findIndex((section) =>
    section.title.includes("Žemaitijoje"),
  );
  const whySectionIndex = sections.findIndex((section) =>
    section.title.toLowerCase().startsWith("kodėl verta rinktis"),
  );
  const areaSection = areaSectionIndex >= 0 ? sections[areaSectionIndex] : null;
  const areaBlocks = areaSection?.blocks || [];
  const areaIntro = areaBlocks.filter(
    (block) => !SERVICE_AREAS.some((area) => getBlockText(block) === area),
  );
  const contactMessage = areaIntro.at(-1);
  const areaLead = areaIntro.slice(0, -1);
  const remainingSections = sections.filter(
    (_, index) => index !== areaSectionIndex && index !== whySectionIndex,
  );
  const structuredSections = contentSections
    .filter(
      (section) => section.title || section.content?.length || section.image,
    )
    .slice(0, 4);
  const structuredWhyBlocks = Array.isArray(whyChooseUs)
    ? whyChooseUs
    : sections[whySectionIndex]?.blocks || [];
  const legacySections = structuredSections.length ? [] : remainingSections;
  const heroImage = descriptionImage?.asset
    ? urlFor(descriptionImage).width(1400).height(1100).url()
    : relatedImage;
  const heroImageSide = descriptionImage
    ? descriptionImageSide === "left"
      ? "left"
      : "right"
    : "right";
  const descriptionText = (Array.isArray(value) ? value : [])
    .map(getBlockText)
    .join(" ");
  const serviceAreas = SERVICE_AREAS.filter((area) =>
    descriptionText.includes(area),
  );

  return (
    <div className="service-redesign-detail">
      <div className="service-redesign-container">
        <div className="service-redesign-breadcrumb">
          <Breadcrumb
            items={[
              { href: "/", label: "Pradžia" },
              { href: "/paslaugos", label: "Paslaugos" },
              { label: serviceTitle },
            ]}
          />
        </div>

        <article>
          <header
            className={`service-redesign-hero${heroImage ? "" : " service-redesign-hero--no-image"}${heroImage ? ` service-redesign-hero--image-${heroImageSide}` : ""}`}
          >
            <div className="service-redesign-hero-copy">
              <h1 id="service-title">{serviceTitle}</h1>
              {introTitle && <h2>{introTitle}</h2>}
              <div className="service-redesign-intro">
                <ServiceTextBlocks blocks={intro} />
              </div>
            </div>
            {heroImage && (
              <div className="service-redesign-hero-image">
                <Image
                  src={heroImage}
                  alt={`${serviceTitle} darbų nuotrauka`}
                  fill
                  priority
                  sizes="(max-width: 700px) 100vw, 48vw"
                  className="object-cover"
                />
              </div>
            )}
          </header>

          <div className="service-redesign-sections">
            {structuredSections.length > 0
              ? structuredSections.map((section, index) => {
                  const imageUrl = section.image?.asset
                    ? urlFor(section.image).width(1100).height(900).url()
                    : null;
                  const imageSide =
                    section.imageSide === "left" ? "left" : "right";
                  return (
                    <section
                      className={`service-redesign-section${imageUrl ? ` service-redesign-section--with-image service-redesign-section--image-${imageSide}` : ""}`}
                      key={section._key || section.title || index}
                    >
                      <div className="service-redesign-section-copy">
                        {section.title && <h2>{section.title}</h2>}
                        <ServiceTextBlocks blocks={section.content || []} />
                      </div>
                      {imageUrl && (
                        <div className="service-redesign-section-image">
                          <Image
                            src={imageUrl}
                            alt={`${section.title || serviceTitle} darbų nuotrauka`}
                            fill
                            sizes="(max-width: 700px) 100vw, 42vw"
                            className="object-cover"
                          />
                        </div>
                      )}
                    </section>
                  );
                })
              : legacySections.map((section, index) => (
                  <section
                    className={`service-redesign-section service-redesign-section-${index + 1}`}
                    key={section.title}
                  >
                    <h2>{section.title}</h2>
                    <ServiceTextBlocks blocks={section.blocks} />
                  </section>
                ))}

            {structuredWhyBlocks.length > 0 && (
              <section className="service-redesign-section service-redesign-why">
                <h2>Kodėl verta rinktis mus?</h2>
                <ServiceTextBlocks blocks={structuredWhyBlocks} />
              </section>
            )}

            <ServiceAreaSection
              className="service-redesign-area"
              title={areaSection?.title || `${serviceTitle} Žemaitijoje`}
              areas={serviceAreas}
              intro={areaLead.map(getBlockText).join(" ")}
              message={contactMessage ? getBlockText(contactMessage) : ""}
            />
          </div>
        </article>
      </div>
    </div>
  );
}

/**
 * Shared service detail body. Used by /paslaugos/[slug] and /[slug].
 * Schema and internal links use the short root path (/[slug]) as canonical.
 */
export default function ServiceDetailContent({
  service,
  otherServices,
  slug,
  siteUrl,
  relatedImage,
}) {
  const rawDesc = service.longDescription ?? service.description;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: service.title,
    description: Array.isArray(rawDesc)
      ? portableTextToPlainText(rawDesc)
      : rawDesc,
    url: `${siteUrl}/${slug}`,
  };
  const useRedesignedLayout = Array.isArray(rawDesc);

  return (
    <section
      className={
        useRedesignedLayout ? "service-detail-redesigned" : "page-section"
      }
      aria-labelledby="service-title"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {useRedesignedLayout ? (
        <RedesignedServiceDescription
          value={rawDesc}
          relatedImage={relatedImage}
          serviceTitle={service.title}
          descriptionImage={service.descriptionImage}
          descriptionImageSide={service.descriptionImageSide}
          contentSections={service.contentSections}
          whyChooseUs={service.whyChooseUs}
        />
      ) : (
        <div className="page-container page-section-inner">
          <Breadcrumb
            items={[
              { href: "/", label: "Pradžia" },
              { href: "/paslaugos", label: "Paslaugos" },
              { label: service.title },
            ]}
          />
          <article>
            <div className="flex flex-col gap-6 items-center w-full">
              <div className="flex flex-col gap-4 mb-6 items-center">
                {service.icon && (
                  <Image
                    src={urlFor(service.icon).width(56).height(56).url()}
                    alt={service.title}
                    width={56}
                    height={56}
                    sizes="56px"
                    className="w-[56px] h-[56px]"
                  />
                )}
                <h1 id="service-title" className="page-heading">
                  {service.title}
                </h1>
              </div>

              {(service.longDescription ?? service.description) &&
                (Array.isArray(
                  service.longDescription ?? service.description,
                ) ? (
                  <RichBody
                    value={service.longDescription ?? service.description}
                  />
                ) : (
                  <div className="rich-description page-subheading w-full max-w-[960px] text-left">
                    {String(service.longDescription ?? service.description)
                      .split(/\n/)
                      .filter(Boolean)
                      .map((para, i) => (
                        <p
                          key={i}
                          className="mb-4 last:mb-0 text-primary-800 leading-relaxed"
                        >
                          {para}
                        </p>
                      ))}
                  </div>
                ))}
            </div>
          </article>

          <div className="w-full max-w-[960px] border-t border-primary-100 flex flex-col gap-[80px]">
            <div className="flex flex-col items-center md:gap-8 gap-4">
              <p className="text-primary-800 font-medium m-0">
                Dirbame Telšiuose, Šiauliuose, Plungėje, Mažeikiuose, Klaipėdos
                regione ir visoje Žemaitijoje.
              </p>
              <ContactActions
                className="service-detail-actions"
                secondaryVariant="primary"
                messageAriaLabel="Rašyti žinutę per kontaktų formą"
              />
            </div>

            {otherServices.length > 0 && (
              <div className="flex flex-col gap-6 md:gap-10">
                <h2 className="text-lg font-semibold text-primary-800 mb-0 mt-0">
                  Kitos paslaugos
                </h2>
                <ul className="flex flex-wrap list-none m-0 p-0 gap-4 md:gap-8 justify-center w-full">
                  {otherServices.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/${s.slug}`}
                        className="link-default text-primary-500 no-underline"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="text-sm mb-0 mt-0 text-primary-500">
                  <Link
                    href="/paslaugos"
                    className="link-default text-primary-500 no-underline"
                  >
                    Visos paslaugos →
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      {useRedesignedLayout && (
        <div className="service-redesign-bottom">
          {otherServices.length > 0 && (
            <div className="service-redesign-other-services">
              <h2>Kitos paslaugos</h2>
              <ul>
                {otherServices.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/${item.slug}`}>{item.title}</Link>
                  </li>
                ))}
              </ul>
              <Link className="service-redesign-all-services" href="/paslaugos">
                Visos paslaugos <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
