import type { City } from "@/data/site";
import { cities } from "@/data/site";

/** bbox для embed.openstreetmap.org: minLon, minLat, maxLon, maxLat */
export function cityOsmEmbedSrc(city: City): string {
  const lat = city.lat ?? 56.84;
  const lon = city.lon ?? 60.6;
  const d = 0.065;
  const minLon = lon - d;
  const minLat = lat - d;
  const maxLon = lon + d;
  const maxLat = lat + d;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(`${minLon},${minLat},${maxLon},${maxLat}`)}&layer=mapnik`;
}

/** Ссылка «открыть карту» с маркером города */
export function cityOsmExternalUrl(city: City): string {
  const lat = city.lat ?? 56.84;
  const lon = city.lon ?? 60.6;
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=13/${lat}/${lon}`;
}

/** Карта со всеми офисами — для страницы контактов и хаба городов */
export function allOfficesOsmEmbedSrc(): string {
  const coords = cities.map((c) => ({ lat: c.lat ?? 56.84, lon: c.lon ?? 60.6 }));
  const lats = coords.map((c) => c.lat);
  const lons = coords.map((c) => c.lon);
  const padLat = 1.25;
  const padLon = 2.5;
  const minLat = Math.min(...lats) - padLat;
  const maxLat = Math.max(...lats) + padLat;
  const minLon = Math.min(...lons) - padLon;
  const maxLon = Math.max(...lons) + padLon;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(`${minLon},${minLat},${maxLon},${maxLat}`)}&layer=mapnik`;
}

export function allOfficesOsmExternalUrl(): string {
  const midLat = cities.reduce((s, c) => s + (c.lat ?? 56.84), 0) / cities.length;
  const midLon = cities.reduce((s, c) => s + (c.lon ?? 60.6), 0) / cities.length;
  return `https://www.openstreetmap.org/?mlat=${midLat}&mlon=${midLon}#map=4/${midLat}/${midLon}`;
}

/** Открыть Яндекс.Карты с маркером офиса (lon, lat в параметре pt) */
export function cityYandexMapsUrl(city: City): string {
  if (city.yandexMapsUrl) return city.yandexMapsUrl;
  const lat = city.lat ?? 56.84;
  const lon = city.lon ?? 60.6;
  return `https://yandex.ru/maps/?pt=${lon}%2C${lat}&z=15&l=map`;
}

/** Обзор всех офисов — центр по средним координатам */
export function allOfficesYandexMapsUrl(): string {
  const coords = cities.map((c) => ({ lat: c.lat ?? 56.84, lon: c.lon ?? 60.6 }));
  const midLat = coords.reduce((s, c) => s + c.lat, 0) / coords.length;
  const midLon = coords.reduce((s, c) => s + c.lon, 0) / coords.length;
  return `https://yandex.ru/maps/?ll=${midLon}%2C${midLat}&z=4&l=map`;
}
