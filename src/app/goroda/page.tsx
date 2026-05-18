import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CityGrid, FinalCta, SlaMiniSection } from "@/components/sections/common";
import { Card, Section, SectionHeading } from "@/components/ui";
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
        <div className="mt-12">
          <CityGrid />
        </div>
      </Section>
      <SlaMiniSection />
      <FinalCta />
    </>
  );
}
