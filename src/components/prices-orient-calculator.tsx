"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui";

/** Ориентир по площади — без претензии на смету; точная сумма после осмотра */

type Mode = "razovaya" | "generalnaya" | "abonement";

const RATES: Record<Mode, { label: string; unit: string; perM2: number }> = {
  razovaya: { label: "Разовая уборка офиса / торговых зон", unit: "руб/м²", perM2: 46 },
  generalnaya: { label: "Генеральная уборка", unit: "руб/м²", perM2: 82 },
  abonement: { label: "Ежемесячное обслуживание (фикс)", unit: "руб/мес", perM2: 18000 }
};

export function PricesOrientCalculator() {
  const [area, setArea] = useState(500);
  const [mode, setMode] = useState<Mode>("razovaya");

  const estimate = useMemo(() => {
    const n = Number(area);
    if (!Number.isFinite(n) || n <= 0) return null;
    if (mode === "abonement") {
      return { text: `от ${RATES.abonement.perM2.toLocaleString("ru-RU")} ${RATES.abonement.unit}`, hint: "Базовый абонемент — масштабируем под объект после осмотра." };
    }
    const total = Math.round(n * RATES[mode].perM2);
    return {
      text: `от ${total.toLocaleString("ru-RU")} руб`,
      hint: `Ориентир: ${n.toLocaleString("ru-RU")} м² × ${RATES[mode].perM2} ${RATES[mode].unit}`
    };
  }, [area, mode]);

  return (
    <Card className="shadow-none">
      <p className="text-sm font-semibold text-primary">Калькулятор-ориентир</p>
      <p className="mt-2 text-sm text-muted">Введите площадь и тип работ — получите порядок суммы. Итог фиксируем после осмотра.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Площадь, м²
          <input
            type="number"
            min={50}
            step={50}
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className="field"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Формат
          <select value={mode} onChange={(e) => setMode(e.target.value as Mode)} className="field">
            <option value="razovaya">{RATES.razovaya.label}</option>
            <option value="generalnaya">{RATES.generalnaya.label}</option>
            <option value="abonement">{RATES.abonement.label}</option>
          </select>
        </label>
      </div>
      {estimate ? (
        <div className="mt-6 rounded-xl border border-accent/25 bg-accent/[0.06] px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Ориентир</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{estimate.text}</p>
          <p className="mt-2 text-sm text-muted">{estimate.hint}</p>
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted">Укажите площадь больше нуля.</p>
      )}
    </Card>
  );
}
