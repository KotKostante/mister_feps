"use client";

import { useEffect, useRef, useState } from "react";
import type { City } from "@/data/site";
import { cities } from "@/data/site";
import { allOfficesYandexMapsUrl, cityYandexMapsUrl } from "@/lib/city-map";
import { phoneHref } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type YamapsAny = any;

function loadYandexScript(apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("no window"));
      return;
    }
    const w = window as Window & { ymaps?: YamapsAny };
    if (w.ymaps) {
      resolve();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>('script[src*="api-maps.yandex.ru/2.1"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("ymaps load")), { once: true });
      return;
    }
    const s = document.createElement("script");
    s.src = `https://api-maps.yandex.ru/2.1/?apikey=${encodeURIComponent(apiKey)}&lang=ru_RU`;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("ymaps script"));
    document.head.appendChild(s);
  });
}

export type YandexMapEmbedProps = {
  variant: "offices" | "city";
  city?: City;
  title: string;
  className?: string;
  mapHeightClass?: string;
};

/** Карта Яндекса с метками офисов; без ключа или при ошибке — ссылка во внешние Яндекс.Карты */
export function YandexMapEmbed({
  variant,
  city,
  title,
  className = "",
  mapHeightClass = "min-h-[320px]"
}: YandexMapEmbedProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;
  const [loadError, setLoadError] = useState(false);
  const useFallback = !apiKey || loadError;
  const citySlug = city?.slug;

  useEffect(() => {
    setLoadError(false);
  }, [variant, citySlug, apiKey]);

  useEffect(() => {
    if (!apiKey || loadError) return;

    let cancelled = false;
    let map: YamapsAny = null;

    const run = async () => {
      try {
        await loadYandexScript(apiKey);
        if (cancelled || !mapRef.current) return;

        const ymaps = (window as Window & { ymaps?: YamapsAny }).ymaps;
        if (!ymaps) {
          if (!cancelled) setLoadError(true);
          return;
        }

        await new Promise<void>((resolve) => {
          ymaps.ready(() => resolve());
        });
        if (cancelled || !mapRef.current) return;

        const list: City[] = variant === "city" && city ? [city] : [...cities];

        const placemarks = list.map((c) => {
          const lat = c.lat ?? 56.84;
          const lon = c.lon ?? 60.6;
          const telLink = phoneHref(c.phone);
          return new ymaps.Placemark(
            [lat, lon],
            {
              balloonContentHeader: c.name,
              balloonContentBody: `<div style="font-size:13px;line-height:1.5">${c.address}<br/><a href="${telLink}">${c.phone}</a></div>`,
              hintContent: c.name
            },
            { preset: "islands#blueCircleDotIcon" }
          );
        });

        const centerCity = variant === "city" && city ? city : list[0];
        const cx = centerCity.lat ?? 56.84;
        const cy = centerCity.lon ?? 60.6;

        map = new ymaps.Map(
          mapRef.current,
          {
            center: [cx, cy],
            zoom: variant === "city" ? 14 : 4,
            controls: ["zoomControl", "fullscreenControl"]
          },
          { suppressMapOpenBlock: true }
        );

        placemarks.forEach((pm: YamapsAny) => map.geoObjects.add(pm));

        if (variant === "offices" && placemarks.length > 1 && typeof map.geoObjects.getBounds === "function") {
          const b = map.geoObjects.getBounds();
          if (b) {
            map.setBounds(b, { checkZoomRange: true, zoomMargin: 56 });
          }
        }
      } catch {
        map?.destroy?.();
        map = null;
        if (!cancelled) setLoadError(true);
      }
    };

    void run();

    return () => {
      cancelled = true;
      map?.destroy?.();
      map = null;
    };
  }, [variant, citySlug, city, apiKey, loadError]);

  const fallbackHref = variant === "city" && city ? cityYandexMapsUrl(city) : allOfficesYandexMapsUrl();

  return (
    <div className={`relative w-full overflow-hidden bg-muted/20 ${mapHeightClass} ${className}`}>
      {useFallback ? (
        <div className="flex min-h-[inherit] flex-col items-center justify-center gap-4 border border-border bg-surface/80 p-8 text-center">
          <p className="max-w-md text-sm text-muted">
            {apiKey
              ? "Не удалось загрузить карту. Откройте ссылку ниже."
              : "Задайте NEXT_PUBLIC_YANDEX_MAPS_API_KEY в .env.local или откройте карту по ссылке."}
          </p>
          <a
            href={fallbackHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-accent hover:underline"
          >
            Открыть в Яндекс.Картах →
          </a>
        </div>
      ) : (
        <div ref={mapRef} className="absolute inset-0 h-full min-h-[200px] w-full" aria-label={title} role="application" />
      )}
    </div>
  );
}
