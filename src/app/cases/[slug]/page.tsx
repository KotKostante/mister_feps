import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FinalCta } from "@/components/sections/common";
import { Badge, ButtonLink, Card, Section, SectionHeading } from "@/components/ui";
import { cases, cities, services } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = cases.find((c) => c.slug === slug);
  if (!item) return {};
  return {
    title: `${item.company}: ${item.title}`,
    description: item.result,
    alternates: { canonical: absoluteUrl(`/cases/${slug}/`) }
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const item = cases.find((c) => c.slug === slug);
  if (!item) notFound();

  const city = cities.find((c) => c.slug === item.citySlug);
  const service = services.find((s) => s.slug === item.serviceSlug);

  return (
    <>
      <Section>
        <Breadcrumbs
          items={[
            { label: "Кейсы", href: "/cases/" },
            { label: item.company, href: `/cases/${item.slug}/` }
          ]}
        />
        <Badge>Кейс</Badge>
        <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
          {item.company}: {item.title}
        </h1>
        <p className="mt-4 flex flex-wrap gap-3 text-sm text-muted">
          {city ? <span>{city.name}</span> : null}
          {service ? (
            <a href={`/uslugi/${service.slug}/`} className="font-medium text-accent">
              {service.title}
            </a>
          ) : null}
          <span className="font-semibold text-foreground">{item.metric}</span>
        </p>
      </Section>

      <Section className="bg-surface">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/foto2.png"
              alt="Иллюстрация: уборка коммерческого объекта"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="grid gap-8">
            <div>
              <h2 className="text-xl font-semibold">Объект и задача</h2>
              <p className="mt-3 leading-8 text-muted">{item.task ?? item.result}</p>
            </div>
            {item.challenge ? (
              <div>
                <h2 className="text-xl font-semibold">Сложности</h2>
                <p className="mt-3 leading-8 text-muted">{item.challenge}</p>
              </div>
            ) : null}
            {item.solution ? (
              <div>
                <h2 className="text-xl font-semibold">Решение</h2>
                <p className="mt-3 leading-8 text-muted">{item.solution}</p>
              </div>
            ) : null}
            <Card className="shadow-none">
              <p className="text-sm font-semibold text-primary">Результат</p>
              <p className="mt-2 text-lg font-semibold">{item.metric}</p>
              <p className="mt-3 leading-7 text-muted">{item.result}</p>
            </Card>
            {item.quote ? (
              <blockquote className="border-l-4 border-accent pl-4 text-lg italic leading-8 text-muted">
                «{item.quote}»
              </blockquote>
            ) : null}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading title="Следующий шаг" />
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contacts/#lead-form">Обсудить ваш объект</ButtonLink>
          {city && service ? (
            <ButtonLink href={`/goroda/${city.slug}/${service.slug}/`} variant="secondary">
              Услуга в {city.prepositional}
            </ButtonLink>
          ) : null}
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
