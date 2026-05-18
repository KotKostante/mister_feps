"use client";

import { useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CasesSection } from "@/components/sections/common";
import { Section, SectionHeading } from "@/components/ui";
import { cases, cities, services } from "@/data/site";

export function CasesIndexClient() {
  const [citySlug, setCitySlug] = useState<string>("all");
  const [serviceSlug, setServiceSlug] = useState<string>("all");

  const filtered = useMemo(() => {
    return cases.filter((c) => {
      if (citySlug !== "all" && c.citySlug !== citySlug) return false;
      if (serviceSlug !== "all" && c.serviceSlug !== serviceSlug) return false;
      return true;
    });
  }, [citySlug, serviceSlug]);

  return (
    <>
      <Section>
        <Breadcrumbs items={[{ label: "Кейсы", href: "/cases/" }]} />
        <SectionHeading title="Кейсы с цифрами" text="Показываем масштаб и управляемость работ: площади, количество клинеров, мобильные бригады и регулярность." />
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
          <label className="grid gap-2 text-sm font-medium">
            Город
            <select value={citySlug} onChange={(e) => setCitySlug(e.target.value)} className="field max-w-xs">
              <option value="all">Все города</option>
              {cities.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Услуга
            <select value={serviceSlug} onChange={(e) => setServiceSlug(e.target.value)} className="field max-w-xs">
              <option value="all">Все услуги</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.shortTitle || s.title}
                </option>
              ))}
            </select>
          </label>
        </div>
      </Section>
      {filtered.length === 0 ? (
        <Section>
          <p className="text-center text-muted">Нет кейсов по выбранным фильтрам — измените город или услугу.</p>
        </Section>
      ) : (
        <CasesSection showMoreButton={false} casesList={filtered} hideHeading />
      )}
    </>
  );
}
