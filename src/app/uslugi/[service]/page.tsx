import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { AdvantagesList, CasesSection, FaqSection, FinalCta, ProcessSection } from "@/components/sections/common";
import { Badge, Card, Section, SectionHeading } from "@/components/ui";
import { cities, extraServices, faqs, services } from "@/data/site";
import { faqSchema, serviceSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

type Props = { params: Promise<{ service: string }> };

export function generateStaticParams() {
  return [...services.map((service) => ({ service: service.slug })), ...extraServices.map((service) => ({ service: service.slug }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = services.find((item) => item.slug === serviceSlug);
  const extra = extraServices.find((item) => item.slug === serviceSlug);
  const title = service?.title ?? extra?.title;
  const description = service?.description ?? extra?.description;

  if (!title || !description) return {};

  return {
    title: `${title} — цена, расчет и клининг по договору`,
    description,
    alternates: { canonical: absoluteUrl(`/uslugi/${serviceSlug}/`) }
  };
}

export default async function ServicePage({ params }: Props) {
  const { service: serviceSlug } = await params;
  const service = services.find((item) => item.slug === serviceSlug);
  const extra = extraServices.find((item) => item.slug === serviceSlug);
  if (!service && !extra) notFound();

  if (!service && extra) {
    return <ExtraServicePage slug={extra.slug} title={extra.title} description={extra.description} />;
  }

  if (!service) notFound();
  const pageFaq = [
    ...faqs.slice(0, 2),
    {
      question: `Что входит в ${service.genitive}?`,
      answer: `Состав работ фиксируем в чек-листе: ${service.includes.join(", ")}. Точный регламент зависит от объекта, графика и требований к документам.`
    }
  ];

  return (
    <>
      <JsonLd data={serviceSchema(service, `/uslugi/${service.slug}/`)} />
      <JsonLd data={faqSchema(pageFaq)} />
      <Section>
        <Breadcrumbs items={[{ label: "Услуги", href: "/uslugi/" }, { label: service.title, href: `/uslugi/${service.slug}/` }]} />
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <div>
            <Badge>Услуга для юридических лиц</Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">{service.title}</h1>
            <p className="mt-5 text-lg leading-8 text-muted">{service.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {cities.slice(0, 8).map((city) => (
                <a key={city.slug} href={`/goroda/${city.slug}/${service.slug}/`} className="rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium hover:border-primary">
                  {city.name}
                </a>
              ))}
            </div>
          </div>
          <Card>
            <p className="text-sm font-semibold text-primary">Цена</p>
            <p className="mt-3 text-4xl font-bold">{service.priceFrom}</p>
            <p className="mt-3 text-sm leading-6 text-muted">Итоговая стоимость зависит от площади, загрязнений, графика, расходников, документов и срочности.</p>
          </Card>
        </div>
      </Section>
      <Section className="bg-surface">
        <SectionHeading title="Что входит в услугу" text="Состав работ фиксируется до старта и становится частью регламента приемки." />
        <div className="grid gap-4 md:grid-cols-2">
          {service.includes.map((item) => <Card key={item} className="shadow-none"><p className="font-semibold">{item}</p></Card>)}
        </div>
      </Section>
      <Section>
        <SectionHeading title="От чего зависит расчет" text="Показываем факторы заранее, чтобы смета была прозрачной для закупок, АХО и финансового блока." />
        <div className="grid gap-4 md:grid-cols-3">
          {service.factors.map((item) => <Card key={item}><p className="font-semibold">{item}</p></Card>)}
        </div>
      </Section>
      <ProcessSection />
      <Section className="bg-surface">
        <SectionHeading title="Документы и контроль" text="Для юрлиц готовим КП, смету, договор, акты, тендерные документы и при необходимости ЭДО." />
        <AdvantagesList />
      </Section>
      <CasesSection />
      <FaqSection items={pageFaq} />
      <FinalCta service={service.title} />
    </>
  );
}

function ExtraServicePage({ slug, title, description }: { slug: string; title: string; description: string }) {
  const isSanitary = slug === "sanitarnaya-obrabotka";
  const sanitaryTexts = [
    "конфиденциальный выезд в течение 2 часов",
    "нейтрализация биологического загрязнения",
    "восстановление помещения после несчастного случая",
    "документы для страховой компании"
  ];

  return (
    <>
      <JsonLd data={serviceSchema({
        slug,
        title,
        shortTitle: title,
        genitive: title.toLowerCase(),
        description,
        icon: services[0].icon,
        includes: sanitaryTexts,
        priceFrom: "расчет после осмотра",
        factors: ["срочность", "площадь", "тип загрязнения"]
      }, `/uslugi/${slug}/`)} />
      <Section>
        <Breadcrumbs items={[{ label: "Услуги", href: "/uslugi/" }, { label: title, href: `/uslugi/${slug}/` }]} />
        <Badge>{isSanitary ? "Деликатная специализированная услуга" : "Дополнительная услуга"}</Badge>
        <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{description}</p>
      </Section>
      <Section className="bg-surface">
        <SectionHeading title={isSanitary ? "Как работаем" : "Что входит"} text={isSanitary ? "Формулировки, документы и коммуникация сохраняют конфиденциальность для собственника и управляющего объектом." : "Состав работ фиксируем в КП и договоре."} />
        <div className="grid gap-4 md:grid-cols-2">
          {(isSanitary ? sanitaryTexts : ["бригада под график объекта", "замена персонала при невыходе", "договор и акты", "контроль менеджером"]).map((item) => (
            <Card key={item} className="shadow-none"><p className="font-semibold">{item}</p></Card>
          ))}
        </div>
      </Section>
      <FinalCta service={title} />
    </>
  );
}
