import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const siteUrl = "https://mister-fapc.ru";

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
