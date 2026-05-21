/**
 * Общие блоки маркетинговых страниц (герой, «почему мы»).
 * Иконки задаются ключами — маппинг в компоненте WhyUsSplit.
 */

export type WhyUsIconKey = "check" | "users" | "card" | "file";

export const whyUsBenefitsDefault: { icon: WhyUsIconKey; title: string; desc: string }[] = [
  { icon: "check", title: "Чек-листы по каждому объекту", desc: "Фиксируем каждую зону — ничего не пропускается" },
  { icon: "users", title: "Закреплённая команда", desc: "Один менеджер, один бригадир, один стандарт" },
  { icon: "card", title: "Оплата после приёмки", desc: "Платите только за принятую работу" },
  { icon: "file", title: "Документы для юрлиц", desc: "Договор, КП, акты, ЭДО, работа с НДС" }
];

/** Фон героя на главной (не смешивать с hero страниц услуг — там свой heroCover в site.ts) */
export const MARKETING_HERO_BG = "/foto1.webp";

/** Буллеты под акцентом в правой колонке героя */
export const heroProductBullets = [
  "Бесплатный выезд менеджера",
  "Клинтест и подбор химии",
  "Оплата после приёмки",
  "44-ФЗ / 223-ФЗ для тендеров"
];
