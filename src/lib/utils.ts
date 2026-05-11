import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Публичный URL сайта (canonical, sitemap). На Vercel: Settings → Environment Variables → NEXT_PUBLIC_SITE_URL */
const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const siteUrl = fromEnv ? fromEnv.replace(/\/+$/, "") : "https://mister-fapc.ru";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path}`;
}

export function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function rub(value: string) {
  return value;
}
