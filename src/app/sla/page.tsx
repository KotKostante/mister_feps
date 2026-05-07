import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqSection, FinalCta } from "@/components/sections/common";
import { Card, Section, SectionHeading } from "@/components/ui";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "SLA и контроль качества клининга",
  description: "SLA в клининге Mister FAPC: чек-листы, приемка, закрытие замечаний, закрепленная команда, аудит уборки, клинтест и документы для юрлиц.",
  alternates: { canonical: absoluteUrl("/sla/") }
};

export default function SlaPage() {
  return (
    <>
      <Section>
        <Breadcrumbs items={[{ label: "SLA", href: "/sla/" }]} />
        <SectionHeading title="SLA и контроль качества" text="SLA переводит уборку из ручного контроля в управляемый процесс: график, критерии приемки, ответственные и порядок закрытия замечаний." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {["Бригадир на объекте", "Менеджер клиента", "Руководитель направления", "Отдел контроля качества"].map((item) => (
            <Card key={item}><h2 className="font-semibold">{item}</h2><p className="mt-3 text-sm leading-6 text-muted">Ответственный уровень фиксируется в регламенте и помогает не терять замечания.</p></Card>
          ))}
        </div>
      </Section>
      <Section className="bg-surface">
        <SectionHeading title="Что можно получить как лид-магнит" text="Перед договором можно запросить пример чек-листа приемки уборки и структуру регламента." />
        <div className="grid gap-4 md:grid-cols-3">
          {["Чек-лист приемки", "Пример графика работ", "Структура КП и сметы"].map((item) => <Card key={item} className="shadow-none"><p className="font-semibold">{item}</p></Card>)}
        </div>
      </Section>
      <Section>
        <SectionHeading title="Документы и закупки" text="Готовим КП, смету, договор, акты, ЭДО при необходимости, а также тендерную документацию. Работаем по 44-ФЗ / 223-ФЗ." />
      </Section>
      <FaqSection />
      <FinalCta service="Пример SLA и регламента" />
    </>
  );
}
