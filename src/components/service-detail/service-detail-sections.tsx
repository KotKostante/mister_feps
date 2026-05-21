import type { LucideIcon } from "lucide-react";
import { Briefcase, CheckCircle2, ClipboardCheck, Droplets, Sparkles } from "lucide-react";
import Image from "next/image";
import {
  AdvantagesList,
  CasesSection,
  CityContactsSection,
  CityGrid,
  FaqSection,
  FinalCta,
  ProcessSection,
  ReviewsSection,
  SlaMiniSection,
  WhyUsSplit
} from "@/components/sections/common";
import {
  ButtonLink,
  Card,
  Container,
  IconStepCard,
  NumberedDeltaCard,
  NumberedStepCard,
  Section,
  SectionHeading
} from "@/components/ui";
import type { City, Service } from "@/data/site";
import { hintForServiceFactor } from "@/lib/service-factor-hints";
import { cn } from "@/lib/utils";
import { DEFAULT_CLIENT_RESULTS, DEFAULT_SERVICE_AUDIENCE } from "./service-detail-defaults";

type FaqItem = { question: string; answer: string };

/** Иконки для блока «Что входит» — уборка офисов (совпадает по смыслу с `includes` в site.ts) */
const OFFICE_INCLUDES_VISUAL: { title: string; icon: LucideIcon }[] = [
  { title: "рабочие зоны и переговорные", icon: Briefcase },
  { title: "санузлы и кухни", icon: Droplets },
  { title: "полы, стеклянные поверхности, мебель", icon: Sparkles },
  { title: "расходники и контроль замечаний", icon: ClipboardCheck }
];

/** Мини-оглавление для длинной посадочной услуги */
function ServiceDetailAnchorNav({ showCases }: { showCases: boolean }) {
  const links = [
    { href: "#service-includes", label: "Состав" },
    { href: "#service-pricing", label: "Цена" },
    { href: "#service-factors", label: "Факторы" },
    ...(showCases ? [{ href: "#service-cases", label: "Кейсы" }] : []),
    { href: "#service-faq", label: "Вопросы" }
  ];
  return (
    <nav aria-label="Разделы страницы" className="mb-10 flex flex-wrap gap-2 border-b border-border pb-6">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-muted transition hover:border-accent hover:text-accent"
        >
          {l.label}
        </a>
      ))}
    </nav>
  );
}

/**
 * Контент страницы услуги под героем — один в один с `/uslugi/[slug]/`,
 * чтобы размножить по городам (напр. `/goroda/{city}/uborka-ofisov/`).
 */
