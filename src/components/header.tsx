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
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[#070a0d]/80 backdrop-blur-md transition-colors">
      <Container className="flex min-h-20 items-center justify-between gap-4">
        <Link href="/" className="focus-ring rounded-lg">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-white/65 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeSwitcher />
          <a className="focus-ring inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-white/80 transition hover:text-white" href={phoneHref(brand.mainPhone)}>
            <Phone className="h-4 w-4 text-primary" />
            {brand.mainPhone}
          </a>
          <ButtonLink href="/contacts/#lead-form">Запросить КП</ButtonLink>
        </div>
        <button className="focus-ring rounded-lg p-2 lg:hidden" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Меню</span>
        </button>
      </Container>
      <div className={cn("border-t border-border bg-background lg:hidden", open ? "block" : "hidden")}>
        <Container className="grid gap-5 py-5">
          <div className="grid gap-3">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-lg py-2 text-base font-semibold" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="grid gap-2 border-t border-border pt-4 text-sm text-muted">
            <p className="font-semibold text-foreground">Популярные услуги</p>
            {services.slice(0, 3).map((service) => (
              <Link key={service.slug} href={`/uslugi/${service.slug}/`} onClick={() => setOpen(false)}>
                {service.title}
              </Link>
            ))}
            <p className="mt-3 font-semibold text-foreground">Города</p>
            {cities.slice(0, 3).map((city) => (
              <Link key={city.slug} href={`/goroda/${city.slug}/`} onClick={() => setOpen(false)}>
                {city.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3">
            <ThemeSwitcher />
            <ButtonLink href="/contacts/#lead-form" onClick={() => setOpen(false)}>
              Рассчитать стоимость
            </ButtonLink>
          </div>
        </Container>
      </div>
    </header>
  );
}
