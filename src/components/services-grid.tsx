"use client";

import anime from "animejs";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { services } from "@/data/site";

export function ServicesGrid({
  citySlug,
  /** На странице каталога (/uslugi/) — весь список сразу, без кнопки «Показать все» */
  fullList = false,
  /** Ограничить список slug’ами (группа каталога); сворачивание отключается */
  slugs
}: { citySlug?: string; fullList?: boolean; slugs?: string[] } = {}) {
  const [expanded, setExpanded] = useState(false);
  const initialCount = useSyncExternalStore(
    () => () => undefined,
    () => (window.innerWidth < 640 ? 5 : 16),
    () => 16
  );
  const gridRef = useRef<HTMLDivElement>(null);

  /** Карточки, добавленные по кнопке «Показать все», уже после срабатывания IntersectionObserver — докручиваем reveal */
  useEffect(() => {
    if (!expanded) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gridRef.current?.querySelectorAll("[data-animate='item']").forEach((el) => el.classList.add("motion-ready"));
      return;
    }
    const pending = gridRef.current?.querySelectorAll<HTMLElement>("[data-animate='item']:not(.motion-ready)");
    if (!pending?.length) return;
    anime({
      targets: Array.from(pending),
      translateY: [16, 0],
      opacity: [0, 1],
      easing: "cubicBezier(.18,.84,.32,1)",
      duration: 460,
      delay: anime.stagger(65),
      complete: () => {
        pending.forEach((el) => el.classList.add("motion-ready"));
      }
    });
  }, [expanded]);

  const pool =
    slugs && slugs.length > 0 ? services.filter((s) => slugs.includes(s.slug)) : services;

  const visible =
    slugs && slugs.length > 0
      ? pool
      : fullList || expanded
        ? pool
        : pool.slice(0, initialCount);

  const href = (slug: string) =>
    citySlug ? `/goroda/${citySlug}/${slug}/` : `/uslugi/${slug}/`;

  return (
    <div>
      <div ref={gridRef} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((service) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.slug}
              href={href(service.slug)}
              data-animate="item"
              className="group flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent"
            >
              <Icon className="h-5 w-5 shrink-0 text-accent" />
              <span>{service.title}</span>
            </Link>
          );
        })}
      </div>

      {!slugs?.length && !fullList && !expanded ? (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-2.5 text-sm font-semibold transition hover:border-accent hover:text-accent"
          >
            Показать все {pool.length} услуги
            <span className="text-accent">↓</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
