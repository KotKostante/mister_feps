import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqFullClient } from "@/components/faq-full-client";
import { FinalCta } from "@/components/sections/common";
import { Section, SectionHeading } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { faqsCategorized } from "@/data/site";
import { faqSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "FAQ по клинингу для бизнеса",
  description: "Ответы на вопросы о расчете, договоре, ЭДО, графике, выходе бригад, контроле качества и оплате после приемки.",
  alternates: { canonical: absoluteUrl("/faq/") }
};

export default function FaqPage() {
  const forLd = faqsCategorized.map(({ question, answer }) => ({ question, answer }));
  return (
    <>
      <JsonLd data={faqSchema(forLd)} />
      <Section>
        <Breadcrumbs items={[{ label: "FAQ", href: "/faq/" }]} />
        <SectionHeading title="Частые вопросы" text="Поиск по тексту и категории: договор, услуги, персонал, качество, цены." />
        <FaqFullClient />
      </Section>
      <Section className="bg-surface">
        <SectionHeading title="Не нашли ответ?" text="Напишите параметры объекта — менеджер ответит и подготовит расчёт." />
      </Section>
      <FinalCta />
    </>
  );
}
