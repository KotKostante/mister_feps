"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

const steps = [
  "Какой объект нужно убирать?",
  "В каком городе объект?",
  "Какая площадь?",
  "Что нужно сделать?",
  "Какой график нужен?",
  "Нужны ли договор, акты, НДС или ЭДО?",
  "Контакты для расчета"
];

export function QuizForm() {
  const [step, setStep] = useState(0);

  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-primary">Квиз {step + 1} / {steps.length}</p>
        <div className="h-2 flex-1 rounded-full bg-background">
          <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
      </div>
      <p className="text-xl font-semibold">{steps[step]}</p>
      <input className="mt-5 min-h-12 w-full rounded-lg border border-border bg-background px-3 outline-none focus:border-primary" placeholder="Введите ответ" />
      <div className="mt-5 flex gap-3">
        <Button type="button" variant="secondary" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}>
          Назад
        </Button>
        <Button
          type="button"
          onClick={() => {
            if (step === 0) window.dispatchEvent(new CustomEvent("mister-fapc-event", { detail: { event: "quiz_start" } }));
            if (step === steps.length - 1) window.dispatchEvent(new CustomEvent("mister-fapc-event", { detail: { event: "quiz_complete" } }));
            setStep((value) => Math.min(steps.length - 1, value + 1));
          }}
        >
          {step === steps.length - 1 ? "Завершить" : "Далее"}
        </Button>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted">
        Подготовим расчет и предложим схему уборки под ваш объект: график, команду, чек-лист и стоимость без скрытых доплат.
      </p>
    </div>
  );
}
