import { Fragment } from "react";
import Link from "next/link";

/**
 * Breadcrumb nav for detail pages. Items: { href?, label } – last item is current (no href).
 */
export default function Breadcrumb({ items }) {
  if (!items?.length) return null;
  return (
    <nav aria-label="Navigacijos kelias" className="w-full max-w-[960px] mb-4">
      <ol className="flex flex-wrap gap-2 text-sm text-primary-500 list-none m-0 p-0">
        {items.map((item, i) => (
          <Fragment key={i}>
            {i > 0 && <li aria-hidden>/</li>}
            {item.href != null ? (
              <li>
                <Link href={item.href} className="link-default no-underline">
                  {item.label}
                </Link>
              </li>
            ) : (
              <li className="text-primary-800" aria-current="page">
                {item.label}
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
