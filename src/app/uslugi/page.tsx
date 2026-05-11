import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CityGrid, FinalCta, ServicesGrid, SlaMiniSection } from "@/components/sections/common";
import { Card, Section, SectionHeading } from "@/components/ui";
import { serviceCatalogSections } from "@/data/service-catalog-groups";
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
        <nav aria-label="Группы услуг" className="mb-10 flex flex-wrap gap-2">
          {serviceCatalogSections.map((block) => (
            <a
              key={block.id}
              href={`#${block.id}`}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium transition hover:border-accent hover:text-accent"
            >
              {block.title}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-16">
          {serviceCatalogSections.map((block) => (
            <div key={block.id} id={block.id} className="scroll-mt-28">
              <h2 className="text-2xl font-semibold">{block.title}</h2>
              <p className="mt-2 max-w-3xl text-muted">{block.description}</p>
              <div className="mt-6">
                <ServicesGrid fullList slugs={block.slugs} />
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section className="bg-surface">
        <SectionHeading title="Также оказываем" text="Дополнительные направления вынесены отдельно, чтобы не смешивать регулярный клининг и специальные задачи." />
        <div className="grid gap-4 md:grid-cols-3">
          {extraServices.map((service) => (
            <Link href={`/uslugi/${service.slug}/`} key={service.slug}>
              <Card className="h-full transition hover:border-accent/40">
                <h2 className="text-xl font-semibold">{service.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{service.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
      <SlaMiniSection />
      <Section>
        <SectionHeading title="Работаем в городах" text="Перейдите в город — там локальные контакты и комбо-страницы услуг." />
        <CityGrid />
      </Section>
      <FinalCta />
    </>
  );
}
