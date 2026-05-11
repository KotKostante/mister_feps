import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, cn } from "@/lib/utils";

export type Crumb = {
  label: string;
  href: string;
};

/** default — светлая страница; onHeroDark — поверх фото с тёмным градиентом как MarketingHero */
export function Breadcrumbs({ items, variant = "default" }: { items: Crumb[]; variant?: "default" | "onHeroDark" }) {
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
      <nav
        className={cn(
          "mb-8 text-sm",
          variant === "onHeroDark"
            ? "text-hero-readable-soft text-white/55 [&_a]:text-white/80 [&_a:hover]:text-white [&_span:not(.crumb-sep)]:text-white"
            : "text-muted"
        )}
        aria-label="Навигационная цепочка"
      >
        <ol className="flex flex-wrap gap-2">
          {allItems.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 ? <span className="crumb-sep opacity-70">/</span> : null}
              {index === allItems.length - 1 ? (
                <span className={variant === "onHeroDark" ? "text-white" : "text-foreground"}>{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
