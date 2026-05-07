import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CasesSection, FinalCta } from "@/components/sections/common";
import { Section, SectionHeading } from "@/components/ui";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Кейсы клининга Mister FAPC",
  description: "Кейсы Mister FAPC: Zolla, Самокат, Яндекс.Маркет, SinSay, МТС. Площади, бригады, география и регулярность работ.",
  alternates: { canonical: absoluteUrl("/cases/") }
};

export default function CasesPage() {
  return (
    <>
      <Section>
        <Breadcrumbs items={[{ label: "Кейсы", href: "/cases/" }]} />
        <SectionHeading title="Кейсы с цифрами" text="Показываем масштаб и управляемость работ: площади, количество клинеров, мобильные бригады и регулярность." />
      </Section>
      <CasesSection />
      <FinalCta />
    </>
  );
}
