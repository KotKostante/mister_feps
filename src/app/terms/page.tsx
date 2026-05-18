import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Section } from "@/components/ui";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Пользовательское соглашение",
  alternates: { canonical: absoluteUrl("/terms/") }
};

export default function TermsPage() {
  return (
    <Section>
      <Breadcrumbs items={[{ label: "Пользовательское соглашение", href: "/terms/" }]} />
      <article className="max-w-3xl">
        <h1 className="text-4xl font-semibold">Пользовательское соглашение</h1>
        <p className="mt-5 leading-8 text-muted">Информация на сайте носит справочный характер. Итоговая стоимость, график и состав работ фиксируются в КП, смете и договоре после осмотра объекта.</p>
      </article>
    </Section>
  );
}
