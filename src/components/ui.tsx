import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  id
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} data-animate-section className={cn("py-16 sm:py-20 lg:py-24", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div data-animate="card" className={cn("info-glint rounded-xl border border-border bg-surface p-6 shadow-soft", className)}>{children}</div>;
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("info-glint inline-flex items-center rounded-lg border border-border bg-surface px-3 py-1 text-sm font-medium text-muted", className)}>
      {children}
    </span>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "btn-kinetic focus-ring inline-flex min-h-12 items-center justify-center rounded-lg px-5 text-base font-semibold",
        variant === "primary" && "btn-kinetic-primary bg-accent text-white",
        variant === "secondary" && "btn-kinetic-secondary border border-border bg-surface text-foreground",
        variant === "ghost" && "btn-kinetic-ghost text-foreground",
        className
      )}
      {...props}
    />
  );
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: "primary" | "secondary" | "ghost";
};

export function ButtonLink({ className, variant = "primary", href, ...props }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "btn-kinetic focus-ring inline-flex min-h-12 items-center justify-center rounded-lg px-5 text-base font-semibold",
        variant === "primary" && "btn-kinetic-primary bg-accent text-white",
        variant === "secondary" && "btn-kinetic-secondary border border-border bg-surface text-foreground",
        variant === "ghost" && "btn-kinetic-ghost text-foreground",
        className
      )}
      {...props}
    />
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mb-10 max-w-3xl" data-animate="heading">
      {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary">{eyebrow}</p> : null}
      <h2 className="text-section-title text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{title}</h2>
      {text ? <p className="mt-4 text-lg font-medium leading-8 text-muted">{text}</p> : null}
    </div>
  );
}

/** Квадратный номер как в блоке «Как запускаем уборку» / ProcessSection */
export function NumberBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white",
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * Карточка с номером + заголовок + подпись — единый вид с ProcessSection на главной.
 * Без `description` — только акцентный текст (пункты «что входит», факторы).
 */
export function NumberedStepCard({
  index,
  title,
  description,
  className
}: {
  index: number;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <Card className={cn("transition hover:border-accent/40", className)}>
      <NumberBadge>{index}</NumberBadge>
      <p className={cn("mt-4 font-semibold", description ? "" : "text-sm leading-snug")}>{title}</p>
      {description ? <p className="mt-2 text-sm leading-6 text-muted">{description}</p> : null}
    </Card>
  );
}

/** Карточка «что входит» с иконкой вместо номера — страница услуги (напр. уборка офисов) */
export function IconStepCard({
  icon: Icon,
  title,
  description,
  className
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <Card className={cn("transition hover:border-accent/40", className)}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-white">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <p className={cn("mt-4 font-semibold", description ? "" : "text-sm leading-snug")}>{title}</p>
      {description ? <p className="mt-2 text-sm leading-6 text-muted">{description}</p> : null}
    </Card>
  );
}

/** «Было / Стало» с тем же номером в углу — блок «Результат для клиента» */
export function NumberedDeltaCard({
  index,
  before,
  after,
  className
}: {
  index: number;
  before: string;
  after: string;
  className?: string;
}) {
  return (
    <Card className={cn("transition hover:border-accent/40", className)}>
      <NumberBadge>{index}</NumberBadge>
      <p className="mt-4 text-sm font-semibold leading-snug text-muted">{before}</p>
      <p className="mt-3 font-semibold leading-snug text-foreground">{after}</p>
    </Card>
  );
}
