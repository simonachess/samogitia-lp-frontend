/**
 * Optional wrapper for standard page section (bg, padding, container).
 * Most pages use the CSS utilities directly: page-section, page-container, page-section-inner.
 * See docs/layout-utilities.md.
 */
export default function PageSection({
  children,
  as: Tag = "section",
  narrow = false,
  innerGap = true,
  minHeight,
  className = "",
  containerClassName = "",
}) {
  const sectionClass = [
    "page-section",
    minHeight ? "min-h-[60vh]" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const containerClass = [
    narrow ? "page-container-narrow" : "page-container",
    innerGap ? "page-section-inner" : "flex flex-col items-center",
    containerClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={sectionClass}>
      <div className={containerClass}>{children}</div>
    </Tag>
  );
}
