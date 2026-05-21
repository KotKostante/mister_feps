"use client";

import { Calculator, CheckCircle2, Clock3, UsersRound } from "lucide-react";
import { useMemo, useState } from "react";
import type { DemoObjectTypeId } from "@/lib/pricing-demo-lock";

const objectTypes = [
  { id: "office", label: "Офис", rate: 46, teamBase: 2 },
  { id: "warehouse", label: "Склад", rate: 45, teamBase: 3 },
  { id: "production", label: "Производство", rate: 120, teamBase: 4 }
] as const satisfies readonly { id: DemoObjectTypeId; label: string; rate: number; teamBase: number }[];

const schedules = [
  { id: "once", label: "Разово", multiplier: 1, note: "1 выезд" },
  { id: "weekly", label: "2-3 раза/нед", multiplier: 0.72, note: "график по дням" },
  { id: "daily", label: "Ежедневно", multiplier: 0.58, note: "закрепленная смена" }
] as const;

function formatRub(value: number) {
  return Math.round(value).toLocaleString("ru-RU").replace(/\u00a0/g, " ");
}

export function CleanWindowDemo({
  lockObjectType,
  hintText
}: {
  /** Зафиксировать тип объекта и ставку (страница конкретной услуги) */
  lockObjectType?: DemoObjectTypeId;
  /** Подсказка под заголовком вместо стандартной */
  hintText?: string;
} = {}) {
  const [area, setArea] = useState(1200);
  const [objectType, setObjectType] = useState<DemoObjectTypeId>(lockObjectType ?? "office");
  const [schedule, setSchedule] = useState<(typeof schedules)[number]["id"]>("weekly");
  const locked = Boolean(lockObjectType);
  const selectedObjectType = lockObjectType ?? objectType;

  const result = useMemo(() => {
    const type = objectTypes.find((item) => item.id === selectedObjectType) ?? objectTypes[0];
    const plan = schedules.find((item) => item.id === schedule) ?? schedules[1];
    const estimate = area * type.rate * plan.multiplier;
    const team = Math.max(type.teamBase, Math.ceil(area / 850) + type.teamBase - 1);
    const shifts = area > 2500 ? "2 смены" : area > 900 ? "1 смена + контроль" : "1 смена";

    return { type, plan, estimate, team, shifts };
  }, [area, selectedObjectType, schedule]);

  return (
    <div className="info-glint min-w-0 rounded-xl border border-border bg-surface p-4 shadow-soft">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Calculator className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-accent">Быстрый расчет объекта</p>
          <p className="text-xs leading-5 text-muted">
            {hintText ??
              "Поиграйте с площадью и графиком. Точная смета фиксируется после осмотра."}
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-2">
          <div className="flex min-w-0 items-center justify-between gap-3 text-sm">
            <span className="font-semibold">Площадь объекта</span>
            <span className="shrink-0 rounded-lg border border-border bg-background px-2 py-1 font-bold text-foreground">{area} м2</span>
          </div>
          <input
            type="range"
            min="100"
            max="5000"
            step="100"
            value={area}
            onChange={(event) => setArea(Number(event.target.value))}
            className="accent-[#00BCFF]"
          />
        </label>

        {locked ? (
          <p className="rounded-lg border border-accent/30 bg-accent/5 px-3 py-2 text-xs font-medium text-muted">
            Тип объекта:{" "}
            <span className="font-semibold text-foreground">
              {result.type.label}
            </span>
            {" · "}
            ориентир {objectTypes.find((t) => t.id === objectType)?.rate} руб/м²
          </p>
        ) : (
          <div className="grid gap-2">
            <p className="text-sm font-semibold">Тип объекта</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {objectTypes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={[
                    "btn-kinetic min-w-0 rounded-lg border px-2 py-2 text-xs font-semibold",
                    objectType === item.id ? "border-accent bg-accent text-white" : "border-border bg-background text-muted"
                  ].join(" ")}
                  onClick={() => setObjectType(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-2">
          <p className="text-sm font-semibold">График</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {schedules.map((item) => (
              <button
                key={item.id}
                type="button"
                className={[
                  "btn-kinetic min-w-0 rounded-lg border px-2 py-2 text-xs font-semibold",
                  schedule === item.id ? "border-accent bg-accent text-white" : "border-border bg-background text-muted"
                ].join(" ")}
                onClick={() => setSchedule(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">Ориентир</p>
          <p className="mt-2 text-3xl font-bold">от {formatRub(result.estimate)} ₽</p>
          <div className="mt-4 grid gap-2 text-sm text-muted">
            <p className="flex items-center gap-2">
              <UsersRound className="h-4 w-4 text-accent" />
              Команда: {result.team} специалиста
            </p>
            <p className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-accent" />
              Формат: {result.shifts}, {result.plan.note}
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              Чек-лист, менеджер и приемка входят в запуск
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
