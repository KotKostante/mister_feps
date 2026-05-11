import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import {
  AdvantagesList,
  CasesSection,
  ComboOtherServices,
  FaqSection,
  FinalCta,
  HeroRightCityCard,
  MarketingHero,
  ProcessSection,
  ReviewsSection,
  SlaMiniSection,
  WhyUsSplit
} from "@/components/sections/common";
import { ServiceDetailSections } from "@/components/service-detail/service-detail-sections";
import { ServiceHeroDark } from "@/components/service-detail/service-hero-dark";
import { ButtonLink, Card, Container, NumberedStepCard, Section, SectionHeading } from "@/components/ui";
import { cases, cities, faqs, primaryCitySlugs, services } from "@/data/site";
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

  /** Все кейсы по услуге; кейсы текущего города — сверху (не обрезаем до «только локальный», иначе в Екб по офисам остаётся 1 карточка вместо полного набора) */
  const casesForService = cases.filter((c) => c.serviceSlug === service.slug);
  const localCases = casesForService.filter((c) => c.citySlug === city.slug);
  const otherServiceCases = casesForService.filter((c) => c.citySlug !== city.slug);
  const comboCasesList = casesForService.length > 0 ? [...localCases, ...otherServiceCases] : cases;

  const comboFaq = [
    {
      question: `Выезжаем ли в районы и пригород ${city.genitive}?`,
      answer: `Да. Зона работ — ${city.area}; адрес и время выезда фиксируем при расчёте и в графике.`
    },
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

  /** Уборка офисов: полная копия `/uslugi/uborka-ofisov/` с городским героем и локальной заявкой */
  if (service.slug === "uborka-ofisov") {
    const pageFaqUborka = [
      ...comboFaq.slice(0, 3),
      ...(service.faqExtra ?? []),
      {
        question: `Что входит в ${service.genitive}?`,
        answer: `Состав работ фиксируем в чек-листе: ${service.includes.join(", ")}. Точный регламент зависит от объекта, графика и требований к документам.`
      }
    ];

    return (
      <>
        <JsonLd data={localBusinessSchema(city, `/goroda/${city.slug}/${service.slug}/`)} />
        <JsonLd data={serviceSchema(service, `/goroda/${city.slug}/${service.slug}/`, city)} />
        <JsonLd data={faqSchema(pageFaqUborka)} />
        <ServiceHeroDark service={service} city={city} />
        <ServiceDetailSections
          service={service}
          casesListForPage={comboCasesList}
          pageFaq={pageFaqUborka}
          leadCity={city.name}
        />
      </>
    );
  }

  return (
    <>
      <JsonLd data={localBusinessSchema(city, `/goroda/${city.slug}/${service.slug}/`)} />
      <JsonLd data={serviceSchema(service, `/goroda/${city.slug}/${service.slug}/`, city)} />
      <JsonLd data={faqSchema(comboFaq)} />

      <section className="border-b border-border bg-background py-3 sm:py-4">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Города", href: "/goroda/" },
              { label: city.name, href: `/goroda/${city.slug}/` },
              { label: service.title, href: `/goroda/${city.slug}/${service.slug}/` }
            ]}
          />
        </Container>
      </section>

      <MarketingHero
        eyebrow={`${city.name} · ${service.shortTitle}`}
        title={
          <>
            {service.title} в {city.prepositional}
          </>
        }
        subtitle={`${service.description} В ${city.prepositional} учитываем локальную логистику, график доступа на объект и требования УК. Ориентир по цене: ${service.priceFrom}.`}
        primaryCta={{ href: "/contacts/#lead-form", label: "Рассчитать стоимость" }}
        secondaryCta={{ href: phoneHref(city.phone), label: "Позвонить в офис" }}
        showStats
        right={<HeroRightCityCard city={city} priceHint={service.priceFrom} />}
      />

      <WhyUsSplit
        imageAlt={`${service.title} в ${city.prepositional}`}
        eyebrow="Почему нас выбирают на объекте"
        title="Чек-листы, менеджер и документы — без хаоса на площадке"
        description={`Тот же стандарт, что на главной: закреплённая команда, приёмка и закрытие замечаний для ${service.genitive} в ${city.prepositional}.`}
        actions={
          <>
            <ButtonLink href="/sla/">Открыть SLA</ButtonLink>
            <ButtonLink href={`/goroda/${city.slug}/${service.slug}/#lead-form`} variant="secondary">
              Заявка на расчёт
            </ButtonLink>
          </>
        }
      />
      <Section className="bg-surface">
        <SectionHeading title={`Условия в ${city.prepositional}`} text="Локальная команда, телефон офиса и логистика выезда учитываются в расчёте и графике." />
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="shadow-none">
            <p className="font-semibold">Выезд и логистика</p>
            <p className="mt-2 text-sm text-muted">Согласуем окно доступа и время выезда бригады под объект.</p>
          </Card>
          <Card className="shadow-none">
            <p className="font-semibold">Закреплённый контакт</p>
            <a href={phoneHref(city.phone)} className="mt-2 block text-lg font-bold text-primary">
              {city.phone}
            </a>
            <p className="mt-1 text-sm text-muted">{city.address}</p>
          </Card>
          <Card className="shadow-none">
            <p className="font-semibold">Команда под объект</p>
            <p className="mt-2 text-sm text-muted">Бригадир и менеджер остаются теми же между сменами.</p>
          </Card>
        </div>
      </Section>
      <Section>
        <SectionHeading title="Состав услуги" text={`Для объекта в ${city.prepositional} регламент собирается из фактических зон, режима доступа и требований к приемке.`} />
        <div className="grid gap-4 md:grid-cols-2">
          {service.includes.map((item, index) => (
            <NumberedStepCard key={item} index={index + 1} title={item} />
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeading title={`Стоимость в ${city.prepositional}`} text="Ориентир и факторы — финальная сумма после осмотра." />
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Card>
            <p className="text-sm font-semibold text-primary">От</p>
            <p className="mt-2 text-3xl font-bold">{service.priceFrom}</p>
          </Card>
          <Card className="shadow-none">
            <p className="font-semibold">Факторы сметы</p>
            <ul className="mt-3 list-inside list-disc text-sm text-muted">
              {service.factors.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a href="/prices/" className="mt-4 inline-block text-sm font-semibold text-accent">
              Полная таблица тарифов →
            </a>
          </Card>
        </div>
      </Section>
      <ProcessSection />
      <SlaMiniSection />
      <Section>
        <SectionHeading title={`Объекты в ${city.prepositional}`} text="Работаем с офисами, ритейлом, складами и производствами — масштаб подбирается под регламент." />
        <div className="grid gap-4 md:grid-cols-3">
          {["Офисные и административные здания", "Торговые и складские комплексы", "Промышленные и логистические площадки"].map((t) => (
            <Card key={t} className="shadow-none">
              <p className="font-semibold">{t}</p>
            </Card>
          ))}
        </div>
      </Section>
      <Section className="bg-surface">
        <SectionHeading title="Контроль и документы" text="Работы принимаются по чек-листу, а замечания возвращаются в регламент и закрываются менеджером." />
        <AdvantagesList />
      </Section>
      <CasesSection title={`Кейсы по услуге в ${city.prepositional}`} casesList={comboCasesList} showMoreButton={false} />
      <Section className="bg-surface py-10 sm:py-12">
        <SectionHeading title="Документы и связь" text="Тот же стандарт, что на полной странице услуги: SLA, кейсы и прямой контакт офиса." />
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/sla/">SLA и регламент</ButtonLink>
          <ButtonLink href="/cases/" variant="secondary">
            Кейсы компании
          </ButtonLink>
          <a
            href={phoneHref(city.phone)}
            className="btn-kinetic focus-ring inline-flex min-h-12 items-center justify-center rounded-lg border border-border bg-background px-5 text-base font-semibold transition hover:border-accent/50"
          >
            Позвонить: {city.phone}
          </a>
        </div>
      </Section>
      <ReviewsSection />
      <ComboOtherServices citySlug={city.slug} currentSlug={service.slug} />
      <FaqSection items={comboFaq} />
      <FinalCta city={city.name} service={service.title} />
    </>
  );
}
