import Link from "next/link";

export default function InfoCard({ icon, title, description, href }) {
  const Card = (
    <div
      className={`w-full rounded-lg bg-gray-white shadow-[0px_24px_68px_rgba(59,_77,_129,_0.08)]
      flex flex-col p-[22px] text-left text-gray-700 font-body-regular-400
      transition-shadow ${
        href
          ? "cursor-pointer hover:shadow-[0px_30px_80px_rgba(59,_77,_129,_0.12)]"
          : ""
      }`}
    >
      <div className="flex flex-col gap-6">
        {icon && <div className="text-primary-500">{icon}</div>}

        <div className="flex flex-col gap-4">
          <h3 className="card-heading">{title}</h3>
          {description && (
            <p className="text-base leading-[24px] text-lightslategray">
              <span className="mr-3">{description}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return href ? (
    <Link href={href} className="no-underline flex w-full">
      {Card}
    </Link>
  ) : (
    Card
  );
}
