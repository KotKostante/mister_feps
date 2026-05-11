import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FinalCta, ReviewsSection } from "@/components/sections/common";
import { Card, Section, SectionHeading } from "@/components/ui";
import { cities, reviewPlatforms } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Отзывы клиентов Mister FAPC",
  description: "Отзывы B2B-клиентов Mister FAPC с должностями, задачами и результатами работ.",
  alternates: { canonical: absoluteUrl("/reviews/") }
};

export default function ReviewsPage() {
  return (
    <>
      <Section>
        <Breadcrumbs items={[{ label: "Отзывы", href: "/reviews/" }]} />
        <SectionHeading
          title="Отзывы клиентов"
          text="На сайте не используем анонимные отзывы без контекста. Ниже — фильтр по городам (якорные ссылки на страницы офисов)."
        />
        <div className="flex flex-wrap gap-2">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/goroda/${city.slug}/`}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition hover:border-accent"
            >
              {city.name}
            </Link>
          ))}
        </div>
      </Section>

      <ReviewsSection />

      <Section className="bg-surface">
        <SectionHeading title="Отзывы на картах" text="Агрегированный рейтинг на внешних площадках — подключите реальные ссылки в данных сайта." />
        <div className="grid gap-4 sm:grid-cols-3">
          {reviewPlatforms.map((p) => (
            <Card key={p.name} className="shadow-none">
              <p className="font-semibold">{p.name}</p>
              <p className="mt-2 text-2xl font-bold text-primary">{p.rating}</p>
              <a href={p.url} className="mt-3 inline-block text-sm font-medium text-accent">
                Открыть площадку →
              </a>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading title="Оставить отзыв" text="Расскажите о опыте работы — менеджер свяжется для уточнений." />
        <div className="flex justify-center">
          <a
            href="/contacts/#lead-form"
            className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-soft"
          >
            Написать нам
          </a>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
