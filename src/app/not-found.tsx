import Link from "next/link";
import { Section } from "@/components/ui";

export default function NotFound() {
  return (
    <Section>
      <h1 className="text-4xl font-semibold">Страница не найдена</h1>
      <p className="mt-4 max-w-xl leading-8 text-muted">Возможно, адрес изменился. Перейдите на услуги, города или оставьте заявку на расчет.</p>
      <Link href="/" className="btn-kinetic btn-kinetic-primary mt-6 inline-flex min-h-12 items-center rounded-lg bg-primary px-5 font-semibold text-primary-foreground">На главную</Link>
    </Section>
  );
}
