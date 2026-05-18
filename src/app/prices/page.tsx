import type { Metadata } from "next";
import { AnimatedNumber } from "@/components/animated-number";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PricesOrientCalculator } from "@/components/prices-orient-calculator";
import { FaqSection, FinalCta } from "@/components/sections/common";
import { ButtonLink, Card, Section, SectionHeading } from "@/components/ui";
import { faqs, services } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Цены на клининг для юридических лиц",
  description: "Цены от на уборку офисов, складов, производств, генеральную уборку и уборку после ремонта. Точная смета после бесплатного осмотра объекта.",
  alternates: { canonical: absoluteUrl("/prices/") }
};

const priceRows = [
  { name: "Разовая уборка офисов и торговых зон", value: 46, suffix: " руб/м2" },
  { name: "Генеральная уборка", value: 82, suffix: " руб/м2" },
  { name: "Ежемесячное обслуживание", value: 18000, suffix: " руб/мес" },
  { name: "Мойка окон и зеркальных поверхностей", value: 56, suffix: " руб/м2" },
  { name: "Клининг санузлов", value: 95, suffix: " руб/м2" },
  { name: "Уборка складских полов и технических зон", value: 45, suffix: " руб/м2" },
  { name: "Обеспыливание потолка промышленным пылесосом", value: 175, suffix: " руб/м2" },
  { name: "Удаление строительной пыли после ремонта", value: 120, suffix: " руб/м2" },
  { name: "Удаление краски, цемента, штукатурки", value: 200, suffix: " руб/м2" }
];

const priceFaq = faqs.filter((f) => f.question.includes("расчет") || f.question.includes("ставки"));

export default function PricesPage() {
  return (
    <>
      <Section>
        <Breadcrumbs items={[{ label: "Цены", href: "/prices/" }]} />
        <SectionHeading
          title="Цены на клининг для юридических лиц"
          text="Ориентиры «от»; точную стоимость фиксируем после осмотра. Ниже — что влияет на смету и что входит в понятную цену по договору."
        />
        <div className="mb-10">
          <PricesOrientCalculator />
        </div>
        <div className="grid gap-4">
          {priceRows.map((row) => (
            <Card key={row.name} className="flex flex-col gap-3 shadow-none sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold">{row.name}</p>
              <p className="text-xl font-bold text-primary">
                <AnimatedNumber value={row.value} prefix="от " suffix={row.suffix} />
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeading title="Что влияет на стоимость" text="Факторы закладываем в смету до подписания договора." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Площадь и тип покрытий",
            "График и частота уборки",
            "Загрязнённость и высотные работы",
            "Требования к отчётности и документам",
            "Срочность и окно доступа",
            "Расходные материалы и химия"
          ].map((t) => (
            <Card key={t} className="shadow-none">
              <p className="font-semibold">{t}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading title="Что входит в цену" text="В типовом договоре фиксируем состав работ, ответственных и порядок приёмки." />
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["Чек-лист и регламент уборки", "Без скрытых зон — всё заранее в документе"],
            ["Закреплённая команда", "Бригадир и менеджер на связи"],
            ["Контроль качества", "Замечания закрываются в срок"],
            ["Акты и ЭДО", "Закрывающие документы для бухгалтерии"]
          ].map(([a, b]) => (
            <Card key={a} className="shadow-none">
              <p className="font-semibold">{a}</p>
              <p className="mt-2 text-sm text-muted">{b}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeading title="Три формата обслуживания" text="Формат выбирается по рискам объекта и требованиям к контролю." />
        <div className="grid gap-4 md:grid-cols-3">
          {["Базовый регламент", "Стандарт с расширенным контролем", "Премиум SLA и приоритетный выезд"].map((item, index) => (
            <Card key={item}>
              <p className="text-sm font-semibold text-primary">Тариф {index + 1}</p>
              <h2 className="mt-3 text-xl font-semibold">{item}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">Включает смету, график, чек-лист, закрепленную команду и закрывающие документы.</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading title="Быстрые ссылки по услугам" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 9).map((service) => (
            <Card key={service.slug}>
              <h2 className="font-semibold">{service.title}</h2>
              <p className="mt-2 text-primary">{service.priceFrom}</p>
            </Card>
          ))}
        </div>
      </Section>

      <FaqSection items={priceFaq.length ? priceFaq : faqs.slice(0, 4)} />

      <Section>
        <SectionHeading title="Получить точный расчёт за 24 часа" text="После осмотра фиксируем цену в КП и договоре." />
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="/contacts/#lead-form">Запросить КП</ButtonLink>
          <ButtonLink href="/sla/" variant="secondary">
            Посмотреть SLA
          </ButtonLink>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
