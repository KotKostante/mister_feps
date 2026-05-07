import type { MetadataRoute } from "next";
import { brand, cities, extraServices, primaryCitySlugs, services } from "@/data/site";

function url(path: string) {
  return {
    url: `${brand.domain}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["/", "/uslugi/", "/goroda/", "/prices/", "/sla/", "/cases/", "/reviews/", "/faq/", "/about/", "/contacts/"];
  const servicePages = [...services.map((service) => `/uslugi/${service.slug}/`), ...extraServices.map((service) => `/uslugi/${service.slug}/`)];
  const cityPages = cities.map((city) => `/goroda/${city.slug}/`);
  const comboPages = primaryCitySlugs.flatMap((city) => services.map((service) => `/goroda/${city}/${service.slug}/`));

  return [...staticPages, ...servicePages, ...cityPages, ...comboPages].map(url);
}
