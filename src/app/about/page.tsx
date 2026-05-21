import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedNumber } from "@/components/animated-number";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AdvantagesList, FinalCta } from "@/components/sections/common";
import { Card, Section, SectionHeading } from "@/components/ui";
import { brand, cities, trustStats } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "О компании Mister FAPC",
  description: "Mister FAPC: 15 лет на рынке с 2012 года, 420 сотрудников, 1 250 000 м2 площадей в работе, клининг для бизнеса и документы для юрлиц.",
  alternates: { canonical: absoluteUrl("/about/") }
};

export default function AboutPage() {
  const statNumbers = [
    { value: 15, suffix: " лет" },
    { value: 97, suffix: "%" },
    { value: 420, suffix: "" },
    { value: 1250000, suffix: " м2" }
  ];

  return (
    <>
      <Section>
        <Breadcrumbs items={[{ label: "О компании", href: "/about/" }]} />
        <SectionHeading
          title="О компании Mister FAPC"
          text="Мы строим клининг как управляемый сервис для бизнеса: команда, регламент, контроль, документы и ответственность по договору."
        />
        <div className="grid gap-4 sm:grid-cols-4">
          {trustStats.map((stat, index) => (
            <Card key={stat.value}>
              <p className="text-2xl font-bold text-primary">
                <AnimatedNumber value={statNumbers[index].value} suffix={statNumbers[index].suffix} />
              </p>
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeading title="История и рост" text="От точечных объектов к федеральным контрактам — сохраняем стандарты на каждой площадке." />
        <div className="grid gap-6 border-l-2 border-accent/30 pl-6">
          {[
            ["2012–2018", "Фокус на региональных B2B-объектах и регламентах"],
            ["2019–2022", "Масштабирование бригад и мобильных команд"],
            ["2023–сейчас", "Федеральные сети, единые стандарты, усиленный контроль качества"]
          ].map(([years, text]) => (
            <div key={years}>
              <p className="font-semibold text-accent">{years}</p>
              <p className="mt-2 text-muted">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading title="Команда" text="Ключевые роли на объекте и в офисе — без лишних звеньев." />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Менеджер клиента", "Единая точка контакта и сметы"],
            ["Бригадир", "Контроль смены и чек-листа"],
            ["Контроль качества", "Аудиты и закрытие замечаний"]
          ].map(([role, desc]) => (
            <Card key={role} className="shadow-none">
              <p className="font-semibold">{role}</p>
              <p className="mt-2 text-sm text-muted">{desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeading title="Лицензии и сертификаты" text="Работаем с материалами и регламентами, подходящими под класс объекта; полный пакет для закупок — по запросу." />
        <Card className="shadow-none">
          <p className="text-sm leading-7 text-muted">
            Перечень допусков и сертификатов согласуется под отрасль (медицина, пищевое производство, общепит). Запросите актуальный список у менеджера перед тендером.
          </p>
        </Card>
      </Section>

      <Section>
        <SectionHeading title="Партнёры и типы клиентов" text="Ритейл, логистика, офисы, промышленность, медицина и ЖК." />
        <AdvantagesList />
      </Section>

      <Section className="bg-surface">
        <SectionHeading title="География" text="Локальные офисы и выезд в регионы присутствия." />
        <div className="flex flex-wrap gap-2">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/goroda/${city.slug}/`}
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition hover:border-accent"
            >
              {city.name}
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading title="Реквизиты" />
        <Card className="shadow-none">
          <p className="font-semibold">{brand.legalName}</p>
          <p className="mt-2 text-sm text-muted">ИНН, ОГРН и юридический адрес уточняйте в договоре и счёте — выдаём при запросе КП.</p>
          <p className="mt-4 text-sm text-muted">{brand.email}</p>
        </Card>
      </Section>

      <FinalCta />
    </>
  );
}
