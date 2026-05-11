"use client";

import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { useEffect, useRef, useState } from "react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ButtonLink, Container } from "@/components/ui";
import { brand, cities, services } from "@/data/site";
import { cn, phoneHref } from "@/lib/utils";

/** Основные разделы — всегда в строке (до «Ещё») */
const navPrimary = [
  { href: "/uslugi/", label: "Услуги" },
  { href: "/goroda/", label: "Города" },
  { href: "/prices/", label: "Цены" },
  { href: "/sla/", label: "SLA" },
  { href: "/cases/", label: "Кейсы" }
];

/** Второстепенные — в выпадающем «Ещё», чтобы меню не ломалось по ширине */
const navMore = [
  { href: "/reviews/", label: "Отзывы" },
  { href: "/faq/", label: "FAQ" },
  { href: "/blog/", label: "Блог" },
  { href: "/about/", label: "О компании" }
];

const navTrailing = [{ href: "/contacts/", label: "Контакты" }];

/* Мобилка: полный список по порядку */
const navMobile = [
  { href: "/uslugi/", label: "Услуги" },
  { href: "/goroda/", label: "Города" },
  { href: "/prices/", label: "Цены" },
  { href: "/sla/", label: "SLA" },
  { href: "/cases/", label: "Кейсы" },
  ...navMore,
  ...navTrailing
];

const navLinkClass =
  "rounded-lg px-2.5 py-2 text-sm font-medium text-muted transition hover:bg-surface hover:text-foreground whitespace-nowrap";

export function Header() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!moreOpen) return;
    function handlePointerDown(e: MouseEvent) {
      if (moreWrapRef.current && !moreWrapRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [moreOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl transition-colors">
      <Container className="flex min-h-[56px] items-center justify-between gap-3">

        {/* Лого */}
        <Link href="/" className="focus-ring rounded-lg shrink-0">
          <Logo />
        </Link>

        {/* Навигация: основное + «Ещё» */}
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1">
          {navPrimary.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass}>
              {item.label}
            </Link>
          ))}
          <div className="relative shrink-0" ref={moreWrapRef}>
            <button
              type="button"
              className={cn(
                navLinkClass,
                "inline-flex items-center gap-0.5",
                moreOpen && "bg-surface text-foreground"
              )}
              aria-expanded={moreOpen}
              aria-haspopup="true"
              onClick={() => setMoreOpen((v) => !v)}
            >
              Ещё
              <ChevronDown className={cn("h-4 w-4 transition", moreOpen && "rotate-180")} aria-hidden />
            </button>
            {moreOpen ? (
              <div
                className="absolute right-0 top-full z-50 mt-1 min-w-[200px] rounded-xl border border-border bg-background py-1 shadow-lg"
                role="menu"
              >
                {navMore.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    className="block px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-surface"
                    onClick={() => setMoreOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          {navTrailing.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Правая часть */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <ThemeSwitcher />
          <a
            href={phoneHref(brand.mainPhone)}
            className="focus-ring inline-flex max-w-[11rem] items-center gap-2 whitespace-nowrap rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold text-foreground transition hover:border-accent/40 xl:max-w-none xl:px-4"
          >
            <Phone className="h-4 w-4 shrink-0 text-accent" />
            {brand.mainPhone}
          </a>
          <ButtonLink href="/contacts/#lead-form" className="bg-primary text-white shadow-[0_8px_24px_hsl(337_91%_51%/0.25)] hover:bg-primary/90">
            Запросить КП
          </ButtonLink>
        </div>

        {/* Бургер + переключатель темы */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeSwitcher />
          <button
            className="focus-ring rounded-lg p-2 text-muted transition hover:bg-surface hover:text-foreground"
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Меню</span>
          </button>
        </div>
      </Container>

      {/* Мобильное меню */}
      <div className={cn("border-t border-border bg-background lg:hidden", open ? "block" : "hidden")}>
        <Container className="grid gap-5 py-6">
          <div className="grid gap-1">
            {navMobile.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-base font-semibold text-foreground/80 transition hover:bg-surface hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="grid gap-2 border-t border-border pt-5 text-sm text-muted">
            <p className="font-semibold text-foreground">Популярные услуги</p>
            {services.slice(0, 3).map((service) => (
              <Link key={service.slug} href={`/uslugi/${service.slug}/`} className="transition hover:text-foreground" onClick={() => setOpen(false)}>
                {service.title}
              </Link>
            ))}
            <p className="mt-3 font-semibold text-foreground">Города</p>
            {cities.slice(0, 3).map((city) => (
              <Link key={city.slug} href={`/goroda/${city.slug}/`} className="transition hover:text-foreground" onClick={() => setOpen(false)}>
                {city.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
            <a href={phoneHref(brand.mainPhone)} className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Phone className="h-4 w-4 text-accent" />
              {brand.mainPhone}
            </a>
            <ButtonLink href="/contacts/#lead-form" className="bg-primary text-white hover:bg-primary/90" onClick={() => setOpen(false)}>
              Рассчитать стоимость
            </ButtonLink>
          </div>
        </Container>
      </div>
    </header>
  );
}
