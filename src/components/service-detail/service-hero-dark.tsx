import { Breadcrumbs } from "@/components/breadcrumbs";
import { CleanWindowDemo } from "@/components/clean-window-demo";
import { Badge, ButtonLink, Container, Section } from "@/components/ui";
import type { City, Service } from "@/data/site";
import { brand, cities } from "@/data/site";
import { demoLockForServiceSlug } from "@/lib/pricing-demo-lock";
import { cn, phoneHref } from "@/lib/utils";

/** Герой страницы услуги с heroCover и калькулятором — как `/uslugi/uborka-ofisov/`, с опциональным городом для комбо-URL. */
export function ServiceHeroDark({ service, city }: { service: Service; city?: City }) {
  const demoLock = demoLockForServiceSlug(service.slug);
  const calculatorHint = demoLock
    ? `Ориентир для услуги «${service.shortTitle}». Меняйте площадь и график — точная смета после осмотра.`
    : `Услуга «${service.shortTitle}». Выберите тип объекта и график — ориентир по тем же правилам, что на главной.`;

  const hasHeroCover = Boolean(service.heroCover);
  const secondaryPhone = city ? phoneHref(city.phone) : phoneHref(brand.mainPhone);

  const cityChipClass = (slug: string) =>
    cn(
      "rounded-lg border px-3 py-2 text-center text-sm font-medium transition",
      hasHeroCover
        ? cn(
            "text-hero-readable-soft border-white/20 bg-white/12 text-white shadow-sm backdrop-blur-sm hover:border-accent hover:text-white",
            city && slug === city.slug && "border-accent ring-1 ring-accent/60"
          )
        : cn(
            "border-border hover:border-primary bg-surface",
            city && slug === city.slug && "border-accent ring-1 ring-accent/40"
          )
    );

  const chipHref = (slug: string) => `/goroda/${slug}/${service.slug}/`;

  const serviceHeroInner = (
    <>
      <Breadcrumbs
        variant={hasHeroCover ? "onHeroDark" : "default"}
        items={
          city
            ? [
                { label: "Города", href: "/goroda/" },
                { label: city.name, href: `/goroda/${city.slug}/` },
                { label: service.title, href: `/goroda/${city.slug}/${service.slug}/` }
              ]
            : [
                { label: "Услуги", href: "/uslugi/" },
                { label: service.title, href: `/uslugi/${service.slug}/` }
              ]
        }
      />
      <div className={cn("grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-start lg:gap-10", hasHeroCover && "mt-6")}>
        <div>
          {hasHeroCover ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent shadow-[0_2px_20px_rgba(0,0,0,0.4)] backdrop-blur-sm">
              Услуга для юридических лиц
            </span>
          ) : (
            <Badge>Услуга для юридических лиц</Badge>
          )}
          <h1
            className={cn(
              "mt-5 text-4xl leading-tight sm:text-5xl",
              hasHeroCover ? "text-hero-readable font-bold tracking-tight text-white lg:text-[3.25rem]" : "font-semibold"
            )}
          >
            {city ? (
              <>
                {service.title} в {city.prepositional}
              </>
            ) : (
              service.title
            )}
          </h1>
          <p
            className={cn(
              "mt-5 text-lg leading-8",
              hasHeroCover
                ? "text-hero-readable-soft max-w-xl text-white/85"
                : "text-muted"
            )}
          >
            {city ? (
              <>
                {service.description} В {city.prepositional} учитываем локальную логистику и график доступа на объект.
              </>
            ) : (
              service.description
            )}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/contacts/#lead-form">Рассчитать стоимость</ButtonLink>
            {hasHeroCover ? (
              <a
                href={secondaryPhone}
                className="text-hero-readable-soft inline-flex items-center rounded-xl border border-white/20 bg-white/8 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/12"
              >
                Позвонить в офис
              </a>
            ) : (
              <ButtonLink href={secondaryPhone} variant="secondary">
                Позвонить в офис
              </ButtonLink>
            )}
          </div>
          <p
            className={cn(
              "mt-8 text-sm font-semibold",
              hasHeroCover ? "text-hero-readable-soft text-white" : "text-foreground"
            )}
          >
            Расчёт в вашем городе
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {cities.slice(0, 8).map((c) => (
              <a key={c.slug} href={chipHref(c.slug)} className={cityChipClass(c.slug)}>
                {c.name}
              </a>
            ))}
          </div>
        </div>
        <div
          className={cn(
            "flex flex-col gap-4",
            hasHeroCover && "rounded-2xl border border-border bg-background/90 p-6 shadow-xl backdrop-blur-xl"
          )}
        >
          <div>
            <p className="text-sm font-semibold text-primary">Цена · ориентир с сайта</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{service.priceFrom}</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Итог зависит от площади, загрязнений, графика, расходников, документов и срочности. Ниже — тот же калькулятор, что на главной.
            </p>
          </div>
          <CleanWindowDemo key={`${service.slug}-${city?.slug ?? "all"}`} lockObjectType={demoLock} hintText={calculatorHint} />
          <ButtonLink className="w-full justify-center" href="/contacts/#lead-form">
            Точный расчёт за 24 часа
          </ButtonLink>
        </div>
      </div>
    </>
  );

  if (!service.heroCover) {
    return <Section>{serviceHeroInner}</Section>;
  }

  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-32" data-animate-section>
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1100px] lg:inset-0 lg:h-auto">
        {/* eslint-disable-next-line @next/next/no-img-element -- фон первого экрана */}
        <img
          src={encodeURI(service.heroCover)}
          alt=""
          className="hero-bg-img h-full w-full object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070a0d]/96 via-[#070a0d]/82 to-[#070a0d]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070a0d]/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[#070a0d]/55 lg:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background lg:hidden" />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_110%_95%_at_16%_38%,rgba(0,0,0,0.48)_0%,transparent_58%)]"
          aria-hidden
        />
      </div>
      <div
        className="pointer-events-none absolute -left-60 top-1/2 -z-10 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-primary/18 blur-[140px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-accent/12 blur-[100px]"
        aria-hidden
      />
      <Container>{serviceHeroInner}</Container>
    </section>
  );
}
