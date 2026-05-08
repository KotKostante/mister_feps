import type { Metadata } from "next";
import { BadgeCheck } from "lucide-react";
import { AnimatedNumber } from "@/components/animated-number";
import { CleanWindowDemo } from "@/components/clean-window-demo";
import { CasesSection, CityGrid, FaqSection, FinalCta, ProcessSection, ServicesGrid, SlaMiniSection } from "@/components/sections/common";
import { ButtonLink, Card, Section, SectionHeading } from "@/components/ui";
import { risks, segments, trustStats } from "@/data/site";
import { faqSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Клининговая компания для бизнеса — договор, SLA, контроль | Mister FAPC",
  description: "Mister FAPC — профессиональный клининг офисов, складов и производств. Договор, чек-листы, оплата после приёмки. 12 лет работы, 420 сотрудников.",
  alternates: { canonical: absoluteUrl("/") }
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema([
        { question: "Какие услуги оказывает клининговая компания Mister FAPC?", answer: "Регулярная и разовая уборка офисов, складов, производственных помещений, торговых центров. Генеральная уборка и уборка после ремонта. Работаем по договору с юридическими лицами в Екатеринбурге, Перми, Челябинске и других городах." },
        { question: "Работаете только с юридическими лицами?", answer: "Сайт сфокусирован на B2B-задачах: офисы, склады, производства, торговые сети, медицинские центры, ЖК и коммерческие объекты." },
        { question: "Как быстро можно получить расчет?", answer: "Предварительный расчет готовим после уточнения площади, типа объекта и графика. Точную смету фиксируем после бесплатного осмотра." }
      ])} />

      {/* ══════════════════════════════════════════════════════
          HERO — тёмный full-width с фото фоном
      ══════════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden">
        {/* фоновое фото */}
        <div className="absolute inset-x-0 top-0 -z-10 h-[1100px] lg:inset-0 lg:h-auto">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt=""
            className="hero-bg-img h-full w-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070a0d]/96 via-[#070a0d]/82 to-[#070a0d]/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070a0d]/60 via-transparent to-transparent" />
          {/* усиленное затемнение на мобайле для читаемости текста */}
          <div className="absolute inset-0 bg-[#070a0d]/55 lg:hidden" />
          {/* плавный переход снизу на мобайле */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background lg:hidden" />
        </div>

        {/* розовое свечение */}
        <div className="pointer-events-none absolute -left-60 top-1/2 -z-10 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-primary/18 blur-[140px]" aria-hidden="true" />
        {/* голубое свечение */}
        <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-accent/12 blur-[100px]" aria-hidden="true" />

        <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:px-8 lg:py-32">

          {/* левая колонка */}
          <div>
            <div data-hero-animate="eyebrow">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent backdrop-blur-sm">
                Профессиональная клининговая компания для бизнеса
              </span>
            </div>

            <h1
              data-hero-animate="title"
              className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
            >
              Клининг для юридических лиц,{" "}
              <span className="text-primary">
                который не нужно контролировать вручную
              </span>
            </h1>

            <p data-hero-animate="text" className="mt-6 max-w-xl text-lg leading-8 text-white/70">
              Mister FAPC — клининговая компания полного цикла для офисов, складов и производств. Берём на себя уборку, график, команду и отчётность. Договор с оплатой после приёмки.
            </p>

            <div data-hero-animate="cta" className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contacts/#lead-form">Рассчитать стоимость уборки</ButtonLink>
              <a
                href="/contacts/#lead-form"
                className="inline-flex items-center rounded-xl border border-white/20 bg-white/8 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/12"
              >
                Заказать бесплатный осмотр
              </a>
            </div>

            {/* статистика */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {trustStats.map((stat, index) => (
                <div
                  key={stat.value}
                  data-hero-animate="stat"
                  className="rounded-xl border border-white/10 bg-white/6 p-4 backdrop-blur-sm"
                >
                  <p className="text-2xl font-bold text-white">
                    {index === 0 ? <><AnimatedNumber value={12} /> лет</> : null}
                    {index === 1 ? <><AnimatedNumber value={97} suffix="%" /></> : null}
                    {index === 2 ? <AnimatedNumber value={420} /> : null}
                    {index === 3 ? <><AnimatedNumber value={1250000} suffix=" м²" /></> : null}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/50">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* правая колонка — карточка */}
          <div
            data-hero-animate="panel"
            className="rounded-2xl border border-border bg-background/90 p-6 backdrop-blur-xl"
          >
            <div className="rounded-xl bg-accent/15 p-5">
              <BadgeCheck className="h-10 w-10 text-accent" />
              <p className="mt-4 text-xl font-semibold text-foreground">Управляемая чистота вместо ручного контроля</p>
              <p className="mt-2 text-sm leading-7 text-muted">
                Смета, КП, договор, чек-листы, закреплённая команда, отдел контроля качества и документы для юрлиц.
              </p>
            </div>
            <div className="mt-4 grid gap-2">
              {["Бесплатный выезд менеджера", "Клинтест и подбор химии", "Оплата после приёмки", "44-ФЗ / 223-ФЗ для тендеров"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg border border-accent/50 bg-black/8 dark:bg-white/6 px-4 py-3 text-base font-semibold text-accent"
                >
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <CleanWindowDemo />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURE SPLIT — как в Containa: фото + текст
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#070a0d]">
        <div className="mx-auto grid w-full max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
          {/* фото слева */}
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=80"
              alt="Профессиональный клининг производственного помещения"
              className="h-[420px] w-full object-cover lg:h-[520px]"
            />
            <div className="absolute inset-0 bg-accent/15" />
          </div>
          {/* текст справа */}
          <div data-animate-section>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Почему выбирают нас</span>
            <h2 data-animate="card" className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Контроль, прозрачность и результат — от заявки до акта
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/60">
              Не просто уборка — полный цикл управления чистотой объекта. Вы видите кто работает, что сделано и какое качество принято.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { title: "Чек-листы по каждому объекту", desc: "Фиксируем каждую зону — ничего не пропускается" },
                { title: "Закреплённая команда", desc: "Один менеджер, один бригадир, один стандарт" },
                { title: "Оплата после приёмки", desc: "Платите только за принятую работу" },
                { title: "Документы для юрлиц", desc: "Договор, КП, акты, ЭДО, работа с НДС" },
              ].map((item) => (
                <div key={item.title} data-animate="card" className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-white/55">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <ButtonLink href="/sla/">Открыть SLA</ButtonLink>
              <a href="/contacts/#lead-form" className="inline-flex items-center rounded-xl border border-white/20 bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/40">
                Получить пример регламента
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          Остальные секции — светлая тема
      ══════════════════════════════════════════════════════ */}
      <Section>
        <SectionHeading title="Услуги клининговой компании по типам объектов" text="Работаем с B2B-объектами любого масштаба: от офиса 200 м² до производственного комплекса 50 000 м²." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-animate-section>
          {segments.map((segment) => {
            const Icon = segment.icon;
            return (
              <Card key={segment.title} data-animate="card">
                <Icon className="mb-4 h-7 w-7 text-accent" />
                <h3 className="font-semibold">{segment.title}</h3>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeading title="Риски, которые берёт на себя клининговая компания" text="Для руководителя объекта главное — не процесс уборки, а отсутствие операционных сбоев." />
        <div className="grid gap-4 md:grid-cols-3" data-animate-section>
          {risks.map((risk) => (
            <Card key={risk} className="shadow-none" data-animate="card">
              <p className="font-semibold">{risk}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading title="Клининговые услуги для бизнеса" text="Пять направлений: регулярный клининг офисов, складов и производств, генеральные работы и уборка после ремонта." />
        <ServicesGrid />
      </Section>

      <ProcessSection />
      <SlaMiniSection />
      <CasesSection />

      <Section>
        <SectionHeading title="Клининговая компания в 8 городах России" text="Локальные офисы, телефоны и выезд менеджера в день обращения в Екатеринбурге, Перми, Челябинске, Тюмени, Новосибирске и других городах." />
        <CityGrid />
      </Section>

      <FaqSection />
      <FinalCta />
    </>
  );
}
