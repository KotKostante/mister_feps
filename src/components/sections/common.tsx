import { CheckCircle2, ExternalLink, FileCheck2, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedNumber } from "@/components/animated-number";
import { LeadForm } from "@/components/lead-form";
import { Badge, ButtonLink, Card, Section, SectionHeading } from "@/components/ui";
import { advantages, cases, cities, faqs, processSteps, reviewPlatforms, reviews, services } from "@/data/site";

export { ServicesGrid } from "@/components/services-grid";

export function ProcessSection() {
  return (
    <Section>
      <SectionHeading title="Как запускаем уборку на объекте" text="Показываем процесс до договора: кто выходит, как считается цена, кто принимает работы и как закрываются замечания." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {processSteps.map((step, index) => (
          <Card key={step.title}>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">{index + 1}</span>
            <p className="mt-4 font-semibold">{step.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
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
      <SectionHeading title="Кейсы с цифрами" text="Федеральные клиенты, реальные площади, постоянные бригады — цифры, а не обещания." />
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
          <Card className="flex h-full flex-col transition group-hover:border-accent">
            <h3 className="text-xl font-semibold">{city.name}</h3>
            <p className="mt-2 text-sm text-muted">{city.address}</p>
            <p className="mt-3 text-sm font-semibold text-accent">{city.phone}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
              Подробнее →
            </span>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <Section className="bg-surface">
      <div className="mb-10 flex flex-col items-center text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Нам доверяют</p>
        <div className="mt-3 flex items-end gap-3">
          <span className="text-6xl font-bold leading-none">4.9</span>
          <div className="mb-1 flex flex-col items-start gap-1">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-sm text-muted">средний рейтинг по площадкам</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {reviews.map((r) => (
          <Card key={r.name}>
            <div className="flex gap-0.5">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">«{r.text}»</p>
            <div className="mt-4 border-t border-border pt-4">
              <p className="font-semibold">{r.name}</p>
              <p className="text-xs text-muted">{r.role}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {reviewPlatforms.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold transition hover:border-accent/50 hover:text-accent"
          >
            <Star className="h-4 w-4 fill-accent text-accent" />
            {p.name} — {p.rating}
            <ExternalLink className="h-3.5 w-3.5 opacity-50" />
          </a>
        ))}
      </div>
    </Section>
  );
}

export function FinalCta({ city, service }: { city?: string; service?: string }) {
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-stretch">
        <div className="relative min-h-[320px] overflow-hidden rounded-2xl lg:min-h-0">
          <Image
            src="/foto3.png"
            alt="Уборка объекта командой Mister FAPC"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <Badge>Расчет и бесплатный осмотр</Badge>
          <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">Получите смету, график и чек-лист под ваш объект</h2>
          <p className="mt-4 text-lg leading-8 text-muted">
            Менеджер уточнит задачу, предложит схему уборки и подготовит расчет без скрытых доплат. На объект можно выехать в день обращения.
          </p>
          <LeadForm city={city} service={service} />
        </div>
      </div>
    </Section>
  );
}
