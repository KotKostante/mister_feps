import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { AdvantagesList, CasesSection, FaqSection, FinalCta, ProcessSection } from "@/components/sections/common";
import { Badge, Card, Section, SectionHeading } from "@/components/ui";
import { cities, faqs, primaryCitySlugs, services } from "@/data/site";
import { faqSchema, localBusinessSchema, serviceSchema } from "@/lib/seo";
import { absoluteUrl, phoneHref } from "@/lib/utils";

type Props = { params: Promise<{ city: string; service: string }> };

export function generateStaticParams() {
  return primaryCitySlugs.flatMap((city) => services.map((service) => ({ city, service: service.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = cities.find((item) => item.slug === citySlug);
  const service = services.find((item) => item.slug === serviceSlug);
  if (!city || !service) return {};

  return {
    title: `${service.title} в ${city.prepositional} — цена, расчет и клининг по договору`,
    description: `${service.title} для бизнеса в ${city.prepositional}. Осмотр объекта, смета, договор, контроль качества, оплата после приемки. Рассчитайте стоимость.`,
    alternates: { canonical: absoluteUrl(`/goroda/${city.slug}/${service.slug}/`) }
  };
}

export default async function ComboPage({ params }: Props) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = cities.find((item) => item.slug === citySlug);
  const service = services.find((item) => item.slug === serviceSlug);
  if (!city || !service) notFound();

  const comboFaq = [
    {
      question: `Сколько стоит ${service.title.toLowerCase()} в ${city.prepositional}?`,
      answer: `Ориентир начинается ${service.priceFrom}. Точная смета зависит от площади, графика, загрязнений, расходников, допуска и требований к документам.`
    },
    {
      question: `Можно ли организовать бесплатный осмотр в ${city.prepositional}?`,
      answer: `Да. Менеджер согласует время осмотра, уточнит регламент и подготовит КП под объект.`
    },
    ...faqs.slice(1, 3)
  ];

  return (
    <>
      <JsonLd data={localBusinessSchema(city, `/goroda/${city.slug}/${service.slug}/`)} />
      <JsonLd data={serviceSchema(service, `/goroda/${city.slug}/${service.slug}/`, city)} />
      <JsonLd data={faqSchema(comboFaq)} />
      <Section>
        <Breadcrumbs
          items={[
            { label: "Города", href: "/goroda/" },
            { label: city.name, href: `/goroda/${city.slug}/` },
            { label: service.title, href: `/goroda/${city.slug}/${service.slug}/` }
          ]}
        />
        <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr]">
          <div>
            <Badge>SEO-страница город × услуга</Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">{service.title} в {city.prepositional}</h1>
            <p className="mt-5 text-lg leading-8 text-muted">
              {service.description} В {city.prepositional} учитываем локальную логистику, график доступа на объект, требования управляющей компании и сроки приемки.
            </p>
          </div>
          <Card>
            <p className="text-sm font-semibold text-primary">Локальный расчет</p>
            <p className="mt-3 text-4xl font-bold">{service.priceFrom}</p>
            <a href={phoneHref(city.phone)} className="mt-4 block font-semibold">{city.phone}</a>
            <p className="mt-2 text-sm text-muted">{city.address}</p>
          </Card>
        </div>
      </Section>
      <Section className="bg-surface">
        <SectionHeading title="Состав услуги" text={`Для объекта в ${city.prepositional} регламент собирается из фактических зон, режима доступа и требований к приемке.`} />
        <div className="grid gap-4 md:grid-cols-2">
          {service.includes.map((item) => <Card key={item} className="shadow-none"><p className="font-semibold">{item}</p></Card>)}
        </div>
      </Section>
      <ProcessSection />
      <Section>
        <SectionHeading title="Цена и факторы расчета" text="Стоимость фиксируем после осмотра, чтобы смета была понятной и защищаемой перед закупками." />
        <div className="grid gap-4 md:grid-cols-3">
          {service.factors.map((item) => <Card key={item}><p className="font-semibold">{item}</p></Card>)}
        </div>
      </Section>
      <Section className="bg-surface">
        <SectionHeading title="Контроль и документы" text="Работы принимаются по чек-листу, а замечания возвращаются в регламент и закрываются менеджером." />
        <AdvantagesList />
      </Section>
      <CasesSection />
      <FaqSection items={comboFaq} />
      <FinalCta city={city.name} service={service.title} />
    </>
  );
}
