/** Тип объекта в калькуляторе (ставки совпадают с блоком «Ориентир» на главной) */
export type DemoObjectTypeId = "office" | "warehouse" | "production";

/** Услуги, у которых ставка в калькуляторе совпадает с ориентиром на сайте — тип объекта фиксируем */
export const DEMO_LOCK_BY_SERVICE_SLUG: Partial<Record<string, DemoObjectTypeId>> = {
  "uborka-ofisov": "office",
  "uborka-skladov": "warehouse",
  "uborka-proizvodstva": "production"
};

export function demoLockForServiceSlug(slug: string): DemoObjectTypeId | undefined {
  return DEMO_LOCK_BY_SERVICE_SLUG[slug];
}
