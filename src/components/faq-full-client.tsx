"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui";
import { faqsCategorized, type FaqCategoryId } from "@/data/site";

const CATEGORY_LABEL: Record<FaqCategoryId, string> = {
  dogovor: "Договор и оплата",
  uslugi: "Услуги и регламент",
  personal: "Персонал и замены",
  kachestvo: "Качество и контроль",
  tseny: "Цены и смета"
};

export function FaqFullClient() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return faqsCategorized;
    return faqsCategorized.filter(
      (item) =>
        item.question.toLowerCase().includes(needle) || item.answer.toLowerCase().includes(needle)
    );
  }, [q]);

  const byCat = useMemo(() => {
    const map = new Map<FaqCategoryId, typeof faqsCategorized>();
    for (const item of filtered) {
      const arr = map.get(item.category) ?? [];
      arr.push(item);
      map.set(item.category, arr);
    }
    return map;
  }, [filtered]);

  return (
    <>
      <div className="mx-auto max-w-[720px]">
        <label className="grid gap-2 text-sm font-medium">
          Поиск по вопросам
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Например: ЭДО, смета, ночная смена"
            className="field"
          />
        </label>
      </div>

      <nav className="mt-10 flex flex-wrap justify-center gap-2">
        {(Object.keys(CATEGORY_LABEL) as FaqCategoryId[]).map((id) => (
          <a
            key={id}
            href={`#faq-${id}`}
            className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-muted transition hover:border-accent/40 hover:text-foreground"
          >
            {CATEGORY_LABEL[id]}
          </a>
        ))}
      </nav>

      <div className="mt-14 grid gap-16">
        {(Object.keys(CATEGORY_LABEL) as FaqCategoryId[]).map((cat) => {
          const items = byCat.get(cat);
          if (!items?.length) return null;
          return (
            <section key={cat} id={`faq-${cat}`} className="scroll-mt-28">
              <h2 className="text-2xl font-semibold">{CATEGORY_LABEL[cat]}</h2>
              <div className="mt-6 grid gap-4">
                {items.map((item) => (
                  <Card key={item.question} className="shadow-none">
                    <h3 className="text-lg font-semibold">{item.question}</h3>
                    <p className="mt-2 leading-7 text-muted">{item.answer}</p>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-muted">Ничего не найдено — смените запрос или напишите нам.</p>
      ) : null}
    </>
  );
}
