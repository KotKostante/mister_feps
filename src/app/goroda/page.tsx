import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CityGrid, FinalCta } from "@/components/sections/common";
import { Section, SectionHeading } from "@/components/ui";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Города присутствия Mister FAPC",
  description: "Клининг для бизнеса в Екатеринбурге, Перми, Челябинске, Тюмени, Новосибирске, Нижнем Тагиле, Липецке и Иркутске.",
  alternates: { canonical: absoluteUrl("/goroda/") }
};

export default function CitiesPage() {
  return (
    <>
      <Section>
        <Breadcrumbs items={[{ label: "Города", href: "/goroda/" }]} />
        <SectionHeading title="Города присутствия" text="Для каждого города указаны локальный телефон, адрес и страницы услуг для регионального SEO." />
        <CityGrid />
      </Section>
      <FinalCta />
    </>
  );
}
