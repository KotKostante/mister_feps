import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqSection, FinalCta } from "@/components/sections/common";
import { ButtonLink, Card, Section, SectionHeading } from "@/components/ui";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "SLA и контроль качества клининга",
  description: "SLA в клининге Mister FAPC: чек-листы, приемка, закрытие замечаний, закрепленная команда, аудит уборки, клинтест и документы для юрлиц.",
  alternates: { canonical: absoluteUrl("/sla/") }
};

const slaRows = [
  { metric: "Время реакции менеджера", norm: "В рабочие часы — до 2 часов", resp: "Менеджер клиента" },
  { metric: "Выезд на осмотр", norm: "В день обращения по согласованию", resp: "Локальный офис" },
  { metric: "Устранение замечаний по приёмке", norm: "В срок по регламенту объекта", resp: "Бригадир + менеджер" },
  { metric: "Замена персонала при невыходе", norm: "Резерв в течение смены", resp: "Кадровый резерв" },
  { metric: "Плановый аудит качества", norm: "По графику или запросу клиента", resp: "Отдел контроля качества" }
];

export default function SlaPage() {
  return (
    <>
      <Section>
        <Breadcrumbs items={[{ label: "SLA", href: "/sla/" }]} />
        <SectionHeading
          title="SLA и гарантии качества"
          text="SLA переводит уборку из ручного контроля в управляемый процесс: график, критерии приемки, ответственные и порядок закрытия замечаний."
        />
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-surface">
              <tr>
                <th className="p-4 font-semibold">Показатель</th>
                <th className="p-4 font-semibold">Норматив</th>
                <th className="p-4 font-semibold">Ответственный</th>
              </tr>
            </thead>
            <tbody>
              {slaRows.map((row) => (
                <tr key={row.metric} className="border-t border-border">
                  <td className="p-4">{row.metric}</td>
                  <td className="p-4 text-muted">{row.norm}</td>
                  <td className="p-4 text-muted">{row.resp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeading title="Что происходит при нарушении SLA" text="Замечания фиксируются в журнале объекта, назначается ответственный и срок устранения. Повторный аудит — по запросу." />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Фиксация", "Фото, чек-лист, время"],
            ["Эскалация", "Менеджер → руководитель направления"],
            ["Компенсация", "По условиям договора и приложения SLA"]
          ].map(([t, d]) => (
            <Card key={t} className="shadow-none">
              <p className="font-semibold">{t}</p>
              <p className="mt-2 text-sm text-muted">{d}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading title="Страхование ответственности" text="Условия страхования и лимиты указываются в договоре; при необходимости приложение к полису предоставляется заказчику." />
        <Card className="shadow-none">
          <p className="leading-8 text-muted">
            Страховка покрывает риски повреждения имущества при соблюдении регламента доступа и инструктажа на объекте. Актуальные реквизиты полиса запрашивайте у менеджера.
          </p>
        </Card>
      </Section>

      <Section className="bg-surface">
        <SectionHeading title="Документы" text="Пакет для юрлица и тендеров." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {["Договор", "Приложение SLA", "Чек-листы приёмки", "Полис / реквизиты"].map((d) => (
            <Card key={d} className="shadow-none">
              <p className="font-semibold">{d}</p>
              <p className="mt-2 text-xs text-muted">Выдаём по запросу перед подписанием</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading title="Как устроен контроль качества" text="Бригадир на смене, менеджер клиента, отдел контроля качества — замкнутый цикл без потери замечаний." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {["Бригадир на объекте", "Менеджер клиента", "Руководитель направления", "Отдел контроля качества"].map((item) => (
            <Card key={item}>
              <h2 className="font-semibold">{item}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">Ответственный уровень фиксируется в регламенте.</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeading title="Что можно получить как лид-магнит" text="Перед договором можно запросить пример чек-листа приемки уборки и структуру регламента." />
        <div className="grid gap-4 md:grid-cols-3">
          {["Чек-лист приемки", "Пример графика работ", "Структура КП и сметы"].map((item) => (
            <Card key={item} className="shadow-none">
              <p className="font-semibold">{item}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading title="Документы и закупки" text="Готовим КП, смету, договор, акты, ЭДО при необходимости, а также тендерную документацию. Работаем по 44-ФЗ / 223-ФЗ." />
      </Section>

      <FaqSection />
      <Section>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="/contacts/#lead-form">Получить договор с SLA</ButtonLink>
          <ButtonLink href="/prices/" variant="secondary">
            Цены и тарифы
          </ButtonLink>
        </div>
      </Section>
      <FinalCta service="Пример SLA и регламента" />
    </>
  );
}
