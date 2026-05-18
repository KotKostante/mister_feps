import type { ReactNode } from "react";
import { BadgeCheck, ExternalLink, Star } from "lucide-react";
import { AnimatedNumber } from "@/components/animated-number";
import { CleanWindowDemo } from "@/components/clean-window-demo";
import { ButtonLink } from "@/components/ui";
import type { City } from "@/data/site";
import { heroProductBullets, MARKETING_HERO_BG } from "@/data/marketing";
import { trustStats } from "@/data/site";
import { cityYandexMapsUrl } from "@/lib/city-map";
import { phoneHref } from "@/lib/utils";

/** Общая подложка героя: фон, градиенты, сетка 2 колонки */
export function MarketingHero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  showStats = true,
  right
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
  showStats?: boolean;
  right: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[1100px] lg:inset-0 lg:h-auto">
        <img
          src={encodeURI(MARKETING_HERO_BG)}
          alt=""
          className="hero-bg-img h-full w-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070a0d]/96 via-[#070a0d]/82 to-[#070a0d]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070a0d]/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[#070a0d]/55 lg:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background lg:hidden" />
        {/* Доп. затемнение слева — подпись на светлых участках фото читается без «слипания» с полками/стенами */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_110%_95%_at_16%_38%,rgba(0,0,0,0.48)_0%,transparent_58%)]"
          aria-hidden
        />
      </div>
      <div className="pointer-events-none absolute -left-60 top-1/2 -z-10 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-primary/18 blur-[140px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-accent/12 blur-[100px]" aria-hidden="true" />

      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:px-8 lg:py-32">
        <div>
          <div data-hero-animate="eyebrow">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent shadow-[0_2px_20px_rgba(0,0,0,0.4)] backdrop-blur-sm">
              {eyebrow}
            </span>
          </div>
          <h1
            data-hero-animate="title"
            className="text-hero-readable mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
          >
            {title}
          </h1>
          <p data-hero-animate="text" className="text-hero-readable-soft mt-6 max-w-xl text-lg leading-8 text-white/85">
            {subtitle}
          </p>
          <div data-hero-animate="cta" className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
            <a
              href={secondaryCta.href}
              className="text-hero-readable inline-flex items-center rounded-xl border border-primary bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_hsl(var(--primary)/0.35)] transition hover:bg-primary/90"
            >
              {secondaryCta.label}
            </a>
          </div>
          {showStats ? <HeroTrustStats /> : null}
        </div>
        <div data-hero-animate="panel">{right}</div>
      </div>
    </section>
  );
}

/** Цифры под текстом героя — один раз описаны */
export function HeroTrustStats() {
  return (
    <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {trustStats.map((stat, index) => (
        <div
          key={stat.value}
          data-hero-animate="stat"
          className="rounded-xl border border-white/10 bg-white/6 p-4 backdrop-blur-sm"
        >
          <p className="text-hero-readable text-2xl font-bold text-white">
            {index === 0 ? (
              <>
                <AnimatedNumber value={12} /> лет
              </>
            ) : null}
            {index === 1 ? <AnimatedNumber value={97} suffix="%" /> : null}
            {index === 2 ? <AnimatedNumber value={420} /> : null}
            {index === 3 ? (
              <>
                <AnimatedNumber value={1250000} suffix=" м²" />
              </>
            ) : null}
          </p>
          <p className="text-hero-readable-soft mt-1 text-xs leading-5 text-white/65">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

/** Правая колонка героя — как на главной: УТП + буллеты + демо */
export function HeroRightProduct() {
  return (
    <div className="rounded-2xl border border-border bg-background/90 p-6 backdrop-blur-xl">
      <div className="rounded-xl bg-accent/15 p-5">
        <BadgeCheck className="h-10 w-10 text-accent" />
        <p className="mt-4 text-xl font-semibold text-foreground">Управляемая чистота вместо ручного контроля</p>
        <p className="mt-2 text-sm leading-7 text-muted">
          Смета, КП, договор, чек-листы, закреплённая команда, отдел контроля качества и документы для юрлиц.
        </p>
      </div>
      <div className="mt-4 grid gap-2">
        {heroProductBullets.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-lg border border-accent/50 bg-black/8 px-4 py-3 text-base font-semibold text-accent dark:bg-white/6"
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
  );
}

/** Правая колонка героя — контакты города + опционально ориентир цены + буллеты + демо */
export function HeroRightCityCard({ city, priceHint }: { city: City; priceHint?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background/90 p-6 backdrop-blur-xl">
      <div className="rounded-xl bg-accent/15 p-5">
        <BadgeCheck className="h-10 w-10 text-accent" />
        <p className="mt-4 text-xl font-semibold text-foreground">Офис в {city.prepositional}</p>
        {priceHint ? (
          <p className="mt-2 text-lg font-semibold text-primary">{priceHint}</p>
        ) : null}
        <a href={phoneHref(city.phone)} className="mt-3 block text-2xl font-bold text-foreground">
          {city.phone}
        </a>
        <p className="mt-2 text-sm text-muted">{city.address}</p>
        <p className="mt-1 text-xs text-muted">{city.area}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={cityYandexMapsUrl(city)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-accent/35 bg-accent/[0.07] px-3 text-sm font-semibold text-accent transition hover:bg-accent/15"
          >
            <Star className="h-4 w-4" aria-hidden />
            Яндекс
            <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden />
          </a>
          {city.twoGisUrl ? (
            <a
              href={city.twoGisUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-semibold transition hover:border-accent/50 hover:text-accent"
            >
              <Star className="h-4 w-4 text-accent" aria-hidden />
              2ГИС
              <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden />
            </a>
          ) : null}
        </div>
      </div>
      <div className="mt-4 grid gap-2">
        {heroProductBullets.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-lg border border-accent/50 bg-black/8 px-4 py-3 text-base font-semibold text-accent dark:bg-white/6"
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
  );
}
