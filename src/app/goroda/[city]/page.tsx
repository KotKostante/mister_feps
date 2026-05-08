import type { Metadata } from "next";
import { BadgeCheck, CheckCircle2, CreditCard, FileCheck2, Users } from "lucide-react";
import { CleanWindowDemo } from "@/components/clean-window-demo";
import { notFound } from "next/navigation";
import { AnimatedNumber } from "@/components/animated-number";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { CasesSection, FaqSection, FinalCta, ProcessSection, ReviewsSection, SlaMiniSection } from "@/components/sections/common";
import { Badge, ButtonLink, Card, Section, SectionHeading } from "@/components/ui";
import { cities, faqs, services, trustStats } from "@/data/site";
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

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[1100px] lg:inset-0 lg:h-auto">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt=""
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070a0d]/96 via-[#070a0d]/82 to-[#070a0d]/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070a0d]/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[#070a0d]/55 lg:hidden" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background lg:hidden" />
        </div>
        <div className="pointer-events-none absolute -left-60 top-1/2 -z-10 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-primary/18 blur-[140px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-accent/12 blur-[100px]" aria-hidden="true" />

        <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:px-8 lg:py-32">
          <div>
            <div className="mt-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent backdrop-blur-sm">
                Клининговая компания в {city.prepositional}
              </span>
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              Клининг для бизнеса в {city.prepositional} —{" "}
              <span className="text-primary">без ручного контроля</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
              Офисы, склады, производства и торговые объекты в {city.prepositional}. Закрепляем команду, фиксируем смету и принимаем работу по договору.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`/goroda/${city.slug}/#lead-form`}>Рассчитать стоимость уборки</ButtonLink>
              <a
                href={phoneHref(city.phone)}
                className="inline-flex items-center rounded-xl border border-white/20 bg-white/8 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/12"
              >
                {city.phone}
              </a>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {trustStats.map((stat, index) => (
                <div key={stat.value} className="rounded-xl border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
                  <p className="text-2xl font-bold text-white">
                    {index === 0 ? <><AnimatedNumber value={12} /> лет</> : null}
                    {index === 1 ? <><AnimatedNumber value={97} suffix="%" /></> : null}
                    {index === 2 ? <AnimatedNumber value={420} /> : null}
                    {index === 3 ? <><AnimatedNumber value={1250000} suffix=" м²" /></> : null}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/50">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* правая карточка с контактами города */}
          <div className="rounded-2xl border border-border bg-background/90 p-6 backdrop-blur-xl">
            <div className="rounded-xl bg-accent/15 p-5">
              <BadgeCheck className="h-10 w-10 text-accent" />
              <p className="mt-4 text-xl font-semibold text-foreground">Офис в {city.prepositional}</p>
              <a href={phoneHref(city.phone)} className="mt-3 block text-2xl font-bold text-foreground">{city.phone}</a>
              <p className="mt-2 text-sm text-muted">{city.address}</p>
              <p className="mt-1 text-xs text-muted">{city.area}</p>
            </div>
            <div className="mt-4 grid gap-2">
              {["Бесплатный выезд менеджера", "Клинтест и подбор химии", "Оплата после приёмки", "44-ФЗ / 223-ФЗ для тендеров"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg border border-accent/50 bg-black/8 dark:bg-white/6 px-4 py-3 text-base font-semibold text-accent"
                >
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <CleanWindowDemo />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURE SPLIT
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-background">
        <div className="mx-auto grid w-full max-w-[1200px] px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-8 lg:grid-cols-2 lg:items-stretch lg:gap-16 lg:px-8 lg:pb-24 lg:pt-10">
          <div className="col-span-full mb-2">
            <Breadcrumbs items={[{ label: "Города", href: "/goroda/" }, { label: city.name, href: `/goroda/${city.slug}/` }]} />
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src="/foto1.png"
              alt={`Профессиональный клининг в ${city.prepositional}`}
              className="h-[420px] w-full object-cover lg:h-full lg:min-h-[480px]"
            />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Почему выбирают нас в {city.prepositional}</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              Контроль, прозрачность и результат — от заявки до акта
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              Не просто уборка — полный цикл управления чистотой объекта в {city.prepositional}.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: CheckCircle2, title: "Чек-листы по каждому объекту", desc: "Фиксируем каждую зону — ничего не пропускается" },
                { icon: Users, title: "Закреплённая команда", desc: "Один менеджер, один бригадир, один стандарт" },
                { icon: CreditCard, title: "Оплата после приёмки", desc: "Платите только за принятую работу" },
                { icon: FileCheck2, title: "Документы для юрлиц", desc: "Договор, КП, акты, ЭДО, работа с НДС" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-xl border border-border bg-surface p-4">
                    <Icon className="mb-3 h-5 w-5 text-accent" />
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="mt-1 text-sm text-muted">{item.desc}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/sla/">Открыть SLA</ButtonLink>
              <a href={`/goroda/${city.slug}/#lead-form`} className="inline-flex items-center rounded-xl border border-accent/40 bg-accent/8 px-5 py-2.5 text-sm font-semibold text-accent transition hover:border-accent/70 hover:bg-accent/15">
                Получить пример регламента
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          УСЛУГИ × ГОРОД
      ══════════════════════════════════════════════════════ */}
      <Section>
        <SectionHeading
          title={`Услуги клининга в ${city.prepositional}`}
          text={`Каждая страница — отдельный расчёт под объект в ${city.prepositional}: состав работ, смета и документы.`}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <a key={service.slug} href={`/goroda/${city.slug}/${service.slug}/`} className="group rounded-xl">
                <Card className="h-full transition group-hover:-translate-y-1 group-hover:border-accent">
                  <Icon className="mb-4 h-7 w-7 text-accent" />
                  <h2 className="text-lg font-semibold">{service.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{service.description}</p>
                  <p className="mt-3 text-sm font-semibold text-accent">{service.priceFrom}</p>
                </Card>
              </a>
            );
          })}
        </div>
      </Section>

      <ProcessSection />
      <SlaMiniSection />
      <CasesSection />
      <ReviewsSection />
      <FaqSection items={cityFaq} />
      <FinalCta city={city.name} />
    </>
  );
}
