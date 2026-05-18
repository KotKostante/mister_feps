import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import {
  CasesSection,
  CityContactsSection,
  CityCoverageSection,
  FaqSection,
  FinalCta,
  HeroRightCityCard,
  MarketingHero,
  ProcessSection,
  ReviewsSection,
  ServicesGrid,
  SlaMiniSection,
  WhyUsSplit
} from "@/components/sections/common";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { cases, cities, faqs } from "@/data/site";
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
    title: `Клининг в ${city.prepositional} — услуги для бизнеса | Mister FAPC`,
    description: `Профессиональный клининг в ${city.prepositional}: офисы, склады, производства, торговые объекты. Договор, SLA, оплата после приёмки. Выезд менеджера в день обращения.`,
    alternates: { canonical: absoluteUrl(`/goroda/${city.slug}/`) }
  };
}

export default async function CityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = cities.find((item) => item.slug === citySlug);
  if (!city) notFound();

  const cityCases = cases.filter((c) => c.citySlug === city.slug);

  const cityFaq = [
    {
      question: `Как быстро выезжаете на объект в ${city.prepositional}?`,
      answer: `Менеджер согласует бесплатный осмотр в день обращения. Время зависит от района, допуска и срочности задачи.`
    },
    ...faqs.slice(0, 2),
    {
      question: `Работаете с юридическими лицами в ${city.prepositional}?`,
      answer: `Да. Готовим договор, КП, смету, акты, тендерную документацию и работаем через ЭДО. Формат НДС или без НДС согласуется перед договором.`
    }
  ];

  return (
    <>
      <JsonLd data={localBusinessSchema(city, `/goroda/${city.slug}/`)} />
      <JsonLd data={faqSchema(cityFaq)} />

      <MarketingHero
        eyebrow={`Клининговая компания в ${city.prepositional}`}
        title={
          <>
            Клининг в {city.prepositional} — <span className="text-primary">без ручного контроля</span>
          </>
        }
        subtitle={`Офисы, склады, производства и торговые объекты в ${city.prepositional}. Закрепляем команду, фиксируем смету и принимаем работу по договору.`}
        primaryCta={{ href: `/goroda/${city.slug}/#lead-form`, label: "Рассчитать стоимость уборки" }}
        secondaryCta={{ href: phoneHref(city.phone), label: city.phone }}
        showStats
        right={<HeroRightCityCard city={city} />}
      />

      <Section>
        <div className="mb-6">
          <Breadcrumbs items={[{ label: "Города", href: "/goroda/" }, { label: city.name, href: `/goroda/${city.slug}/` }]} />
        </div>
        <SectionHeading
          title={`Услуги клининга в ${city.prepositional}`}
          text={`Каждая страница — отдельный расчёт под объект в ${city.prepositional}: состав работ, смета и документы.`}
        />
        <ServicesGrid citySlug={city.slug} />
      </Section>

      <CityCoverageSection city={city} />

      <WhyUsSplit
        imageAlt={`Профессиональный клининг в ${city.prepositional}`}
        eyebrow={`Почему доверяют в ${city.prepositional}`}
        title="Контроль, прозрачность и результат — от заявки до акта"
        description={`Не просто уборка — полный цикл управления чистотой объекта в ${city.prepositional}.`}
        actions={
          <>
            <ButtonLink href="/sla/">Открыть SLA</ButtonLink>
            <a
              href={`/goroda/${city.slug}/#lead-form`}
              className="inline-flex items-center rounded-xl border border-accent/40 bg-accent/8 px-5 py-2.5 text-sm font-semibold text-accent transition hover:border-accent/70 hover:bg-accent/15"
            >
              Получить пример регламента
            </a>
          </>
        }
      />

      <ProcessSection />
      <SlaMiniSection />
      <CasesSection
        title={`Кейсы из ${city.genitive}`}
        intro="Реальные объекты и масштабы работ."
        casesList={cityCases.length ? cityCases : cases}
      />
      <ReviewsSection />
      <CityContactsSection city={city} />
      <FaqSection items={cityFaq} moreHref="/faq/" />
      <FinalCta city={city.name} />
    </>
  );
}
