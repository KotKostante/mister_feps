"use client";

import Link from "next/link";
import { useState } from "react";
import { services } from "@/data/site";

const INITIAL_COUNT = 8;

export function ServicesGrid({ citySlug }: { citySlug?: string } = {}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? services : services.slice(0, INITIAL_COUNT);

  const href = (slug: string) =>
    citySlug ? `/goroda/${citySlug}/${slug}/` : `/uslugi/${slug}/`;

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((service) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.slug}
              href={href(service.slug)}
              className="group flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent"
            >
              <Icon className="h-5 w-5 shrink-0 text-accent" />
              <span>{service.title}</span>
            </Link>
          );
        })}
      </div>

      {!expanded && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setExpanded(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-2.5 text-sm font-semibold transition hover:border-accent hover:text-accent"
          >
            Показать все {services.length} услуги
            <span className="text-accent">↓</span>
          </button>
        </div>
      )}
    </div>
  );
}
