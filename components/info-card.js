import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function InfoCard({ icon, title, description, href }) {
  const Card = (
    <div className="w-full rounded-lg bg-gray-white border border-primary-100 flex flex-col p-4 text-left text-gray-700 font-body-regular-400 transition-all hover:shadow-[0px_24px_68px_rgba(59,_77,_129,_0.08)] hover:border-primary-200 group">
      <div className="flex flex-col gap-6">
        {icon && <div className="text-primary-500">{icon}</div>}

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-primary-800 flex-1 min-w-0">
              {title}
            </h3>
            {href && (
              <ChevronRight
                className="w-4 h-4 flex-shrink-0 text-primary-500 group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all"
                aria-hidden
              />
            )}
          </div>
          {description && (
            <p className="text-base leading-[24px] text-lightslategray">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return href ? (
    <Link
      href={href}
      className="no-underline flex w-full focus:outline-none focus:ring-1 focus:ring-primary-400/25 focus:ring-offset-1 rounded-lg"
    >
      {Card}
    </Link>
  ) : (
    Card
  );
}