export function ServiceDetailSections({
  service,
  casesListForPage,
  pageFaq,
  leadCity,
  city
}: {
  service: Service;
  casesListForPage: Parameters<typeof CasesSection>[0]["casesList"];
  pageFaq: FaqItem[];
  /** Имя города для формы заявки в финальном блоке */
  leadCity?: string;
  city?: City;
}) {
  const audienceBlocks = service.audience ?? DEFAULT_SERVICE_AUDIENCE;
  const clientResultPairs = service.clientResults ?? DEFAULT_CLIENT_RESULTS;
  const galleryItems = service.gallery ?? [];
  const showGallery = galleryItems.length > 1;
  const includesVisualSrc = service.heroCover ?? service.pricingSectionImage;
  const relevantCases = casesListForPage ?? [];

  return (
    <>
      <Container className="pb-2 pt-6 sm:pt-8">
        <ServiceDetailAnchorNav showCases={relevantCases.length > 0} />
      </Container>

      {showGallery ? (
        <Section id="service-gallery">
          <SectionHeading title="Фото с объектов" />
          <div className="grid gap-3 md:grid-cols-3 lg:gap-4">
            {galleryItems.map((item, index) => (
              <figure
                key={`${item.src}-${index}`}
                className="group overflow-hidden rounded-lg border border-border bg-surface shadow-soft transition hover:border-accent/40"
              >
                <Image
                  src={encodeURI(item.src)}
                  alt={item.alt}
                  width={900}
                  height={675}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="aspect-[16/10] h-auto w-full object-cover transition duration-300 group-hover:scale-[1.025]"
                />
              </figure>
            ))}
          </div>
        </Section>
      ) : null}

      <Section id="service-includes" className={cn("scroll-mt-28", showGallery ? "bg-surface" : undefined)}>
        <SectionHeading title="Что входит в услугу" text="Состав работ фиксируется до старта и становится частью регламента приемки." />
        {!showGallery && includesVisualSrc ? (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-start">
            <figure className="relative mx-auto aspect-[4/3] w-full max-w-[400px] overflow-hidden rounded-2xl border border-border shadow-soft lg:mx-0 lg:max-w-none">
              <Image
                src={encodeURI(includesVisualSrc)}
                alt={`Иллюстрация услуги «${service.shortTitle}»`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 340px"
              />
            </figure>
            <div className="grid gap-4 md:grid-cols-2">
              {service.slug === "uborka-ofisov"
                ? OFFICE_INCLUDES_VISUAL.map((row) => <IconStepCard key={row.title} icon={row.icon} title={row.title} />)
                : service.includes.map((item, index) => (
                    <NumberedStepCard key={item} index={index + 1} title={item} />
                  ))}
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {service.slug === "uborka-ofisov"
              ? OFFICE_INCLUDES_VISUAL.map((row) => <IconStepCard key={row.title} icon={row.icon} title={row.title} />)
              : service.includes.map((item, index) => (
                  <NumberedStepCard key={item} index={index + 1} title={item} />
                ))}
          </div>
        )}
      </Section>

      <Section id="service-audience" className={showGallery ? undefined : "bg-surface"}>
        <SectionHeading title="Кому подходит" text="Типовые объекты, для которых услуга закрывает задачу «чисто, стабильно, по документам»." />
        <div className="grid gap-4 md:grid-cols-3">
          {audienceBlocks.map((block, index) => (
            <NumberedStepCard key={block.title} index={index + 1} title={block.title} description={block.text} />
          ))}
        </div>
      </Section>

      <Section id="service-results" className={showGallery ? "bg-surface" : undefined}>
        <SectionHeading title="Результат для клиента" text="Что меняется после запуска сервиса по договору." />
        <div className="grid gap-4 md:grid-cols-2">
          {clientResultPairs.map(([was, now], index) => (
            <NumberedDeltaCard key={was} index={index + 1} before={was} after={now} />
          ))}
        </div>
      </Section>

      <Section id="service-standards" className={showGallery ? undefined : "bg-surface"}>
        <SectionHeading title="Стандарт и регламент" text="Оборудование, химия и SLA согласуются до выхода на объект." />
        <AdvantagesList />
      </Section>

      <Section id="service-pricing" className={cn("scroll-mt-28", showGallery ? "bg-surface" : undefined)}>
        <div className={cn("grid gap-8 lg:items-stretch lg:gap-10", service.pricingSectionImage ? "lg:grid-cols-[minmax(200px,240px)_minmax(0,1fr)]" : "lg:grid-cols-1")}>
          {service.pricingSectionImage ? (
            <figure className="relative mx-auto aspect-[3/5] w-full max-w-[240px] shrink-0 overflow-hidden rounded-2xl border border-border shadow-soft lg:mx-0 lg:aspect-auto lg:h-full lg:min-h-0 lg:w-[240px] lg:max-w-none">
              <Image
                src={service.pricingSectionImage}
                alt={`Формат объекта и регламент — ориентир по услуге «${service.shortTitle}»`}
                fill
                className="object-cover object-[center_22%]"
                sizes="(max-width: 1024px) 90vw, 240px"
              />
            </figure>
          ) : null}
          <div className="flex min-w-0 flex-col gap-5">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">Стоимость</h2>
              <p className="mt-4 text-lg leading-8 text-muted">Ориентир по услуге и факторы, влияющие на смету.</p>
            </div>
            <ul className="max-w-xl space-y-2.5 text-sm leading-snug text-muted">
              {service.factors.slice(0, 4).map((factor) => (
                <li key={factor} className="flex gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
            {service.factors.length > 4 ? (
              <p className="text-xs text-muted">Подробная расшифровка — в таблице ниже «От чего зависит расчёт».</p>
            ) : null}
            <div className="flex max-w-xl flex-col gap-3 pt-1">
              <ButtonLink href="/prices/">Тарифы и таблица цен</ButtonLink>
              <ButtonLink href="/contacts/#lead-form" variant="secondary">
                Точный расчёт за 24 часа
              </ButtonLink>
            </div>
            <Card className="max-w-xl transition hover:border-accent/40">
              <p className="text-sm font-semibold text-primary">От</p>
              <p className="mt-2 text-3xl font-bold">{service.priceFrom}</p>
              <p className="mt-3 text-sm leading-6 text-muted">Итог фиксируем после осмотра — без скрытых строк.</p>
            </Card>
          </div>
        </div>
      </Section>

      <Section id="service-factors" className={cn("scroll-mt-28", showGallery ? undefined : "bg-surface")}>
        <SectionHeading title="От чего зависит расчет" text="Показываем факторы заранее, чтобы смета была прозрачной для закупок, АХО и финансового блока." />
        <div className="overflow-x-auto rounded-xl border border-border bg-background shadow-soft">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-4 py-3 font-semibold">Фактор</th>
                <th className="px-4 py-3 font-semibold">Влияние на цену</th>
              </tr>
            </thead>
            <tbody>
              {service.factors.map((factor) => (
                <tr key={factor} className="border-b border-border/80 last:border-0">
                  <td className="px-4 py-3 align-top font-medium text-foreground">{factor}</td>
                  <td className="px-4 py-3 align-top text-muted">{hintForServiceFactor(factor)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <WhyUsSplit
        sectionId="service-whyus"
        imageSrc={service.whyUsSplitImage ?? null}
        imageAlt={`${service.title} — регламент уборки`}
        eyebrow="Стандарты работы"
        title="Регламент и документы вместо разрозненного контроля"
        description={`${service.title}: состав работ, приёмка и закрытие замечаний — до выхода на объект всё фиксируем в КП и договоре.`}
        actions={
          <>
            <ButtonLink href="/sla/">Открыть SLA</ButtonLink>
            <a
              href="/contacts/#lead-form"
              className="inline-flex items-center rounded-xl border border-accent/40 bg-accent/8 px-5 py-2.5 text-sm font-semibold text-accent transition hover:border-accent/70 hover:bg-accent/15"
            >
              Запросить расчёт
            </a>
          </>
        }
      />

      <ProcessSection sectionId="service-process" />
      <SlaMiniSection sectionId="service-sla" />
      <Section id="service-cities">
        <SectionHeading title="Работаем в городах" text="Выберите город — откроется страница услуги с локальным телефоном и расчётом." />
        <CityGrid />
      </Section>
      {relevantCases.length > 0 ? (
        <CasesSection
          sectionId="service-cases"
          title={`Кейсы по услуге «${service.title}»`}
          intro="Реальные объекты, площади и график — цифры в карточках, а не абстрактные обещания."
          casesList={relevantCases}
        />
      ) : null}
      {city ? <CityContactsSection city={city} /> : null}
      <ReviewsSection />
      <FaqSection sectionId="service-faq" items={pageFaq} />
      <FinalCta city={leadCity} service={service.title} />
    </>
  );
}
