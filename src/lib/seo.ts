import type { City, Service } from "@/data/site";
import { brand } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

export function localBusinessSchema(city: City, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: brand.name,
    telephone: city.phone,
    email: brand.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: city.address,
      addressLocality: city.name,
      addressCountry: "RU"
    },
    url: absoluteUrl(path),
    image: absoluteUrl("/foto1.webp"),
    areaServed: city.area,
    priceRange: "$$",
    openingHours: "Mo-Fr 08:00-20:00"
  };
}

export function serviceSchema(service: Service, path: string, city?: City) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: city ? `${service.title} в ${city.prepositional}` : service.title,
    provider: {
      "@type": "Organization",
      name: brand.name,
      url: brand.domain
    },
    areaServed: city?.area ?? "Россия",
    serviceType: service.title,
    url: absoluteUrl(path)
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}
