"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui";
import {
  B2B_PRODUCTIVITY_NORMS,
  B2B_FREQUENCY,
  calcB2bMonthly,
  calcB2cPrice,
  MAINTENANCE_CLEANING,
  DEEP_CLEANING,
  POST_RENOVATION_CLEANING,
} from "@/data/pricing";

type Tab = "b2b" | "b2c";
type B2cType = "maintenance" | "deep" | "postRenovation";

const B2C_TYPES: { value: B2cType; label: string }[] = [
  { value: "maintenance",    label: "Поддерживающая уборка" },
  { value: "deep",           label: "Генеральная уборка" },
  { value: "postRenovation", label: "После ремонта / стройки" },
];

/** Возвращает строку диапазона из таблицы по площади */
function b2cTableRow(type: B2cType, area: number) {
  const table =
    type === "maintenance"   ? MAINTENANCE_CLEANING      :
    type === "deep"          ? DEEP_CLEANING             :
    POST_RENOVATION_CLEANING;

  const last = table[table.length - 1] as (typeof table)[0] & { perM2?: number; priceTo?: number };

  if (area >= 100 && last.perM2) {
    const price = Math.max(last.perM2 * area, 10000);
    return `от ${price.toLocaleString("ru-RU")} руб`;
  }

  let row: (typeof table)[0] & { perM2?: number; priceTo?: number };
  if (area <= 35)       row = table[0] as typeof last;
  else if (area <= 65)  row = (table[1] ?? table[0]) as typeof last;
  else if (area <= 85)  row = (table[2] ?? table[1]) as typeof last;
  else                  row = (table[3] ?? table[2]) as typeof last;

  if (row.priceTo) return `от ${row.price.toLocaleString("ru-RU")} – ${row.priceTo.toLocaleString("ru-RU")} руб`;
  return `от ${row.price.toLocaleString("ru-RU")} руб`;
}

export function PricesOrientCalculator() {
  const [tab, setTab] = useState<Tab>("b2b");

  // B2B state
  const [b2bType, setB2bType] = useState("office");
  const [b2bArea, setB2bArea] = useState(500);
  const [b2bFreq, setB2bFreq] = useState("daily");

  // B2C state
  const [b2cType, setB2cType] = useState<B2cType>("maintenance");
  const [b2cArea, setB2cArea] = useState(50);

  const b2bResult = useMemo(() => {
    if (!b2bArea || b2bArea <= 0) return null;
    const total = calcB2bMonthly({ objectType: b2bType, area: b2bArea, frequency: b2bFreq });
    const norm = B2B_PRODUCTIVITY_NORMS[b2bType]?.norm ?? 1500;
    const staff = Math.ceil(b2bArea / norm);
    return { total, staff };
  }, [b2bType, b2bArea, b2bFreq]);

  const b2cResult = useMemo(() => {
    if (!b2cArea || b2cArea <= 0) return null;
    return b2cTableRow(b2cType, b2cArea);
  }, [b2cType, b2cArea]);

  return (
    <Card className="shadow-none">
      <p className="text-sm font-semibold text-primary">Калькулятор-ориентир</p>
      <p className="mt-1 text-sm text-muted">
        Получите примерную сумму до заявки. Точная стоимость — после осмотра объекта.
      </p>

      {/* Tabs */}
      <div className="mt-5 flex gap-1 rounded-xl border border-border p-1">
        {(["b2b", "b2c"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={[
              "flex-1 rounded-lg py-2 text-sm font-medium transition-colors",
              tab === t
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted hover:text-foreground",
            ].join(" ")}
          >
            {t === "b2b" ? "Юридическим лицам" : "Квартиры / разовые"}
          </button>
        ))}
      </div>

      {tab === "b2b" && (
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <label className="grid gap-2 text-sm font-medium">
            Тип объекта
            <select
              value={b2bType}
              onChange={(e) => setB2bType(e.target.value)}
              className="field"
            >
              {Object.entries(B2B_PRODUCTIVITY_NORMS).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium">
            Площадь, м²
            <input
              type="number"
              min={50}
              step={50}
              value={b2bArea}
              onChange={(e) => setB2bArea(Number(e.target.value))}
              className="field"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium">
            Частота уборки
            <select
              value={b2bFreq}
              onChange={(e) => setB2bFreq(e.target.value)}
              className="field"
            >
              {Object.entries(B2B_FREQUENCY).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </label>
        </div>
      )}

      {tab === "b2c" && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium">
            Тип услуги
            <select
              value={b2cType}
              onChange={(e) => setB2cType(e.target.value as B2cType)}
              className="field"
            >
              {B2C_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium">
            Площадь, м²
            <input
              type="number"
              min={20}
              max={500}
              step={10}
              value={b2cArea}
              onChange={(e) => setB2cArea(Number(e.target.value))}
              className="field"
            />
          </label>
        </div>
      )}

      {/* Result */}
      <div className="mt-6 rounded-xl border border-accent/25 bg-accent/[0.06] px-4 py-4">
        {tab === "b2b" && b2bResult && (
          <>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Ориентир / месяц</p>
            <p className="mt-2 text-2xl font-bold text-foreground">
              от {b2bResult.total.toLocaleString("ru-RU")} руб
            </p>
            <p className="mt-2 text-sm text-muted">
              Расчёт для {b2bArea.toLocaleString("ru-RU")} м², {b2bResult.staff} ед. персонала.
              Итог фиксируем после осмотра и согласования регламента.
            </p>
          </>
        )}
        {tab === "b2b" && !b2bResult && (
          <p className="text-sm text-muted">Укажите площадь больше нуля.</p>
        )}

        {tab === "b2c" && b2cResult && (
          <>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Стоимость услуги</p>
            <p className="mt-2 text-2xl font-bold text-foreground">{b2cResult}</p>
            <p className="mt-2 text-sm text-muted">
              Для {b2cArea} м². Минимальный выезд — 6 000 руб. Точная сумма после согласования.
            </p>
          </>
        )}
        {tab === "b2c" && !b2cResult && (
          <p className="text-sm text-muted">Укажите площадь больше нуля.</p>
        )}
      </div>
    </Card>
  );
}
