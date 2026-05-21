import type { Metadata } from "next";
import {
  CasesSection,
  CityGrid,
  FaqSection,
  FinalCta,
  HeroRightProduct,
  MarketingHero,
  ProcessSection,
  ReviewsSection,
  ServicesGrid,
  SlaMiniSection,
  TrustLogosStrip,
  WhyUsSplit
} from "@/components/sections/common";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { brand } from "@/data/site";
import { faqSchema } from "@/lib/seo";
import { absoluteUrl, phoneHref } from "@/lib/utils";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Клининговая компания для бизнеса — договор, SLA, контроль | Mister FAPC",
  description: "Mister FAPC — профессиональный клининг офисов, складов и производств. Договор, чек-листы, оплата после приёмки. 15 лет работы с 2012 года, 420 сотрудников.",
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

      <MarketingHero
        eyebrow="Профессиональная клининговая компания для бизнеса"
        title={
          <>
            Клининг для юридических лиц,{" "}
            <span className="text-primary">который не нужно контролировать вручную</span>
          </>
        }
        subtitle="Mister FAPC — клининговая компания полного цикла для офисов, складов и производств. Берём на себя уборку, график, команду и отчётность. Договор с оплатой после приёмки."
        primaryCta={{ href: "/contacts/#lead-form", label: "Рассчитать стоимость уборки" }}
        secondaryCta={{ href: phoneHref(brand.mainPhone), label: "Позвонить" }}
        showStats
        right={<HeroRightProduct />}
      />

      <TrustLogosStrip />

      <Section>
        <SectionHeading title="Клининговые услуги для бизнеса" text="Каталог по направлениям: офисы, склады, производства, торговые объекты, медицина, ЖК и специализированные задачи." />
        <ServicesGrid />
        <div data-animate="item" className="mt-8 flex flex-wrap gap-3 border-t border-border pt-8">
          <a
            href="/prices/"
            className="inline-flex items-center rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold transition hover:border-accent hover:text-accent"
          >
            Таблица цен →
          </a>
          <a
            href="/contacts/#lead-form"
            className="inline-flex items-center rounded-xl border border-accent/35 bg-accent/[0.07] px-4 py-2.5 text-sm font-semibold text-accent transition hover:bg-accent/15"
          >
            КП за 24 ч
          </a>
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeading title="Клининговая компания в 8 городах России" text="Локальные офисы, телефоны и выезд менеджера в день обращения." />
        <CityGrid />
      </Section>

      <WhyUsSplit
        imageAlt="Профессиональный клининг производственного помещения"
        eyebrow="Почему выбирают нас"
        title="Контроль, прозрачность и результат — от заявки до акта"
        description="Не просто уборка — полный цикл управления чистотой объекта."
        actions={
          <>
            <ButtonLink href="/sla/">Открыть SLA</ButtonLink>
            <a
              href="/contacts/#lead-form"
              className="inline-flex items-center rounded-xl border border-accent/40 bg-accent/8 px-5 py-2.5 text-sm font-semibold text-accent transition hover:border-accent/70 hover:bg-accent/15"
            >
              Получить пример регламента
            </a>
          </>
        }
      />

      <ProcessSection />
      <SlaMiniSection />
      <CasesSection />
      <ReviewsSection />

      <FaqSection moreHref="/faq/" />
      <FinalCta />
    </>
  );
}
