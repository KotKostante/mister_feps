import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { FinalCta } from "@/components/sections/common";
import { ServiceDetailSections } from "@/components/service-detail/service-detail-sections";
import { ServiceHeroDark } from "@/components/service-detail/service-hero-dark";
import { Badge, ButtonLink, Card, NumberedStepCard, Section, SectionHeading } from "@/components/ui";
import { cases, extraServices, faqs, services } from "@/data/site";
import { faqSchema, serviceSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

type Props = { params: Promise<{ service: string }> };

/** На Vercel edge долго отдавался старый HTML (HIT + большой Age); ISR обновляет страницу после деплоя и не «залипает» на месяцах. */
export const revalidate = 60;

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

  const casesForService = cases.filter((c) => c.serviceSlug === service.slug);
  const casesListForPage = casesForService.length ? casesForService : cases;

  const pageFaq = [
    ...faqs.slice(0, 2),
    ...(service.faqExtra ?? []),
    {
      question: `Что входит в ${service.genitive}?`,
      answer: `Состав работ фиксируем в чек-листе: ${service.includes.join(", ")}. Точный регламент зависит от объекта, графика и требований к документам.`
    }
  ];

  return (
    <>
      <JsonLd data={serviceSchema(service, `/uslugi/${service.slug}/`)} />
      <JsonLd data={faqSchema(pageFaq)} />
      <ServiceHeroDark service={service} />
      <ServiceDetailSections service={service} casesListForPage={casesListForPage} pageFaq={pageFaq} />
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
      <JsonLd
        data={serviceSchema(
          {
            slug,
            title,
            shortTitle: title,
            genitive: title.toLowerCase(),
            description,
            icon: services[0].icon,
            includes: sanitaryTexts,
            priceFrom: "расчет после осмотра",
            factors: ["срочность", "площадь", "тип загрязнения"]
          },
          `/uslugi/${slug}/`
        )}
      />
      <Section>
        <Breadcrumbs items={[{ label: "Услуги", href: "/uslugi/" }, { label: title, href: `/uslugi/${slug}/` }]} />
        <Badge>{isSanitary ? "Деликатная специализированная услуга" : "Дополнительная услуга"}</Badge>
        <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{description}</p>
      </Section>
      <Section className="bg-surface">
        <SectionHeading title={isSanitary ? "Как работаем" : "Что входит"} text={isSanitary ? "Формулировки, документы и коммуникация сохраняют конфиденциальность для собственника и управляющего объектом." : "Состав работ фиксируем в КП и договоре."} />
        <div className="grid gap-4 md:grid-cols-2">
          {(isSanitary ? sanitaryTexts : ["бригада под график объекта", "замена персонала при невыходе", "договор и акты", "контроль менеджером"]).map((item, index) => (
            <NumberedStepCard key={item} index={index + 1} title={item} />
          ))}
        </div>
      </Section>
      <FinalCta service={title} />
    </>
  );
}
