"use client";

import { PortableText } from "@portabletext/react";

const components = {
  block: {
    normal: ({ children }) => (
      <p className="text-primary-800 text-base leading-relaxed mb-4 last:mb-0">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="text-lg font-semibold text-primary-800 mt-6 mb-2 first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-base font-semibold text-primary-800 mt-4 mb-2">
        {children}
      </h3>
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
      const size = value?.size || "normal";
      const className = `text-size-${size}`;
      return <span className={className}>{children}</span>;
    },
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="text-primary-600 underline hover:text-primary-700"
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
};

export default function RichBody({ value }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  return (
    <div className="rich-description w-full text-left">
      <PortableText value={value} components={components} />
    </div>
  );
}
