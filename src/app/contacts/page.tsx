import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LeadForm } from "@/components/lead-form";
import { Card, Section, SectionHeading } from "@/components/ui";
import { brand, cities } from "@/data/site";
import { absoluteUrl, phoneHref } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Контакты Mister FAPC",
  description: "Телефоны, адреса городов и форма расчета клининга для юридических лиц Mister FAPC.",
  alternates: { canonical: absoluteUrl("/contacts/") }
};

export default function ContactsPage() {
  return (
    <>
      <Section>
        <Breadcrumbs items={[{ label: "Контакты", href: "/contacts/" }]} />
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading title="Контакты" text="Позвоните в локальный офис или отправьте параметры объекта, чтобы получить расчет, график и чек-лист." />
            <Card>
              <a href={phoneHref(brand.mainPhone)} className="text-2xl font-bold">{brand.mainPhone}</a>
              <a href={`mailto:${brand.email}`} className="mt-3 block text-muted">{brand.email}</a>
              <p className="mt-3 text-sm text-muted">{brand.legalName}</p>
            </Card>
          </div>
          <LeadForm />
        </div>
      </Section>
      <Section className="bg-surface">
        <SectionHeading title="Города и телефоны" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cities.map((city) => (
            <Card key={city.slug} className="shadow-none">
              <h2 className="font-semibold">{city.name}</h2>
              <p className="mt-2 text-sm text-muted">{city.address}</p>
              <a href={phoneHref(city.phone)} className="mt-3 block font-semibold text-primary">{city.phone}</a>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
