import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CityGrid, FinalCta, SlaMiniSection } from "@/components/sections/common";
import { Card, Section, SectionHeading } from "@/components/ui";
import { YandexMapEmbed } from "@/components/yandex-map-embed";
import { allOfficesYandexMapsUrl } from "@/lib/city-map";
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
        <SectionHeading title="Города присутствия" text="Хаб для регионального поиска: выберите город — там локальные контакты и комбо-страницы услуг. Ниже — как ориентироваться по географии и куда перейти для цен или заявки." />
        <p className="max-w-3xl text-lg leading-8 text-muted">
          Страница помогает быстро попасть в нужный офис и сервис: телефон и адрес в карточке города, отдельные посадочные под услугу в вашем регионе. Если город уже определён — откройте карточку и звоните локальному менеджеру или оставьте параметры объекта в форме.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card className="shadow-none">
            <p className="text-sm font-semibold text-primary">Урал</p>
            <p className="mt-2 text-sm text-muted">Екатеринбург, Пермь, Челябинск, Нижний Тагил — плотное покрытие и выезд в день обращения.</p>
          </Card>
          <Card className="shadow-none">
            <p className="text-sm font-semibold text-primary">Сибирь и Восток</p>
            <p className="mt-2 text-sm text-muted">Новосибирск, Тюмень, Иркутск — логистика и график под часовой пояс объекта.</p>
          </Card>
          <Card className="shadow-none">
            <p className="text-sm font-semibold text-primary">Центр</p>
            <p className="mt-2 text-sm text-muted">Липецк и прилегающие регионы — те же стандарты SLA и документооборота.</p>
          </Card>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contacts/" className="text-sm font-semibold text-accent hover:underline">
            Контакты и форма →
          </Link>
          <Link href="/prices/" className="text-sm font-semibold text-accent hover:underline">
            Таблица цен →
          </Link>
        </div>
        <div className="relative mt-10 flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-border bg-muted/30">
          <YandexMapEmbed variant="offices" title="Офисы Mister FAPC на карте" mapHeightClass="min-h-[220px] flex-1 w-full" />
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-background/95 px-3 py-2">
            <p className="text-xs text-muted">Ориентир по офисам — точку выезда уточняет менеджер</p>
            <a
              href={allOfficesYandexMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-accent hover:underline"
            >
              Открыть в Яндекс.Картах →
            </a>
          </div>
        </div>
        <div className="mt-12">
          <CityGrid />
        </div>
      </Section>
      <SlaMiniSection />
      <FinalCta />
    </>
  );
}
