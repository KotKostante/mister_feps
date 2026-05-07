import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FinalCta, ServicesGrid } from "@/components/sections/common";
import { Card, Section, SectionHeading } from "@/components/ui";
import { extraServices } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Услуги клининга для бизнеса",
  description: "Все услуги Mister FAPC для юридических лиц: офисы, склады, производства, генеральная уборка, уборка после ремонта и специализированные работы.",
  alternates: { canonical: absoluteUrl("/uslugi/") }
};

export default function ServicesPage() {
  return (
    <>
      <Section>
        <Breadcrumbs items={[{ label: "Услуги", href: "/uslugi/" }]} />
        <SectionHeading title="Услуги клининга для бизнеса" text="Выберите направление, чтобы посмотреть состав работ, цены от, документы и условия запуска." />
        <ServicesGrid />
      </Section>
      <Section className="bg-surface">
        <SectionHeading title="Также оказываем" text="Дополнительные направления вынесены отдельно, чтобы не смешивать регулярный клининг и специальные задачи." />
        <div className="grid gap-4 md:grid-cols-3">
          {extraServices.map((service) => (
            <Link href={`/uslugi/${service.slug}/`} key={service.slug}>
              <Card className="h-full shadow-none transition hover:border-primary">
                <h2 className="text-xl font-semibold">{service.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{service.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
