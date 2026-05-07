import type { Metadata } from "next";
import { AnimatedNumber } from "@/components/animated-number";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AdvantagesList, FinalCta } from "@/components/sections/common";
import { Card, Section, SectionHeading } from "@/components/ui";
import { trustStats } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "О компании Mister FAPC",
  description: "Mister FAPC: 12 лет на рынке, 420 сотрудников, 1 250 000 м2 площадей в работе, клининг для бизнеса и документы для юрлиц.",
  alternates: { canonical: absoluteUrl("/about/") }
};

export default function AboutPage() {
  const statNumbers = [
    { value: 12, suffix: " лет" },
    { value: 97, suffix: "%" },
    { value: 420, suffix: "" },
    { value: 1250000, suffix: " м2" }
  ];

  return (
    <>
      <Section>
        <Breadcrumbs items={[{ label: "О компании", href: "/about/" }]} />
        <SectionHeading title="О компании Mister FAPC" text="Мы строим клининг как управляемый сервис для бизнеса: команда, регламент, контроль, документы и ответственность по договору." />
        <div className="grid gap-4 sm:grid-cols-4">
          {trustStats.map((stat, index) => (
            <Card key={stat.value}>
              <p className="text-2xl font-bold text-primary">
                <AnimatedNumber value={statNumbers[index].value} suffix={statNumbers[index].suffix} />
              </p>
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </Card>
          ))}
        </div>
      </Section>
      <Section className="bg-surface">
        <SectionHeading title="Что важно для B2B-клиента" text="Работаем с малым бизнесом и крупными компаниями, готовим документы для закупок и тендеров, учитываем 44-ФЗ / 223-ФЗ." />
        <AdvantagesList />
      </Section>
      <FinalCta />
    </>
  );
}
