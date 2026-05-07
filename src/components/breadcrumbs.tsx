import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/utils";

export type Crumb = {
  label: string;
  href: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const allItems = [{ label: "Главная", href: "/" }, ...items];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href)
    }))
  };

  return (
    <>
      <JsonLd data={schema} />
      <nav className="mb-8 text-sm text-muted" aria-label="Навигационная цепочка">
        <ol className="flex flex-wrap gap-2">
          {allItems.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 ? <span>/</span> : null}
              {index === allItems.length - 1 ? <span className="text-foreground">{item.label}</span> : <Link href={item.href}>{item.label}</Link>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
