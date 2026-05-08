"use client";

import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { useState } from "react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ButtonLink, Container } from "@/components/ui";
import { brand, cities, services } from "@/data/site";
import { cn, phoneHref } from "@/lib/utils";

const nav = [
  { href: "/uslugi/", label: "Услуги" },
  { href: "/goroda/", label: "Города" },
  { href: "/prices/", label: "Цены" },
  { href: "/sla/", label: "SLA" },
  { href: "/cases/", label: "Кейсы" },
  { href: "/contacts/", label: "Контакты" }
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl transition-colors">
      <Container className="flex min-h-[56px] items-center justify-between gap-4">

        {/* Лого */}
        <Link href="/" className="focus-ring rounded-lg shrink-0">
          <Logo />
        </Link>

        {/* Навигация */}
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Правая часть */}
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeSwitcher />
          <a
            href={phoneHref(brand.mainPhone)}
            className="focus-ring inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent/40"
          >
            <Phone className="h-4 w-4 text-accent" />
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
            {nav.map((item) => (
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
