"use client";

import { PortableText } from "@portabletext/react";

/** Allow only http(s) or relative paths to prevent javascript:/data: XSS from CMS content */
function safeHref(href) {
  if (typeof href !== "string" || !href.trim()) return undefined;
  const trimmed = href.trim();
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) return trimmed;
  try {
    const u = new URL(trimmed);
    if (u.protocol === "https:" || u.protocol === "http:") return trimmed;
  } catch (_) {}
  return undefined;
}

const components = {
  block: {
    normal: ({ children }) => (
      <p className="text-primary-800 text-base leading-relaxed mb-4 last:mb-0">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-semibold text-primary-800">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-semibold text-primary-800">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside text-primary-800 space-y-1 mb-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside text-primary-800 space-y-1 mb-4">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    fontSize: ({ value, children }) => {
      const allowed = ["small", "normal", "large", "x-large", "xx-large"];
      const size =
        value?.size && allowed.includes(String(value.size))
          ? value.size
          : "normal";
      return <span className={`text-size-${size}`}>{children}</span>;
    },
    link: ({ value, children }) => {
      const href = safeHref(value?.href);
      if (!href) return <span className="link-default">{children}</span>;
      return (
        <a
          href={href}
          className="link-default"
          target={value?.blank ? "_blank" : undefined}
          rel={value?.blank ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

export default function RichBody({ value }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  return (
    <div className="rich-description w-full max-w-[960px] text-left">
      <PortableText value={value} components={components} />
    </div>
  );
}
