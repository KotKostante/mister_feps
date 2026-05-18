import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Section } from "@/components/ui";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  alternates: { canonical: absoluteUrl("/privacy/") }
};

export default function PrivacyPage() {
  return (
    <Section>
      <Breadcrumbs items={[{ label: "Политика конфиденциальности", href: "/privacy/" }]} />
      <article className="max-w-3xl">
        <h1 className="text-4xl font-semibold">Политика конфиденциальности</h1>
        <p className="mt-5 leading-8 text-muted">Данные из форм используются для связи, подготовки расчета, КП и документов по заявке. Доступ к данным ограничен сотрудниками, которые обрабатывают обращение.</p>
      </article>
    </Section>
  );
}
