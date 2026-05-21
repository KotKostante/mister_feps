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
        <h1 className="mt-5 max-w-full break-words text-3xl font-semibold leading-tight min-[420px]:text-4xl sm:text-5xl">
          {item.company}: {item.title}
        </h1>
        <p className="mt-4 flex max-w-full flex-wrap gap-x-3 gap-y-2 break-words text-sm text-muted">
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
              src={encodeURI(item.coverImage ?? "/foto2.webp")}
              alt={`${item.company}: ${item.title}`}
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
            {item.facts?.length ? (
              <div>
                <h2 className="text-xl font-semibold">Параметры объекта</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {item.facts.map((fact) => (
                    <Card key={fact} className="shadow-none">
                      <p className="text-sm font-semibold leading-6">{fact}</p>
                    </Card>
                  ))}
                </div>
              </div>
            ) : null}
            {item.reporting ? (
              <div>
                <h2 className="text-xl font-semibold">Отчётность</h2>
                <p className="mt-3 leading-8 text-muted">{item.reporting}</p>
              </div>
            ) : null}
            {item.quote ? (
              <blockquote className="border-l-4 border-accent pl-4 text-lg italic leading-8 text-muted">
                «{item.quote}»
              </blockquote>
            ) : null}
          </div>
        </div>
      </Section>

      {item.photos?.length ? (
        <Section>
          <SectionHeading title="Фото с объекта" text="Зоны работ, которые фиксируются в регламенте и фотоотчёте." />
          <div className="grid gap-3 md:grid-cols-3 lg:gap-4">
            {item.photos.map((photo, index) => (
              <figure
                key={`${photo.src}-${index}`}
                className="overflow-hidden rounded-lg border border-border bg-surface shadow-soft"
              >
                <Image
                  src={encodeURI(photo.src)}
                  alt={photo.alt}
                  width={900}
                  height={675}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="aspect-[16/10] h-auto w-full object-cover"
                />
              </figure>
            ))}
          </div>
        </Section>
      ) : null}

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
