import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { FaqSection, FinalCta } from "@/components/sections/common";
import { Section, SectionHeading } from "@/components/ui";
import { faqs } from "@/data/site";
import { faqSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "FAQ по клинингу для бизнеса",
  description: "Ответы на вопросы о расчете, договоре, ЭДО, графике, выходе бригад, контроле качества и оплате после приемки.",
  alternates: { canonical: absoluteUrl("/faq/") }
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <Section>
        <Breadcrumbs items={[{ label: "FAQ", href: "/faq/" }]} />
        <SectionHeading title="Частые вопросы" text="Ответы для АХО, закупок, управляющих объектами и финансового блока." />
      </Section>
      <FaqSection />
      <FinalCta />
    </>
  );
}
