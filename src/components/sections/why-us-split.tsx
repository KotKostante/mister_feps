import type { ReactNode } from "react";
import { CheckCircle2, CreditCard, FileCheck2, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import type { WhyUsIconKey } from "@/data/marketing";
import { whyUsBenefitsDefault } from "@/data/marketing";

const ICON_MAP: Record<WhyUsIconKey, LucideIcon> = {
  check: CheckCircle2,
  users: Users,
  card: CreditCard,
  file: FileCheck2
};

export type WhyUsBenefit = { icon: WhyUsIconKey; title: string; desc: string };

/**
 * Блок «фото слева + преимущества» — как на главной.
 * Тексты и набор карточек можно переопределить через props.
 */
export function WhyUsSplit({
  imageSrc = "/foto1.webp",
  imageAlt,
  eyebrow,
  title,
  description,
  benefits = whyUsBenefitsDefault,
  actions,
  sectionId
}: {
  imageSrc?: string | null;
  imageAlt: string;
  eyebrow: string;
  title: string;
  description: string;
  benefits?: WhyUsBenefit[];
  actions: ReactNode;
  /** Якорь для оглавления на странице услуги */
  sectionId?: string;
}) {
  const hasImage = Boolean(imageSrc);

  return (
    <section id={sectionId} className="relative overflow-hidden bg-background">
      <div className={`mx-auto grid w-full max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 lg:items-stretch lg:gap-16 lg:px-8 lg:py-24 ${hasImage ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>
        {hasImage ? (
          <div className="relative h-[420px] overflow-hidden rounded-2xl lg:h-full lg:min-h-[480px]">
            <Image
              src={encodeURI(imageSrc ?? "")}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
            {/* Лёгкое затемнение как у героя — фото не «выбивает» глаз рядом с текстом */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#070a0d]/35 via-transparent to-[#070a0d]/15"
              aria-hidden
            />
          </div>
        ) : null}
        <div data-animate-section>
          <div data-animate="heading">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">{eyebrow}</span>
            <h2 className="text-section-title mt-4 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg font-medium leading-8 text-muted">{description}</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {benefits.map((item) => {
              const Icon = ICON_MAP[item.icon];
              return (
                <div key={item.title} data-animate="item" className="rounded-xl border border-border bg-surface p-4">
                  <Icon className="mb-3 h-5 w-5 text-accent" />
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-muted">{item.desc}</p>
                </div>
              );
            })}
          </div>
          <div data-animate="item" className="mt-8 flex flex-wrap gap-3">
            {actions}
          </div>
        </div>
      </div>
    </section>
  );
}
