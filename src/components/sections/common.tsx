import { CheckCircle2, ChevronDown, ExternalLink, FileCheck2, Phone, Quote, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/lead-form";
import { Badge, ButtonLink, Card, NumberBadge, NumberedStepCard, Section, SectionHeading } from "@/components/ui";
import type { City } from "@/data/site";
import { advantages, brand, cases, cities, faqs, processSteps, reviewPlatforms, reviews, services } from "@/data/site";
import { cityYandexMapsUrl } from "@/lib/city-map";
import { cn, phoneHref } from "@/lib/utils";

export { ServicesGrid } from "@/components/services-grid";

export function ProcessSection({
  title = "Как запускаем уборку на объекте",
  intro = "Показываем процесс до договора: кто выходит, как считается цена, кто принимает работы и как закрываются замечания.",
  sectionId
}: {
  title?: string;
  intro?: string;
  /** Якорь для оглавления на длинных страницах услуги */
  sectionId?: string;
}) {
  return (
    <Section id={sectionId}>
      <SectionHeading title={title} text={intro} />
      {/* Таймлайн: номера на вертикальной линии — понятный «путь» клиента (паттерн B2B how-it-works) */}
      <div className="mx-auto max-w-3xl">
        {processSteps.map((step, index) => (
          <div key={step.title} data-animate="item" className="flex gap-5 items-stretch">
            <div className="flex w-12 shrink-0 flex-col items-center self-stretch">
              {/* Явный акцентный фон + белые цифры — на светлом без bg-surface не «пропадают» */}
              <NumberBadge className="relative z-10 shadow-md ring-4 ring-background">{index + 1}</NumberBadge>
              {index < processSteps.length - 1 ? (
                <div
                  className="mx-auto mt-3 w-[3px] flex-1 min-h-[3rem] rounded-full bg-accent/65"
                  aria-hidden
                />
              ) : null}
            </div>
            <div className={`min-w-0 flex-1 pt-0.5 ${index < processSteps.length - 1 ? "pb-12" : ""}`}>
              <h3 className="text-lg font-bold leading-snug text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function SlaMiniSection({ sectionId }: { sectionId?: string }) {
  return (
    <Section id={sectionId} className="bg-surface">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div data-animate="heading">
          <Badge>SLA и контроль качества</Badge>
          <h2 className="text-section-title mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Вы не контролируете уборщиков вручную</h2>
          <p className="mt-4 text-lg font-medium leading-8 text-muted">
            За объектом закрепляются бригадир, менеджер и руководитель. Замечания фиксируются, закрываются и возвращаются в регламент.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/sla/">Открыть SLA</ButtonLink>
            <ButtonLink href="/contacts/#lead-form" variant="secondary">Получить пример регламента</ButtonLink>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Чек-листы", FileCheck2],
            ["Закрепленная команда", ShieldCheck],
            ["Закрытие замечаний", CheckCircle2]
          ].map(([title, Icon]) => {
            const TypedIcon = Icon as typeof FileCheck2;
            return (
              <Card key={title as string}>
                <TypedIcon className="mb-4 h-7 w-7 text-accent" />
                <p className="font-semibold">{title as string}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

export function CasesSection({
  title = "Кейсы с цифрами",
  intro = "Федеральные клиенты, реальные площади, постоянные бригады — цифры, а не обещания.",
  moreHref = "/cases/",
  moreLabel = "Все кейсы",
  showMoreButton = true,
  casesList = cases,
  sectionId,
  hideHeading = false
}: {
  title?: string;
  intro?: string;
  moreHref?: string;
  moreLabel?: string;
  showMoreButton?: boolean;
  casesList?: typeof cases;
  sectionId?: string;
  hideHeading?: boolean;
}) {
  // При 4 карточках и колонках «3» получается ряд 3+1 — переключаем на 2×2
  const gridCols =
    casesList.length === 4 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <Section id={sectionId}>
      {!hideHeading ? <SectionHeading title={title} text={intro} /> : null}
      <div className={cn("grid gap-4", gridCols)}>
        {casesList.map((item) => {
          const city = cities.find((c) => c.slug === item.citySlug)?.name ?? "";
          return (
            <Link key={item.slug} href={`/cases/${item.slug}/`} className="group block h-full">
              <Card className="flex h-full flex-col overflow-hidden p-0 transition group-hover:border-accent/40">
                {item.coverImage ? (
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
                    <Image
                      src={encodeURI(item.coverImage)}
                      alt={`${item.company}: ${item.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-300 group-hover:scale-[1.025]"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm font-semibold text-primary">{item.company}</p>
                  <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-4 text-2xl font-bold text-foreground">{item.metric}</p>
                  <p className="mt-1 text-xs text-muted">{city}</p>
                  <p className="mt-3 flex-1 text-sm font-medium leading-6 text-muted">{item.result}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Подробнее о кейсе →
                  </span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
      {showMoreButton && moreHref ? (
        <div className="mt-10 flex justify-center">
          <ButtonLink href={moreHref} variant="secondary">
            {moreLabel}
          </ButtonLink>
        </div>
      ) : null}
    </Section>
  );
}

export function FaqSection({
  items = faqs,
  moreHref,
  moreLabel = "Все вопросы и ответы",
  sectionId
}: {
  items?: typeof faqs;
  moreHref?: string;
  moreLabel?: string;
  sectionId?: string;
}) {
  return (
    <Section id={sectionId} className="bg-surface">
      <SectionHeading title="Вопросы перед договором" text="Коротко отвечаем на то, что обычно спрашивают АХО, закупки и управляющие объектами." />
      <div className="divide-y divide-border rounded-2xl border border-border bg-background shadow-soft">
        {items.map((item) => (
          <details key={item.question} data-animate="item" className="group px-4 open:bg-surface/60 sm:px-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-lg font-semibold text-foreground [&::-webkit-details-marker]:hidden">
              {item.question}
              <ChevronDown className="h-5 w-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180" aria-hidden />
            </summary>
            <p className="border-t border-border/60 pb-5 pt-3 text-base font-medium leading-7 text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
      {moreHref ? (
        <div className="mt-10 flex justify-center">
          <ButtonLink href={moreHref} variant="secondary">
            {moreLabel}
          </ButtonLink>
        </div>
      ) : null}
    </Section>
  );
}

/** Хаб города: зона покрытия и выезд */
export function CityCoverageSection({ city }: { city: City }) {
  return (
    <Section className="bg-surface">
      <SectionHeading
        title={`Покрытие и выезд в ${city.prepositional}`}
        text={`Работаем по городу и при необходимости в области (${city.area}). Районы и пригород согласуем при расчёте — учитываем логистику и время допуска на объект.`}
      />
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Центр и деловые районы", "Выезд в день обращения по согласованию"],
          ["Индустриальные зоны", "Уборка складов и производств без остановки процессов"],
          ["Пригород", "Логистика и состав бригады — в смете заранее"]
        ].map(([t, d]) => (
          <Card key={t} className="shadow-none">
            <p className="font-semibold">{t}</p>
            <p className="mt-2 text-sm text-muted">{d}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/** Хаб города: контакты и карта перед формой */
export function CityContactsSection({ city }: { city: City }) {
  return (
    <Section>
      <SectionHeading title={`Контакты в ${city.prepositional}`} text="Локальный телефон, адрес и быстрые ссылки на отзывы и вопросы в картах." />
      <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
        <Card className="shadow-none">
          <p className="text-sm font-semibold text-primary">Телефон</p>
          <a href={phoneHref(city.phone)} className="mt-2 block text-2xl font-bold">
            {city.phone}
          </a>
          <a href={`mailto:${brand.email}`} className="mt-2 block text-sm font-semibold text-accent">
            {brand.email}
          </a>
          <p className="mt-4 text-sm text-muted">{city.address}</p>
          <p className="mt-1 text-xs text-muted">{city.area}</p>
          <CityMapButtons city={city} className="mt-5" />
        </Card>
        <Card className="shadow-none">
          <p className="text-sm font-semibold text-primary">Отзывы и вопросы</p>
          <h3 className="mt-2 text-2xl font-bold">Откройте карточку Mister FAPC</h3>
          <p className="mt-3 text-sm leading-6 text-muted">
            В Яндекс.Картах и 2ГИС можно посмотреть отзывы, задать вопрос, проверить маршрут и сохранить офис.
          </p>
          <CityMapButtons city={city} className="mt-5" />
        </Card>
      </div>
    </Section>
  );
}

export function CityMapButtons({ city, className }: { city: City; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <a
        href={cityYandexMapsUrl(city)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-accent/35 bg-accent/[0.07] px-4 text-sm font-semibold text-accent transition hover:bg-accent/15"
      >
        <Star className="h-4 w-4" aria-hidden />
        Отзывы и вопросы в Яндекс
        <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden />
      </a>
      {city.twoGisUrl ? (
        <a
          href={city.twoGisUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 text-sm font-semibold transition hover:border-accent/50 hover:text-accent"
        >
          <Star className="h-4 w-4 text-accent" aria-hidden />
          Отзывы в 2ГИС
          <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden />
        </a>
      ) : null}
    </div>
  );
}

/** Комбо: ссылки на другие услуги в том же городе */
export function ComboOtherServices({ citySlug, currentSlug }: { citySlug: string; currentSlug: string }) {
  const others = services.filter((s) => s.slug !== currentSlug);
  const visible = others.slice(0, 16);
  return (
    <Section className="bg-surface">
      <SectionHeading title="Другие услуги в этом городе" text="Отдельный расчёт и регламент под каждый тип объекта." />
      <div className="flex flex-wrap gap-2">
        {visible.map((s) => (
          <Link
            key={s.slug}
            href={`/goroda/${citySlug}/${s.slug}/`}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium transition hover:border-accent"
          >
            {s.shortTitle || s.title}
          </Link>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-muted">
        <Link href={`/goroda/${citySlug}/`} className="font-semibold text-accent">
          Все услуги в городе →
        </Link>
      </p>
    </Section>
  );
}

export function AdvantagesList() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {advantages.map((item, index) => (
        <NumberedStepCard key={item} index={index + 1} title={item} />
      ))}
    </div>
  );
}

export function CityGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cities.map((city) => (
        <div key={city.slug} className="group">
          <Card className="flex h-full flex-col transition group-hover:border-accent">
            <h3 className="text-xl font-bold tracking-tight text-foreground">{city.name}</h3>
            <p className="mt-2 text-sm font-medium text-muted">{city.address}</p>
            <p className="mt-3 text-sm font-semibold text-accent">{city.phone}</p>
            <Link href={`/goroda/${city.slug}/`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
              Подробнее →
            </Link>
          </Card>
        </div>
      ))}
    </div>
  );
}

export function ReviewsSection() {
  const [featured, ...restReviews] = reviews;

  return (
    <Section className="bg-surface">
      <div data-animate="heading" className="mb-10 flex flex-col items-center text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Нам доверяют</p>
        <div className="mt-3 flex items-end gap-3">
          <span className="text-6xl font-bold leading-none">4.9</span>
          <div className="mb-1 flex flex-col items-start gap-1">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-sm font-medium text-muted">средний рейтинг по площадкам</span>
          </div>
        </div>
      </div>

      {featured ? (
        <Card className="mb-6 border-accent/35 bg-accent/[0.06] shadow-none md:p-8">
          <Quote className="h-10 w-10 text-accent/50" aria-hidden />
          <div className="mt-4 flex gap-0.5">
            {Array.from({ length: featured.rating }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-accent text-accent" />
            ))}
          </div>
          <blockquote className="mt-4 text-lg font-medium leading-relaxed text-foreground md:text-xl">
            «{featured.text}»
          </blockquote>
          <footer className="mt-6 border-t border-border/80 pt-6">
            <p className="font-semibold">{featured.name}</p>
            <p className="text-sm font-medium text-muted">{featured.role}</p>
          </footer>
        </Card>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        {restReviews.map((r) => (
          <Card key={r.name}>
            <div className="flex gap-0.5">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="mt-3 text-sm font-medium leading-relaxed text-muted">«{r.text}»</p>
            <div className="mt-4 border-t border-border pt-4">
              <p className="font-semibold">{r.name}</p>
              <p className="text-xs font-medium text-muted">{r.role}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {reviewPlatforms.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold transition hover:border-accent/50 hover:text-accent"
          >
            <Star className="h-4 w-4 fill-accent text-accent" />
            {p.name} — {p.rating}
            <ExternalLink className="h-3.5 w-3.5 opacity-50" />
          </a>
        ))}
      </div>
    </Section>
  );
}

export function FinalCta({ city, service }: { city?: string; service?: string }) {
  const tel = phoneHref(brand.mainPhone);

  return (
    <Section id="lead-block">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-stretch">
        <div className="relative min-h-[320px] overflow-hidden rounded-2xl lg:min-h-0">
          <Image
            src="/foto3.webp"
            alt="Уборка объекта командой Mister FAPC"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <Badge>Расчет и бесплатный осмотр</Badge>
          <h2 className="text-section-title mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Получите смету, график и чек-лист под ваш объект</h2>
          <p className="mt-4 text-lg font-medium leading-8 text-muted">
            Менеджер уточнит задачу, предложит схему уборки и подготовит расчет без скрытых доплат. На объект можно выехать в день обращения.
          </p>

          {/* Полоса «позвонить» + форма — паттерн B2B contact / request quote */}
          <div className="mt-8 space-y-5">
            <div className="flex flex-col gap-4 rounded-xl border border-accent/30 bg-accent/[0.07] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-white">
                  <Phone className="h-6 w-6" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Или свяжитесь напрямую</p>
                  <a href={tel} className="mt-0.5 block text-2xl font-bold tracking-tight text-foreground hover:text-accent">
                    {brand.mainPhone}
                  </a>
                  <p className="mt-1 text-xs text-muted">Ответим по объекту, графику и договору — пн–пт, рабочее время</p>
                </div>
              </div>
              <a
                href={tel}
                className="btn-kinetic focus-ring inline-flex min-h-12 shrink-0 items-center justify-center rounded-lg border border-border bg-surface px-6 text-base font-semibold transition hover:border-accent/50"
              >
                Позвонить
              </a>
            </div>

            <LeadForm city={city} service={service} />
          </div>
        </div>
      </div>
    </Section>
  );
}

export { MarketingHero, HeroRightProduct, HeroRightCityCard, HeroTrustStats } from "./marketing-hero";
export { TrustLogosStrip } from "./trust-logos-strip";
export { WhyUsSplit } from "./why-us-split";
