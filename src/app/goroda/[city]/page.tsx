import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { AdvantagesList, FaqSection, FinalCta } from "@/components/sections/common";
import { Badge, Card, Section, SectionHeading } from "@/components/ui";
import { cities, faqs, services } from "@/data/site";
import { faqSchema, localBusinessSchema } from "@/lib/seo";
import { absoluteUrl, phoneHref } from "@/lib/utils";

type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = cities.find((item) => item.slug === citySlug);
  if (!city) return {};
  return {
    title: `Клининг в ${city.prepositional} — услуги для бизнеса`,
    description: `Профессиональный клининг в ${city.prepositional}: офисы, склады, производства, генеральная уборка и уборка после ремонта. Договор, SLA, смета и документы.`,
    alternates: { canonical: absoluteUrl(`/goroda/${city.slug}/`) }
  };
}

export default async function CityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = cities.find((item) => item.slug === citySlug);
  if (!city) notFound();

  const cityFaq = [
    ...faqs.slice(0, 2),
    {
      question: `Как быстро выезжаете на объект в ${city.prepositional}?`,
      answer: `Менеджер может согласовать бесплатный осмотр в день обращения. Время зависит от района, допуска и срочности задачи.`
    }
  ];

  return (
    <>
      <JsonLd data={localBusinessSchema(city, `/goroda/${city.slug}/`)} />
      <JsonLd data={faqSchema(cityFaq)} />
      <Section>
        <Breadcrumbs items={[{ label: "Города", href: "/goroda/" }, { label: city.name, href: `/goroda/${city.slug}/` }]} />
        <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr]">
          <div>
            <Badge>Локальная команда и телефон</Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">Клининг в {city.prepositional}</h1>
            <p className="mt-5 text-lg leading-8 text-muted">
              Обслуживаем офисы, склады, производства, торговые объекты и помещения после ремонта в {city.prepositional}. Фиксируем график, команду, смету и приемку по договору.
            </p>
          </div>
          <Card>
            <p className="text-sm font-semibold text-primary">Контакты города</p>
            <a href={phoneHref(city.phone)} className="mt-3 block text-2xl font-bold">{city.phone}</a>
            <p className="mt-3 text-muted">{city.address}</p>
            <p className="mt-3 text-sm text-muted">{city.area}</p>
            {city.note ? <p className="mt-4 rounded-lg border border-warning/40 bg-warning/10 p-3 text-xs text-muted">{city.note}</p> : null}
          </Card>
        </div>
      </Section>
      <Section className="bg-surface">
        <SectionHeading title={`Услуги в ${city.prepositional}`} text="Комбо-страницы город × услуга закрывают конкретные поисковые запросы и ведут к расчету." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.slug} href={`/goroda/${city.slug}/${service.slug}/`}>
              <Card className="h-full shadow-none transition hover:border-primary">
                <h2 className="text-xl font-semibold">{service.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{service.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeading title="Локальные преимущества" text={`В ${city.prepositional} важны быстрый осмотр, предсказуемая логистика и единый менеджер для объекта.`} />
        <AdvantagesList />
      </Section>
      <FaqSection items={cityFaq} />
      <FinalCta city={city.name} />
    </>
  );
}
