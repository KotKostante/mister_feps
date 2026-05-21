/**
 * Ценовые данные Mister FAPC
 *
 * B2C — из прайс-листа (новый праус квартиры 10.06.xlsx)
 * B2B — из методологии расчёта (5_описание_услуг_и_прайс_для_юр_лиц.pdf)
 */

// ─── B2C: разовые услуги для квартир ────────────────────────────────────────

/** Поддерживающая уборка квартиры — по площади */
export const MAINTENANCE_CLEANING: { label: string; area: string; price: number }[] = [
  { label: "30–40 м²", area: "30-40", price: 8000 },
  { label: "50–60 м²", area: "50-60", price: 10000 },
  { label: "70 м²",    area: "70",    price: 12000 },
  { label: "от 100 м²", area: "100+", price: 17000 },
];

/** Генеральная уборка квартиры — по площади */
export const DEEP_CLEANING: { label: string; area: string; price: number; perM2?: number }[] = [
  { label: "30 м²",   area: "30",  price: 10500 },
  { label: "40 м²",   area: "40",  price: 14000 },
  { label: "50–60 м²", area: "50-60", price: 16000 },
  { label: "70 м²",   area: "70",  price: 21000 },
  { label: "от 100 м²", area: "100+", price: 0, perM2: 300 },
];

/** Уборка после ремонта — по площади */
export const POST_RENOVATION_CLEANING: { label: string; area: string; price: number; priceTo?: number; perM2?: number }[] = [
  { label: "30–40 м²", area: "30-40", price: 10500 },
  { label: "50–60 м²", area: "50-60", price: 16000, priceTo: 21000 },
  { label: "70 м²",    area: "70",    price: 25000 },
  { label: "от 100 м²", area: "100+", price: 0, perM2: 300 },
];

/** Дополнительные разовые услуги */
export const EXTRA_SERVICES: { label: string; priceFrom: number; priceTo?: number; unit?: string }[] = [
  { label: "Мытьё окна одностворчатого (с двух сторон)", priceFrom: 600 },
  { label: "Мытьё окна двустворчатого", priceFrom: 1000 },
  { label: "Мытьё окна трёхстворчатого", priceFrom: 1200 },
  { label: "Мытьё окна четырёхстворчатого", priceFrom: 1500 },
  { label: "Балконная дверь", priceFrom: 1000 },
  { label: "Балконная дверь с окном", priceFrom: 1500 },
  { label: "Мытьё балкона/лоджии 3 створки", priceFrom: 8000 },
  { label: "Мытьё балкона/лоджии 4 створки", priceFrom: 12000 },
  { label: "Мытьё балкона/лоджии 5 створок", priceFrom: 14000 },
  { label: "Химчистка 2-местного дивана", priceFrom: 6500 },
  { label: "Химчистка 3-местного дивана", priceFrom: 8500 },
  { label: "Химчистка 4-местного дивана", priceFrom: 10500 },
  { label: "Химчистка кресла", priceFrom: 1000 },
  { label: "Химчистка односпального матраса", priceFrom: 2500 },
  { label: "Химчистка полутораспального матраса", priceFrom: 4500 },
  { label: "Химчистка двуспального матраса", priceFrom: 5000 },
  { label: "Чистка ковровых покрытий", priceFrom: 220, unit: "руб/м²" },
  { label: "Мытьё духовки/плиты/вытяжки", priceFrom: 2000 },
  { label: "Мытьё холодильника внутри", priceFrom: 1000, priceTo: 6000 },
  { label: "Мытьё СВЧ", priceFrom: 1000 },
  { label: "Уборка после пожара", priceFrom: 1000, unit: "руб/м²" },
  { label: "Уборка после потопа", priceFrom: 350, unit: "руб/м²" },
  { label: "Уборка после прорыва канализации", priceFrom: 550, unit: "руб/м²" },
  { label: "Минимальный выезд", priceFrom: 6000 },
];

// ─── B2B: постоянное обслуживание юридических лиц ───────────────────────────

/**
 * Нормы выработки на одного сотрудника за смену (м²).
 * Источник: PDF-методология.
 */
export const B2B_PRODUCTIVITY_NORMS: Record<string, { label: string; norm: number }> = {
  office:       { label: "Офис / БЦ",       norm: 1500 },
  retail:       { label: "ТЦ / торговые зоны", norm: 1500 },
  warehouse:    { label: "Склад / логистика", norm: 2500 },
  production:   { label: "Производство",     norm: 1000 },
  residential:  { label: "ЖК / МКД",         norm: 1200 },
};

/**
 * Ставка одного сотрудника в месяц (руб., с учётом НДФЛ и соцвзносов).
 * Диапазон из PDF: 55 000–90 000 руб.
 */
