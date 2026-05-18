import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LeadForm } from "@/components/lead-form";
import { CityMapButtons } from "@/components/sections/common";
import { ButtonLink, Card, Section, SectionHeading } from "@/components/ui";
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
            <div className="mb-6">
              <ButtonLink href="#lead-form" className="w-full justify-center sm:w-auto">
                Запросить расчёт — основная заявка
              </ButtonLink>
              <p className="mt-2 text-xs text-muted">Звонок и мессенджеры — если удобнее обсудить голосом до заполнения формы.</p>
            </div>
            <Card>
              <a href={phoneHref(brand.mainPhone)} className="text-2xl font-bold">
                {brand.mainPhone}
              </a>
              <a href={`mailto:${brand.email}`} className="mt-3 block text-muted">
                {brand.email}
              </a>
              <p className="mt-3 text-sm text-muted">{brand.legalName}</p>
              <p className="mt-6 text-sm font-semibold">Режим работы офиса</p>
              <p className="mt-2 text-sm text-muted">Пн–Пт 9:00–18:00, заявки онлайн — круглосуточно</p>
              <p className="mt-6 text-sm font-semibold">Мессенджеры</p>
              <div className="mt-2 flex flex-wrap gap-3 text-sm">
                <a href="https://wa.me/73433579121" className="font-medium text-accent" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
                <a href="https://t.me/" className="font-medium text-accent" target="_blank" rel="noopener noreferrer">
                  Telegram
                </a>
              </div>
            </Card>
          </div>
          <LeadForm />
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeading title="Города: телефоны и адреса" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cities.map((city) => (
            <Card key={city.slug} className="shadow-none">
              <h2 className="font-semibold">{city.name}</h2>
              <p className="mt-2 text-sm text-muted">{city.address}</p>
              <a href={phoneHref(city.phone)} className="mt-3 block font-semibold text-primary">
                {city.phone}
              </a>
              <p className="mt-2 text-xs text-muted">Менеджер: по направлению объекта</p>
              <CityMapButtons city={city} className="mt-4" />
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading title="Отзывы и вопросы в картах" text="Выберите город и откройте карточку Mister FAPC в Яндекс.Картах или 2ГИС." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cities.map((city) => (
            <Card key={city.slug} className="shadow-none">
              <p className="font-semibold">{city.name}</p>
              <p className="mt-2 text-sm text-muted">{city.address}</p>
              <CityMapButtons city={city} className="mt-4" />
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
