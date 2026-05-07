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
        variant === "primary" && "btn-kinetic-primary bg-primary text-primary-foreground",
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
        variant === "primary" && "btn-kinetic-primary bg-primary text-primary-foreground",
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
    <div className="mb-10 max-w-3xl">
      {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary">{eyebrow}</p> : null}
      <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
      {text ? <p className="mt-4 text-lg leading-8 text-muted">{text}</p> : null}
    </div>
  );
}