export const B2B_STAFF_RATE_PER_MONTH = 65000; // среднее значение для расчёта ориентира

/**
 * Ставка материалов и химии на 1000 м² площади в месяц (руб.).
 * Из PDF: пример ТЦ 4500 м² = 22 500 руб/мес.
 */
export const B2B_MATERIALS_PER_1000M2 = 5000;

/**
 * Амортизация инвентаря на одного сотрудника в месяц (руб.).
 * Из PDF: 10 000 / 12 = ~833 руб/сотр/мес.
 */
export const B2B_INVENTORY_PER_STAFF = 833;

/**
 * Амортизация техники (поломоечные машины и т.д.) в месяц.
 * Из PDF-примера: 30 000 руб для ЖК с 5 сотрудниками → ~6 000/сотр.
 * Но для офисов проще считать как долю от ФОТ.
 */
export const B2B_EQUIPMENT_PER_STAFF = 2400;

/**
 * Коэффициенты наценки (из PDF):
 * - Накладные (АУП, аренда офиса): 5%
 * - Рентабельность: ~35-45% (используем 40% как ориентир)
 * - УСН + НДС 5%: ~13%
 */
export const B2B_COEFFICIENTS = {
  overhead: 1.05,     // +5% накладные
  margin:   1.40,     // +40% рентабельность
  taxes:    1.13,     // +13% УСН + НДС
};

/** Минимальный заказ на постоянное обслуживание */
export const B2B_MIN_ORDER = 18000;

/**
 * Коэффициент частоты уборки (относительно ежедневной 5/7).
 * Влияет на кол-во выходов в месяц → на ФОТ.
 */
export const B2B_FREQUENCY: Record<string, { label: string; daysPerMonth: number }> = {
  daily:      { label: "Ежедневно (5 дн/нед)", daysPerMonth: 22 },
  threeWeek:  { label: "3 раза в неделю",       daysPerMonth: 13 },
  weekly:     { label: "1 раз в неделю",         daysPerMonth: 4  },
};

/**
 * Рассчитывает ориентировочную стоимость B2B-обслуживания в месяц.
 *
 * Формула (из PDF-методологии):
 *   staffCount = ceil(area / norm)
 *   fot = staffCount × RATE × (days / 22)          — масштабируем по дням выходов
 *   materials = (area / 1000) × MATERIALS_PER_1000M2
 *   inventory = staffCount × INVENTORY_PER_STAFF
 *   equipment = staffCount × EQUIPMENT_PER_STAFF
 *   cost = (fot + materials + inventory + equipment) × overhead × margin × taxes
 */
export function calcB2bMonthly(params: {
  objectType: string;
  area: number;
  frequency: string;
}): number {
  const { objectType, area, frequency } = params;
  const norm = B2B_PRODUCTIVITY_NORMS[objectType]?.norm ?? 1500;
  const days = B2B_FREQUENCY[frequency]?.daysPerMonth ?? 22;

  const staffCount = Math.ceil(area / norm);
  const fot = staffCount * B2B_STAFF_RATE_PER_MONTH * (days / 22);
  const materials = (area / 1000) * B2B_MATERIALS_PER_1000M2;
  const inventory = staffCount * B2B_INVENTORY_PER_STAFF;
  const equipment = staffCount * B2B_EQUIPMENT_PER_STAFF;

  const base = fot + materials + inventory + equipment;
  const total = base
    * B2B_COEFFICIENTS.overhead
    * B2B_COEFFICIENTS.margin
    * B2B_COEFFICIENTS.taxes;

  return Math.max(B2B_MIN_ORDER, Math.round(total / 1000) * 1000);
}

/**
 * Возвращает цену B2C по площади для заданного типа уборки.
 * Для диапазонов (100м²+) считает по ставке perM2.
 */
export function calcB2cPrice(
  type: "maintenance" | "deep" | "postRenovation",
  area: number
): { price: number; perM2?: number } | null {
  const table =
    type === "maintenance"   ? MAINTENANCE_CLEANING      :
    type === "deep"          ? DEEP_CLEANING             :
    type === "postRenovation"? POST_RENOVATION_CLEANING  : null;

  if (!table) return null;

  // Последний элемент — это "от 100м²+" с perM2
  const last = table[table.length - 1] as typeof table[0] & { perM2?: number };

  if (area >= 100 && last.perM2) {
    return { price: Math.round(area * last.perM2 / 1000) * 1000, perM2: last.perM2 };
  }

  // Подбираем подходящий диапазон
  if (area <= 35)  return { price: table[0].price };
  if (area <= 60)  return { price: table[1]?.price ?? table[0].price };
  if (area <= 80)  return { price: table[2]?.price ?? table[1].price };
  return { price: table[3]?.price ?? table[2].price };
}
