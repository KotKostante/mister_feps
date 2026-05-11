import Link from "next/link";
import { Container } from "@/components/ui";
import { brand, cities, services } from "@/data/site";
import { phoneHref } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface pb-24 pt-12 md:pb-12">
      <Container className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <p className="text-xl font-bold">{brand.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
            Клининг для юридических лиц: регламенты, чек-листы, персональный менеджер, документы и контроль качества по договору.
          </p>
          <div className="mt-5 grid gap-2 text-sm">
            <a href={phoneHref(brand.mainPhone)} className="font-semibold">{brand.mainPhone}</a>
            <a href={`mailto:${brand.email}`} className="text-muted">{brand.email}</a>
            <span className="text-muted">{brand.legalName}</span>
          </div>
        </div>
        <div>
          <p className="mb-4 font-semibold">Услуги</p>
          <div className="grid gap-2 text-sm text-muted">
            {services.slice(0, 8).map((service) => (
              <Link key={service.slug} href={`/uslugi/${service.slug}/`}>{service.title}</Link>
            ))}
            <Link href="/uslugi/" className="mt-1 font-semibold text-accent">Все услуги →</Link>
          </div>
        </div>
        <div>
          <p className="mb-4 font-semibold">Города</p>
          <div className="grid gap-2 text-sm text-muted">
            {cities.map((city) => (
              <Link key={city.slug} href={`/goroda/${city.slug}/`}>{city.name}</Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-4 font-semibold">Инфо</p>
          <div className="grid gap-2 text-sm text-muted">
            <Link href="/prices/">Цены</Link>
            <Link href="/sla/">SLA</Link>
            <Link href="/cases/">Кейсы</Link>
            <Link href="/reviews/">Отзывы</Link>
            <Link href="/faq/">FAQ</Link>
            <Link href="/blog/">Блог</Link>
            <Link href="/about/">О компании</Link>
            <Link href="/privacy/">Политика конфиденциальности</Link>
            <Link href="/terms/">Условия</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
