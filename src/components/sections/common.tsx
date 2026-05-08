import { CheckCircle2, FileCheck2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { AnimatedNumber } from "@/components/animated-number";
import { LeadForm } from "@/components/lead-form";
import { Badge, ButtonLink, Card, Section, SectionHeading } from "@/components/ui";
import { advantages, cases, cities, faqs, processSteps, services } from "@/data/site";

export function ServicesGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => {
        const Icon = service.icon;
        return (
          <Link key={service.slug} href={`/uslugi/${service.slug}/`} className="group rounded-xl">
            <Card className="h-full transition group-hover:-translate-y-1 group-hover:border-accent">
              <Icon className="mb-5 h-8 w-8 text-accent" />
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{service.description}</p>
              <p className="mt-4 text-sm font-semibold text-accent">{service.priceFrom}</p>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

export function ProcessSection() {
  return (
    <Section>
      <SectionHeading title="Как запускаем уборку на объекте" text="Показываем процесс до договора: кто выходит, как считается цена, кто принимает работы и как закрываются замечания." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {processSteps.map((step, index) => (
          <Card key={step}>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">{index + 1}</span>
            <p className="mt-4 font-semibold">{step}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function SlaMiniSection() {
  return (
    <Section className="bg-surface">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <Badge>SLA и контроль качества</Badge>
          <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">Вы не контролируете уборщиков вручную</h2>
          <p className="mt-4 text-lg leading-8 text-muted">
            За объектом закрепляются бригадир, менеджер и руководитель. Замечания фиксируются, закрываются и возвращаются в регламент.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/sla/">Открыть SLA</ButtonLink>
            <ButtonLink href="/contacts/#lead-form" variant="secondary">Получить пример регламента</ButtonLink>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Чек-листы", FileCheck2],
            ["Закрепленная команда", ShieldCheck],
            ["Закрытие замечаний", CheckCircle2]
          ].map(([title, Icon]) => {
            const TypedIcon = Icon as typeof FileCheck2;
            return (
              <Card key={title as string}>
                <TypedIcon className="mb-4 h-7 w-7 text-accent" />
                <p className="font-semibold">{title as string}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

export function CasesSection() {
  const metrics = [
    { value: 36000, suffix: " м2" },
    { value: 1350, suffix: " уборок/мес" },
    { value: 15400, suffix: " м2" }
  ];

  return (
    <Section>
      <SectionHeading title="Кейсы с цифрами" text="Переносим в сайт доказательства масштаба: федеральные клиенты, площади, бригады и регулярность работ." />
      <div className="grid gap-4 lg:grid-cols-3">
        {cases.map((item, index) => (
          <Card key={item.company}>
            <p className="text-sm font-semibold text-primary">{item.company}</p>
            <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
            <p className="mt-4 text-3xl font-bold">
              <AnimatedNumber value={metrics[index]?.value ?? 0} suffix={metrics[index]?.suffix ?? ""} />
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">{item.result}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function FaqSection({ items = faqs }: { items?: typeof faqs }) {
  return (
    <Section className="bg-surface">
      <SectionHeading title="Вопросы перед договором" text="Коротко отвечаем на то, что обычно спрашивают АХО, закупки и управляющие объектами." />
      <div className="grid gap-4">
        {items.map((item) => (
          <Card key={item.question} className="shadow-none">
            <h3 className="text-lg font-semibold">{item.question}</h3>
            <p className="mt-2 leading-7 text-muted">{item.answer}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function AdvantagesList() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {advantages.map((item) => (
        <div key={item} className="flex gap-3 rounded-xl border border-border bg-surface p-4">
          <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-success" />
          <p className="text-sm leading-6 text-muted">{item}</p>
        </div>
      ))}
    </div>
  );
}

export function CityGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cities.map((city) => (
        <Link key={city.slug} href={`/goroda/${city.slug}/`} className="group">
          <Card className="h-full transition group-hover:border-accent">
            <h3 className="text-xl font-semibold">{city.name}</h3>
            <p className="mt-2 text-sm text-muted">{city.address}</p>
            <p className="mt-3 text-sm font-semibold text-accent">{city.phone}</p>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export function FinalCta({ city, service }: { city?: string; service?: string }) {
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <Badge>Расчет и бесплатный осмотр</Badge>
          <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">Получите смету, график и чек-лист под ваш объект</h2>
          <p className="mt-4 text-lg leading-8 text-muted">
            Менеджер уточнит задачу, предложит схему уборки и подготовит расчет без скрытых доплат. На объект можно выехать в день обращения.
          </p>
        </div>
        <LeadForm city={city} service={service} />
      </div>
    </Section>
  );
}
