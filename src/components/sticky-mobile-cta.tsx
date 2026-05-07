import { Phone } from "lucide-react";
import Link from "next/link";
import { brand } from "@/data/site";
import { phoneHref } from "@/lib/utils";

export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-border bg-background p-3 shadow-soft md:hidden">
      <a href={phoneHref(brand.mainPhone)} className="btn-kinetic btn-kinetic-secondary flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-surface text-sm font-semibold">
        <Phone className="h-4 w-4 text-primary" />
        Позвонить
      </a>
      <Link href="/contacts/#lead-form" className="btn-kinetic btn-kinetic-primary flex h-12 items-center justify-center rounded-lg bg-primary px-3 text-center text-sm font-semibold text-primary-foreground">
        Рассчитать стоимость
      </Link>
    </div>
  );
}
