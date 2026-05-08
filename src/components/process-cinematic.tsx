"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    num: "01", tag: "Звонок",
    title: "Звонок и заявка",
    headline: "Менеджер — не бот и не скрипт",
    desc: "Уточняем объект, площадь и задачу. Сразу предлагаем бесплатный CleanTest.",
  },
  {
    num: "02", tag: "CleanTest",
    title: "Бесплатный выезд",
    headline: "Сначала результат — потом стоимость",
    desc: "Специалист приезжает и чистит реальное загрязнение. Видите результат ДО договора.",
  },
  {
    num: "03", tag: "Цена",
    title: "Стоимость на месте",
    headline: "Смета без скрытых строк",
    desc: "Менеджер показывает КП прямо на объекте. Цена фиксируется сразу.",
  },
  {
    num: "04", tag: "Договор",
    title: "КП и договор",
    headline: "Оплата только после приёмки по акту",
    desc: "Договор, SLA, чек-листы, регламент. Подписываете — платите после сдачи.",
  },
  {
    num: "05", tag: "Команда",
    title: "Подбор бригады",
    headline: "Заменяем состав, пока не устроит",
    desc: "Собираем команду под объект. Не устраивает кто-то — заменяем.",
  },
  {
    num: "06", tag: "Контроль",
    title: "Живой контроль",
    headline: "Клиент управляет, не ждёт отчёт",
    desc: "Показываете пальцем «тут убрать» — уборщики сразу исправляют.",
  },
] as const;

type StepData = (typeof STEPS)[number];

function MobileCard({ step, index }: { step: StepData; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md",
        "transition-all duration-700",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 ring-1 ring-accent/30 text-sm font-bold text-accent">
          {step.num}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">
          {step.tag}
        </span>
      </div>
      <h3 className="text-base font-bold leading-snug text-white">{step.headline}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-white/50">{step.desc}</p>
    </div>
  );
}

export function ProcessCinematic() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrolled = -rect.top;
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));
      setActiveStep(Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#070c18]">
      {/* Заголовок */}
      <div className="mx-auto max-w-[1200px] px-4 pt-20 pb-2 sm:px-6 lg:px-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          Как мы работаем
        </span>
        <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.5rem]">
          От звонка до подписанного акта —<br className="hidden lg:block" /> прозрачно на каждом шаге
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-8 text-white/50">
          Показываем всё: кто выезжает, как проверяем качество, кто принимает работы.
        </p>
      </div>

      {/* ── ДЕСКТОП: sticky scroll ── */}
      <div
        ref={containerRef}
        className="relative hidden lg:block"
        style={{ height: `${STEPS.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="mx-auto grid h-full max-w-[1200px] grid-cols-[1fr_1.2fr] items-center gap-14 px-8 py-12">

            {/* Левая панель */}
            <div className="relative py-4">
              <div className="absolute left-[18px] top-4 bottom-4 w-px bg-white/8" />
              <div
                className="absolute left-[18px] top-4 w-px bg-accent transition-all duration-500"
                style={{ height: `calc(${(activeStep / (STEPS.length - 1)) * 100}% - 1.5rem)` }}
              />
              <div className="space-y-1.5">
                {STEPS.map((step, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={cn(
                      "relative flex w-full items-start gap-4 rounded-2xl p-4 text-left transition-all duration-300",
                      i === activeStep ? "bg-white/8" : "hover:bg-white/5",
                    )}
                  >
                    <div className={cn(
                      "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-all duration-300",
                      i === activeStep
                        ? "border-accent bg-accent text-white"
                        : i < activeStep
                        ? "border-accent/40 bg-accent/15 text-accent/70"
                        : "border-white/12 bg-white/4 text-white/25",
                    )}>
                      {step.num}
                    </div>
                    <div className="min-w-0 flex-1 pt-1">
                      <p className={cn(
                        "text-[10px] font-semibold uppercase tracking-widest transition-colors",
                        i === activeStep ? "text-accent" : "text-white/25",
                      )}>{step.tag}</p>
                      <p className={cn(
                        "mt-0.5 text-sm font-semibold leading-snug transition-colors",
                        i === activeStep ? "text-white" : "text-white/35",
                      )}>{step.title}</p>
                      <div className={cn(
                        "overflow-hidden transition-all duration-300",
                        i === activeStep ? "max-h-20 mt-1.5 opacity-100" : "max-h-0 opacity-0",
                      )}>
                        <p className="text-xs leading-relaxed text-white/40">{step.desc}</p>
                      </div>
                    </div>
                    {i === activeStep && <ArrowRight className="mt-1.5 h-4 w-4 shrink-0 text-accent/50" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Правая панель: большая карточка активного шага */}
            <div className="relative flex h-full items-center py-10">
              <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                {/* фоновое свечение */}
                <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent/6 blur-3xl" aria-hidden="true" />
                <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-primary/5 blur-3xl" aria-hidden="true" />

                {/* контент */}
                <div className="relative z-10">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 ring-1 ring-accent/30 text-xl font-bold text-accent">
                      {STEPS[activeStep].num}
                    </span>
                    <span className="rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
                      {STEPS[activeStep].tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold leading-tight text-white lg:text-3xl">
                    {STEPS[activeStep].headline}
                  </h3>

                  <p className="mt-4 text-base leading-7 text-white/55">
                    {STEPS[activeStep].desc}
                  </p>

                  {/* разделитель */}
                  <div className="my-8 h-px bg-white/8" />

                  {/* мини-прогресс шагов */}
                  <div className="flex items-center gap-2">
                    {STEPS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveStep(i)}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300",
                          i === activeStep ? "w-8 bg-accent" : "w-4 bg-white/15 hover:bg-white/30",
                        )}
                      />
                    ))}
                    <span className="ml-2 text-xs text-white/25">
                      {STEPS[activeStep].num} / {STEPS.length.toString().padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── МОБИЛКА ── */}
      <div className="lg:hidden">
        <div className="mx-auto max-w-[600px] space-y-4 px-4 py-10">
          {STEPS.map((step, i) => (
            <MobileCard key={i} step={step} index={i} />
          ))}
        </div>
      </div>

      <div className="h-16 lg:h-20" />
    </div>
  );
}
