import type { MetadataRoute } from "next";
import { blogPosts, brand, cases, cities, extraServices, primaryCitySlugs, services } from "@/data/site";

function url(path: string) {
  return {
    url: `${brand.domain}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["/", "/uslugi/", "/goroda/", "/prices/", "/sla/", "/cases/", "/reviews/", "/faq/", "/about/", "/contacts/", "/blog/"];
  const servicePages = [...services.map((service) => `/uslugi/${service.slug}/`), ...extraServices.map((service) => `/uslugi/${service.slug}/`)];
  const cityPages = cities.map((city) => `/goroda/${city.slug}/`);
  const comboPages = primaryCitySlugs.flatMap((city) => services.map((service) => `/goroda/${city}/${service.slug}/`));
  const blogPages = blogPosts.map((p) => `/blog/${p.slug}/`);
  const casePages = cases.map((c) => `/cases/${c.slug}/`);

  return [...staticPages, ...servicePages, ...cityPages, ...comboPages, ...blogPages, ...casePages].map(url);
}
