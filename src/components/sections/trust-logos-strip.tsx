import Link from "next/link";
import { Container } from "@/components/ui";
import { trustClientLogos } from "@/data/site";
import type { TrustClientLogo } from "@/data/site";
import { cn } from "@/lib/utils";

function LogoItem({ item }: { item: TrustClientLogo }) {
  const inner = item.src ? (
    // Произвольный CDN / статика — без next/image, чтобы не править remotePatterns при каждом новом домене
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.src}
      alt={item.alt}
      className="h-7 max-h-9 w-auto max-w-[min(140px,28vw)] object-contain opacity-[0.72] transition duration-200 hover:opacity-100 md:h-9"
    />
  ) : (
    <span
      className={cn(
        "inline-block text-center text-base font-semibold tracking-tight text-foreground/85 md:text-lg",
        item.href && "transition hover:text-accent"
      )}
    >
      {item.alt}
    </span>
  );

  const className =
    "flex min-h-[2rem] items-center justify-center outline-none ring-offset-background focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-accent";

  if (item.href) {
    return (
      <Link href={item.href} className={className} data-animate="item">
        {inner}
      </Link>
    );
  }

  return (
    <div className={className} data-animate="item">
      {inner}
    </div>
  );
}

/**
 * Полоска клиентов под героем: картинки при заполненном `src` в данных, иначе название текстом.
 */
export function TrustLogosStrip() {
  if (!trustClientLogos.length) return null;

  return (
    <section data-animate-section className="border-y border-border bg-surface/90 py-9 sm:py-10">
      <Container>
        <p data-animate="heading" className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Из кейсов
        </p>
        <div className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-14 lg:gap-x-16">
          {trustClientLogos.map((item) => (
            <LogoItem key={item.alt} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
