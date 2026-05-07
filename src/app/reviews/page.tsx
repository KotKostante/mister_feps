import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FinalCta } from "@/components/sections/common";
import { Card, Section, SectionHeading } from "@/components/ui";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Отзывы клиентов Mister FAPC",
  description: "Отзывы B2B-клиентов Mister FAPC с должностями, задачами и результатами работ.",
  alternates: { canonical: absoluteUrl("/reviews/") }
};

const reviews = [
  ["Руководитель АХО", "Федеральный ритейл", "Нам важно было убрать ручной контроль. После запуска регламента замечания стали закрываться через менеджера, а не через ежедневные звонки."],
  ["Управляющий объектом", "Складской комплекс", "Бригада вышла без остановки складских процессов. Смета была понятной для согласования с финансами."],
  ["Главный инженер", "Производственное предприятие", "Технолог подобрал химию под поверхность и загрязнения. Это помогло избежать риска повреждения покрытия."]
];

export default function ReviewsPage() {
  return (
    <>
      <Section>
        <Breadcrumbs items={[{ label: "Отзывы", href: "/reviews/" }]} />
        <SectionHeading title="Отзывы клиентов" text="На сайте не используем анонимные отзывы без контекста. Каждый отзыв привязан к роли, объекту и результату." />
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map(([role, company, text]) => (
            <Card key={role}>
              <p className="text-sm font-semibold text-primary">{role}</p>
              <p className="mt-1 text-sm text-muted">{company}</p>
              <p className="mt-4 leading-7">{text}</p>
            </Card>
          ))}
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
