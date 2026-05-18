import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BedDouble,
  Building2,
  Bus,
  CalendarDays,
  Car,
  ClipboardCheck,
  CloudRain,
  Cog,
  Droplets,
  Dumbbell,
  Factory,
  FileCheck2,
  Film,
  Flame,
  Fuel,
  Home,
  Landmark,
  Layers,
  MapPin,
  Package,
  Plane,
  School,
  ShieldCheck,
  ShoppingBag,
  Sofa,
  Stethoscope,
  Truck,
  UtensilsCrossed,
  UsersRound,
  Warehouse,
  Wind,
} from "lucide-react";

import { siteUrl } from "@/lib/utils";

export type City = {
  slug: string;
  name: string;
  prepositional: string;
  genitive: string;
  address: string;
  phone: string;
  area: string;
  /** Центр карты OSM (embed и ссылка «открыть карту») */
  lat?: number;
  lon?: number;
  yandexMapsUrl?: string;
  twoGisUrl?: string;
  note?: string;
};

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  genitive: string;
  description: string;
  icon: LucideIcon;
  includes: string[];
  priceFrom: string;
  factors: string[];
  /** Блок «Кому подходит» на /uslugi/[slug]/ — если нет, подставляется общий шаблон */
  audience?: { title: string; text: string }[];
  /** Пары «было / стало» для блока «Результат для клиента» */
  clientResults?: [string, string][];
  /** Дополнительные FAQ перед вопросом «Что входит» */
  faqExtra?: { question: string; answer: string }[];
  /** Галерея на странице услуги (например 2×2) */
  gallery?: { src: string; alt: string }[];
  /** Фон первого блока страницы услуги — путь из public (например, /foto1.webp) */
  heroCover?: string;
  /** Иллюстрация слева в блоке «Стоимость» на /uslugi/[slug]/ */
  pricingSectionImage?: string;
  /** Фото слева в WhyUsSplit на странице услуги (по умолчанию /foto1.webp) */
  whyUsSplitImage?: string;
};

export const brand = {
  name: "Mister FAPC",
  legalName: "ИП Зубкова",
  email: "info@mister-fapc.com",
  mainPhone: "+7 (343) 357-91-21",
  domain: siteUrl
};

export const trustStats = [
  { value: "12 лет", label: "на рынке клининга" },
  { value: "97%", label: "клиентов обращаются повторно" },
  { value: "420", label: "сотрудников в команде" },
  { value: "1 250 000 м2", label: "площадей в работе" }
];

/** Плашка под героем на главной: добавьте `src` (полный URL CDN или `/logos/….svg` из public). Без `src` — текст названия. */
export type TrustClientLogo = {
  alt: string;
  src?: string;
  href?: string;
};

export const trustClientLogos: TrustClientLogo[] = [
  // Пример: { alt: "Яндекс.Маркет", src: "https://cdn.example.com/clients/yandex.svg", href: "/cases/..." },
  { alt: "Яндекс.Маркет", href: "/cases/yandex-market-sortcenter/" },
  { alt: "Zolla", href: "/cases/zolla-set/" },
  { alt: "МТС", href: "/cases/mts-offices/" },
  { alt: "Бизнес-парк", href: "/cases/biznes-park-tyumen/" }
];

export const cities: City[] = [
  {
    slug: "ekaterinburg",
    name: "Екатеринбург",
    prepositional: "Екатеринбурге",
    genitive: "Екатеринбурга",
    address: "Чайковского 56",
    phone: "+7 (343) 357-91-21",
    area: "Екатеринбург и Свердловская область",
    lat: 56.838,
    lon: 60.597,
    yandexMapsUrl: "https://yandex.ru/profile/144385794281?lang=ru",
    twoGisUrl: "https://2gis.ru/ekaterinburg/geo/70000001060043194"
  },
  {
    slug: "perm",
    name: "Пермь",
    prepositional: "Перми",
    genitive: "Перми",
    address: "Куйбышева 37",
    phone: "+7 (342) 255-46-67",
    area: "Пермь и Пермский край",
    lat: 58.01,
    lon: 56.229
  },
  {
    slug: "chelyabinsk",
    name: "Челябинск",
    prepositional: "Челябинске",
    genitive: "Челябинска",
    address: "Елькина 61А",
    phone: "+7 (351) 225-61-59",
    area: "Челябинск и область",
    lat: 55.164,
    lon: 61.437,
    twoGisUrl: "https://2gis.ru/chelyabinsk/geo/70000001061716265"
  },
  {
    slug: "tyumen",
    name: "Тюмень",
    prepositional: "Тюмени",
    genitive: "Тюмени",
    address: "Одесская 48а",
    phone: "+7 (3452) 69-23-68",
    area: "Тюмень и область",
    lat: 57.152,
    lon: 65.527,
    twoGisUrl: "https://2gis.ru/tyumen/geo/70000001085763250"
  },
  {
    slug: "novosibirsk",
    name: "Новосибирск",
    prepositional: "Новосибирске",
    genitive: "Новосибирска",
    address: "Красный проспект 30",
    phone: "+7 (383) 242-72-89",
    area: "Новосибирск и область",
    lat: 55.03,
    lon: 82.92,
    yandexMapsUrl: "https://yandex.ru/maps/-/CDhaZ6nk",
    twoGisUrl: "https://2gis.ru/novosibirsk/geo/70000001089284770"
  },
  {
    slug: "nizhny-tagil",
    name: "Нижний Тагил",
    prepositional: "Нижнем Тагиле",
    genitive: "Нижнего Тагила",
    address: "Черноисточинское ш. 65",
    phone: "+7 (3435) 37-08-28",
    area: "Нижний Тагил и область",
    lat: 57.866842,
    lon: 59.944875,
    yandexMapsUrl: "https://yandex.ru/maps/org/mister_feps/211822820792/?ll=59.944875%2C57.866842&z=15",
    twoGisUrl: "https://2gis.ru/ntagil/firm/70000001060102480"
  },
  {
    slug: "lipetsk",
    name: "Липецк",
    prepositional: "Липецке",
    genitive: "Липецка",
    address: "Ферросплавная 2а",
    phone: "+7 (4742) 54-50-27",
    area: "Липецк и область",
    lat: 52.61,
    lon: 39.595,
    yandexMapsUrl: "https://yandex.ru/maps/org/mister_feps/193564113543/",
    twoGisUrl: "https://2gis.ru/lipetsk/geo/70000001056456844"
  },
  {
    slug: "irkutsk",
    name: "Иркутск",
    prepositional: "Иркутске",
    genitive: "Иркутска",
    address: "Байкальская 236/1",
    phone: "+7 (3952) 78-84-79",
    area: "Иркутск и область",
    lat: 52.286,
    lon: 104.281,
    yandexMapsUrl: "https://yandex.ru/maps/-/CPcpB-9G",
    twoGisUrl: "https://2gis.ru/irkutsk/geo/70000001091220367"
  }
];

export const primaryCitySlugs = ["ekaterinburg", "perm", "chelyabinsk", "tyumen", "novosibirsk", "nizhny-tagil", "lipetsk", "irkutsk"];

type ServiceVisuals = Pick<Service, "heroCover" | "pricingSectionImage" | "whyUsSplitImage" | "gallery">;

const servicePhotoSets = {
  office: ["/services/office-modern-3.webp", "/services/office-cleaning-1.webp", "/services/office-cleaning-2.webp"],
  warehouse: ["/services/warehouse-cleaning-hero-enhanced.webp", "/services/warehouse-cleaning-2.webp", "/services/warehouse-cleaning-3.webp"],
  industrial: ["/services/industrial-dust-1.webp", "/services/industrial-dust-2.webp", "/services/industrial-dust-3.webp"],
  medical: ["/services/commercial-5.webp", "/services/commercial-6.webp", "/services/wet-zone-cleaning-2.webp"],
  government: ["/services/team-uniform-1.webp", "/services/commercial-1.webp", "/services/commercial-2.webp"],
  general: ["/services/general-corridor-1.webp", "/services/general-corridor-2.webp", "/services/general-corridor-3.webp"],
  postRenovation: ["/services/post-renovation-1.webp", "/services/post-renovation-2.webp", "/services/post-renovation-3.webp"],
  parking: ["/services/parking-1.webp", "/services/parking-2.webp", "/services/parking-3.webp"],
  floor: ["/services/floor-cleaning-1.webp", "/services/floor-cleaning-2.webp", "/services/post-construction-team-3.webp"],
  upholstery: ["/services/upholstery-cleaning-1.webp", "/services/upholstery-cleaning-2.webp", "/services/upholstery-cleaning-3.webp"],
  windows: ["/services/window-facade-4.webp", "/services/window-facade-5.webp", "/services/window-facade-6.webp"],
  kitchen: ["/services/kitchen-cleaning-1.webp", "/services/commercial-5.webp", "/services/commercial-6.webp"],
  retail: ["/services/retail-cleaning-1.webp", "/services/commercial-5.webp", "/services/commercial-6.webp"],
  residential: ["/services/residential-common-3.webp", "/services/general-corridor-2.webp", "/services/general-corridor-3.webp"],
  sports: ["/services/industrial-cleaning-1.webp", "/services/floor-cleaning-1.webp", "/services/floor-cleaning-2.webp"],
  wetZone: ["/services/wet-zone-cleaning-1.webp", "/services/wet-zone-cleaning-2.webp", "/services/general-cleaning-1.webp"],
  hotel: ["/services/hotel-cleaning-generated-1.webp", "/services/team-uniform-1.webp", "/services/general-corridor-1.webp"],
  fire: ["/services/fire-cleaning-generated-1.webp", "/services/emergency-1.webp", "/services/post-renovation-2.webp"],
  flood: ["/services/flood-cleaning-generated-1.webp", "/services/emergency-2.webp", "/services/wet-zone-cleaning-1.webp"],
  cinema: ["/services/cinema-cleaning-generated-1.webp", "/services/upholstery-cleaning-2.webp", "/services/carpet-cleaning-generated-1.webp"],
  carpet: ["/services/carpet-cleaning-generated-1.webp", "/services/upholstery-cleaning-1.webp", "/services/floor-cleaning-2.webp"],
  curtain: ["/services/curtain-cleaning-generated-1.webp", "/services/commercial-4.webp", "/services/team-uniform-1.webp"],
  paving: ["/services/paving-cleaning-generated-1.webp", "/services/parking-2.webp", "/services/floor-cleaning-1.webp"],
  transport: ["/services/transport-cleaning-generated-1.webp", "/services/upholstery-cleaning-3.webp", "/services/general-cleaning-2.webp"],
  fuel: ["/services/fuel-cleaning-generated-1.webp", "/services/industrial-cleaning-1.webp", "/services/parking-1.webp"],
  terminal: ["/services/terminal-cleaning-generated-1.webp", "/services/floor-cleaning-1.webp", "/services/commercial-3.webp"],
  school: ["/services/school-cleaning-generated-1.webp", "/services/general-corridor-2.webp", "/services/commercial-5.webp"],
  event: ["/services/event-cleaning-generated-1.webp", "/services/commercial-1.webp", "/services/floor-cleaning-2.webp"]
} satisfies Record<string, [string, string, string]>;

const servicePhotoSetBySlug: Partial<Record<string, keyof typeof servicePhotoSets>> = {
  "uborka-ofisov": "office",
  "uborka-proizvodstva": "industrial",
  "uborka-skladov": "warehouse",
  "generalnaya-uborka": "general",
  "uborka-posle-remonta": "postRenovation",
  "uborka-torgovyh-setey": "retail",
  "uborka-promoborudovaniya": "industrial",
  "uborka-zhk": "residential",
  "uborka-restoranov-kafe": "kitchen",
  "uborka-medcentrov": "medical",
  "uborka-fulfilmentov": "warehouse",
  "uborka-sportivnyh-obyektov": "sports",
  "uborka-saun-basseynov": "wetZone",
  "uborka-parkingov": "parking",
  "uborka-fasadov-okon": "windows",
  "uborka-posle-pozhara": "fire",
  "uborka-posle-potopa": "flood",
  "himchistka-kinoteatrov": "cinema",
  "himchistka-myagkoy-mebeli": "upholstery",
  "himchistka-kovrolina": "carpet",
  "himchistka-shtor": "curtain",
  "chistka-pola": "floor",
  "chistka-bruschatki": "paving",
  "obespilivanie-ferm": "industrial",
  "moyka-okon": "windows",
  "klining-transporta": "transport",
  "klining-neftebaz": "fuel",
  "klining-transportnoy-infrastruktury": "terminal",
  "uborka-detskih-uchrezhdeniy": "school",
  "uborka-posle-meropriyatiy": "event",
  "uborka-oteley": "hotel",
  "uborka-gosuchrezhdeniy": "government"
};

function makeServiceVisuals(service: Service): ServiceVisuals {
  const photoSetKey = servicePhotoSetBySlug[service.slug];
  if (!photoSetKey) return {};

  const photos = servicePhotoSets[photoSetKey];

  return {
    heroCover: photos[0],
    pricingSectionImage: photos[1],
    whyUsSplitImage: photos[2],
    gallery: photos.map((src, index) => ({
      src,
      alt: `${service.title}: фото ${index + 1}`
    }))
  };
}

const baseServices: Service[] = [
  {
    slug: "uborka-ofisov",
    title: "Уборка офисов",
    shortTitle: "Офисы",
    genitive: "уборки офисов",
    description: "Регулярная и разовая уборка офисов, бизнес-центров и административных помещений по чек-листу и графику.",
    icon: Building2,
    includes: ["рабочие зоны и переговорные", "санузлы и кухни", "полы, стеклянные поверхности, мебель", "расходники и контроль замечаний"],
    priceFrom: "от 46 руб/м2",
    factors: [
      "площадь",
      "график",
      "количество санузлов",
      "расходные материалы",
      "требования к отчетности",
      "доступ и пропускной режим"
    ],
    audience: [
      {
        title: "Бизнес-центры и класс А/В",
        text: "Переговорные, open space, ресепшн — единый чек-лист по этажам."
      },
      {
        title: "Филиалы и многоэтажные офисы",
        text: "Утро или вечер без шума в рабочие часы — согласованные окна доступа."
      },
      {
        title: "Коворкинги и смешанные форматы",
        text: "МОП, кухни и санузлы в часы пик — расходники и частота по потоку людей."
      }
    ],
    clientResults: [
      ["Было: переговорные не готовы к визитам", "Стало: приёмка зон встреч и ресепшена по графику"],
      ["Было: нагрузка на санузлы в пик", "Стало: регламент и смена расходников под поток сотрудников"],
      ["Было: жалобы на общие зоны и кухню", "Стало: зона ответственности и закрытие замечаний через менеджера"],
      ["Было: разный уровень чистоты по этажам", "Стало: единый стандарт и контрольные обходы с фиксацией"]
    ],
    faqExtra: [
      {
        question: "Можно ли уборку до 9:00 или после 18:00?",
        answer:
          "Да. Согласуем окна под ваш график: утренний день, вечер или выходные, чтобы не мешать сотрудникам."
      },
      {
        question: "Чьи расходники — ваши или на стороне клиента?",
        answer:
          "По договору: можем вести поставки сами или работать с вашим запасом. Фиксируем в смете, чтобы закупки видели прозрачные условия."
      },
      {
        question: "Как быстро подменяют сотрудника, если клинер не вышел?",
        answer:
          "Есть резерв и закреплённый менеджер объекта — время реакции прописываем в приложении к договору или SLA."
      }
    ],
    heroCover: "/foto1.webp",
    pricingSectionImage: "/foto2.webp",
    whyUsSplitImage: "/foto3.webp"
  },
  {
    slug: "uborka-proizvodstva",
    title: "Уборка производственных помещений",
    shortTitle: "Производства",
    genitive: "уборки производственных помещений",
    description: "Клининг цехов, заводов и технических зон с учетом регламентов безопасности, СанПиН и графика предприятия.",
    icon: Factory,
    includes: ["обеспыливание поверхностей", "очистка полов и технических зон", "работа около оборудования", "допуск и инструктаж бригады"],
    priceFrom: "от 120 руб/м2",
    factors: ["тип загрязнений", "доступ к зонам", "высота работ", "требования охраны труда", "срочность"]
  },
  {
    slug: "uborka-skladov",
    title: "Уборка складов",
    shortTitle: "Склады",
    genitive: "уборки складов",
    description: "Уборка складов, фулфилментов, хабов и логистических центров без срыва операционного графика.",
    icon: Warehouse,
    includes: ["наливные полы и стеллажные зоны", "погрузочные зоны", "санузлы и бытовые помещения", "прилегающая территория"],
    priceFrom: "от 45 руб/м2",
    factors: ["площадь", "тип покрытия", "плотность стеллажей", "режим доступа", "наличие техники"]
  },
  {
    slug: "generalnaya-uborka",
    title: "Генеральная уборка",
    shortTitle: "Генеральная",
    genitive: "генеральной уборки",
    description: "Глубокая уборка коммерческих объектов перед проверкой, открытием, передачей помещения или после интенсивной эксплуатации.",
    icon: ClipboardCheck,
    includes: ["глубокая очистка полов", "санузлы и кухни", "стекло и зеркала", "труднодоступные зоны"],
    priceFrom: "от 82 руб/м2",
    factors: ["состояние объекта", "высота потолков", "срочность", "химия", "объем ручных работ"]
  },
  {
    slug: "uborka-posle-remonta",
    title: "Уборка после ремонта",
    shortTitle: "После ремонта",
    genitive: "уборки после ремонта",
    description: "Финальная уборка после ремонта и строительства: удаление пыли, следов материалов, подготовка к эксплуатации.",
    icon: FileCheck2,
    includes: ["удаление строительной пыли", "отмывка пола и стекла", "удаление скотча и следов материалов", "подготовка к приемке"],
    priceFrom: "от 120 руб/м2",
    factors: ["объем пыли", "следы краски и цемента", "высотные зоны", "сроки сдачи", "вывоз мусора"]
  },
  {
    slug: "uborka-torgovyh-setey",
    title: "Уборка торговых сетей и ТЦ",
    shortTitle: "Торговые сети",
    genitive: "уборки торговых сетей",
    description: "Клининг магазинов, торговых центров и ритейл-сетей по единому стандарту во всех точках присутствия.",
    icon: ShoppingBag,
    includes: ["торговые залы и витрины", "прикассовые зоны и примерочные", "санузлы и подсобные помещения", "входные группы и прилегающая территория"],
    priceFrom: "от 38 руб/м2",
    factors: ["площадь и количество точек", "график работы магазина", "тип покрытия полов", "требования сети", "частота уборок"]
  },
  {
    slug: "uborka-promoborudovaniya",
    title: "Клининг промышленного оборудования",
    shortTitle: "Промоборудование",
    genitive: "клининга промышленного оборудования",
    description: "Очистка станков, линий, конвейеров и технологического оборудования без остановки производства или в плановое окно.",
    icon: Cog,
    includes: ["очистка наружных поверхностей оборудования", "удаление масляных и технологических загрязнений", "обработка труднодоступных зон", "работа в соответствии с регламентом ТБ"],
    priceFrom: "от 150 руб/м2",
    factors: ["тип загрязнений", "доступность зон", "требования охраны труда", "плановое или срочное окно", "химия под материал"]
  },
  {
    slug: "uborka-zhk",
    title: "Уборка ЖК, МКД и ТСЖ",
    shortTitle: "ЖК и МКД",
    genitive: "уборки ЖК и МКД",
    description: "Регулярный клининг подъездов, лифтов, МОП и прилегающих территорий жилых комплексов по графику ТСЖ или УК.",
    icon: Home,
    includes: ["подъезды и лестничные марши", "лифтовые кабины и холлы", "мусоропроводы и технические помещения", "прилегающая территория и парковка"],
    priceFrom: "от 28 руб/м2",
    factors: ["количество подъездов и этажей", "наличие лифтов", "частота уборок", "состояние МОП", "наличие мусоропровода"]
  },
  {
    slug: "uborka-restoranov-kafe",
    title: "Уборка ресторанов, кафе и столовых",
    shortTitle: "Рестораны и кафе",
    genitive: "уборки ресторанов и кафе",
    description: "Клининг кухонных зон, залов и подсобных помещений общепита с соблюдением требований СанПиН и без срыва работы заведения.",
    icon: UtensilsCrossed,
    includes: ["кухня и зоны приготовления пищи", "обеденный зал и барная стойка", "санузлы для гостей и персонала", "холодильные камеры и подсобные помещения"],
    priceFrom: "от 65 руб/м2",
    factors: ["площадь кухни и зала", "загрязнённость жира и нагара", "тип покрытий", "требования СанПиН", "время окна уборки"]
  },
  {
    slug: "uborka-oteley",
    title: "Уборка отелей и гостиниц",
    shortTitle: "Отели",
    genitive: "уборки отелей и гостиниц",
    description: "Ежедневная уборка номерного фонда, ресепшен, ресторанов и общественных зон отеля по стандарту объекта.",
    icon: BedDouble,
    includes: ["номера и апартаменты", "ресепшен и холлы", "конференц-залы и SPA-зоны", "рестораны и служебные помещения"],
    priceFrom: "от 55 руб/м2",
    factors: ["номерной фонд и загрузка", "класс объекта", "стандарт отеля", "частота и время уборки", "расходные материалы"]
  },
  {
    slug: "uborka-medcentrov",
    title: "Уборка медицинских центров",
    shortTitle: "Медцентры",
    genitive: "уборки медицинских центров",
    description: "Клининг клиник, больниц, лабораторий и стоматологий с соблюдением СанПиН, протоколов дезинфекции и требований Роспотребнадзора.",
    icon: Stethoscope,
    includes: ["кабинеты врачей и манипуляционные", "операционные и процедурные зоны", "коридоры, ресепшен и санузлы", "дезинфекция по протоколу объекта"],
    priceFrom: "от 90 руб/м2",
    factors: ["класс чистоты зон", "требования СанПиН", "протокол дезинфекции", "расходные материалы", "частота обработки"]
  },
  {
    slug: "uborka-fulfilmentov",
    title: "Клининг фулфилментов и дарксторов",
    shortTitle: "Фулфилменты",
    genitive: "клининга фулфилментов",
    description: "Уборка фулфилментов, дарксторов и сортировочных центров без остановки операционных процессов, по согласованному окну.",
    icon: Package,
    includes: ["зоны хранения и стеллажи", "конвейерные и сортировочные линии", "зоны упаковки и отгрузки", "санузлы и бытовые помещения"],
    priceFrom: "от 42 руб/м2",
    factors: ["площадь и плотность стеллажей", "окно для уборки", "тип полов", "режим работы объекта", "количество смен"]
  },
  {
    slug: "uborka-sportivnyh-obyektov",
    title: "Уборка спортивных объектов",
    shortTitle: "Спортобъекты",
    genitive: "уборки спортивных объектов",
    description: "Клининг спортзалов, стадионов, фитнес-клубов и бассейнов с учётом специфики покрытий и санитарных требований.",
    icon: Dumbbell,
    includes: ["спортивные залы и покрытия", "раздевалки, душевые и санузлы", "трибуны и зрительские зоны", "административные и технические помещения"],
    priceFrom: "от 50 руб/м2",
    factors: ["тип покрытия", "загрузка объекта", "площадь трибун", "частота уборок", "специальная химия под покрытие"]
  },
  {
    slug: "uborka-saun-basseynov",
    title: "Уборка бань, саун и бассейнов",
    shortTitle: "Бани и бассейны",
    genitive: "уборки бань, саун и бассейнов",
    description: "Клининг парных, бассейнов, хамамов и спа-зон с применением специализированной химии против плесени, грибка и известкового налёта.",
    icon: Droplets,
    includes: ["бассейны и чаши", "парные и хамамы", "душевые и раздевалки", "зоны отдыха и бары"],
    priceFrom: "от 75 руб/м2",
    factors: ["тип покрытия и материалов", "состояние объекта", "химия против плесени и грибка", "площадь водных зон", "частота уборок"]
  },
  {
    slug: "uborka-parkingov",
    title: "Клининг паркингов",
    shortTitle: "Паркинги",
    genitive: "клининга паркингов",
    description: "Уборка подземных и надземных паркингов, парковочных зон ТЦ и ЖК — удаление масляных пятен, пыли и технических загрязнений.",
    icon: Car,
    includes: ["проезды и парковочные места", "въездные группы и пандусы", "технические зоны и коммуникации", "лифтовые холлы и лестницы"],
    priceFrom: "от 35 руб/м2",
    factors: ["тип покрытия", "степень загрязнённости", "площадь и этажность", "режим работы", "наличие дренажных систем"]
  },
  {
    slug: "uborka-fasadov-okon",
    title: "Клининг фасадов и окон",
    shortTitle: "Фасады и окна",
    genitive: "клининга фасадов и окон",
    description: "Мойка фасадов, витражей, панорамных окон и входных групп — промышленный альпинизм, телескопические системы или автовышка.",
    icon: Layers,
    includes: ["мойка фасадного остекления", "очистка вентилируемых фасадов", "обработка входных групп и козырьков", "удаление высолов и загрязнений с кирпича"],
    priceFrom: "от 80 руб/м2",
    factors: ["высота и этажность", "тип фасада и остекления", "степень загрязнённости", "метод работы", "доступность зон"]
  },
  {
    slug: "uborka-posle-pozhara",
    title: "Уборка после пожара",
    shortTitle: "После пожара",
    genitive: "уборки после пожара",
    description: "Экстренный клининг после пожара: удаление сажи, копоти и запаха, дезинфекция, подготовка к ремонту или страховой оценке.",
    icon: Flame,
    includes: ["удаление сажи и копоти", "нейтрализация запаха дыма", "очистка поверхностей и конструкций", "вывоз мусора и пострадавших предметов"],
    priceFrom: "расчёт после осмотра",
    factors: ["площадь поражения", "степень задымления", "тип загрязнений", "срочность", "требования страховой"]
  },
  {
    slug: "uborka-posle-potopa",
    title: "Уборка после потопа и прорыва канализации",
    shortTitle: "После потопа",
    genitive: "уборки после потопа",
    description: "Экстренное устранение последствий затопления: откачка воды, сушка, дезинфекция и устранение запаха канализации.",
    icon: CloudRain,
    includes: ["откачка и удаление воды", "просушка поверхностей", "дезинфекция и устранение запаха", "вывоз повреждённых материалов"],
    priceFrom: "расчёт после осмотра",
    factors: ["площадь затопления", "источник воды", "степень повреждений", "срочность выезда", "требования страховой"]
  },
  {
    slug: "himchistka-kinoteatrov",
    title: "Химчистка кинотеатров",
    shortTitle: "Кинотеатры",
    genitive: "химчистки кинотеатров",
    description: "Профессиональная химчистка кресел, ковровых покрытий и мягких поверхностей кинозалов без демонтажа и срыва расписания.",
    icon: Film,
    includes: ["кресла и мягкая обивка залов", "ковровые покрытия проходов", "подлокотники и поверхности", "санузлы и фойе"],
    priceFrom: "от 300 руб/кресло",
    factors: ["количество залов и кресел", "степень загрязнённости", "тип обивки", "окно для уборки", "дополнительные зоны"]
  },
  {
    slug: "himchistka-myagkoy-mebeli",
    title: "Химчистка мягкой мебели",
    shortTitle: "Химчистка мебели",
    genitive: "химчистки мягкой мебели",
    description: "Выездная химчистка диванов, кресел, стульев и офисных кресел на объекте — без вывоза, с сушкой и дезодорацией.",
    icon: Sofa,
    includes: ["диваны и кресла", "офисные стулья и кресла", "банкетки и пуфы", "дезодорация и защитное покрытие"],
    priceFrom: "от 600 руб/единица",
    factors: ["количество единиц", "тип обивки", "степень загрязнённости", "наличие пятен", "защитная пропитка"]
  },
  {
    slug: "himchistka-kovrolina",
    title: "Химчистка ковролина и ковров",
    shortTitle: "Химчистка ковролина",
    genitive: "химчистки ковролина",
    description: "Глубокая чистка ковролина и ковровых покрытий на объекте — экстракция, пятновыведение, дезодорация без демонтажа.",
    icon: Layers,
    includes: ["экстракционная чистка ковролина", "пятновыведение", "дезодорация и антибактериальная обработка", "сушка на месте"],
    priceFrom: "от 120 руб/м2",
    factors: ["площадь", "тип ворса", "степень загрязнённости", "наличие сложных пятен", "требования к сушке"]
  },
  {
    slug: "himchistka-shtor",
    title: "Химчистка штор и занавесей",
    shortTitle: "Химчистка штор",
    genitive: "химчистки штор",
    description: "Выездная химчистка штор, ламбрекенов и текстиля на объекте — с карниза или с демонтажем, зависит от типа крепления.",
    icon: Wind,
    includes: ["чистка штор без снятия", "химчистка после демонтажа", "рольшторы и жалюзи", "возврат и навеска"],
    priceFrom: "от 200 руб/м2",
    factors: ["тип ткани", "площадь полотна", "тип загрязнений", "необходимость демонтажа", "срочность"]
  },
  {
    slug: "chistka-pola",
    title: "Глубокая чистка пола",
    shortTitle: "Чистка пола",
    genitive: "глубокой чистки пола",
    description: "Кристаллизация, полировка, шлифовка и глубокая чистка бетонных, мраморных, керамогранитных и полимерных полов.",
    icon: Layers,
    includes: ["кристаллизация мрамора и камня", "шлифовка и полировка бетонных полов", "чистка швов и пористых покрытий", "нанесение защитного покрытия"],
    priceFrom: "от 100 руб/м2",
    factors: ["тип покрытия", "площадь", "степень износа", "требуемый уровень блеска", "защитное покрытие"]
  },
  {
    slug: "chistka-bruschatki",
    title: "Чистка брусчатки и тротуарной плитки",
    shortTitle: "Брусчатка и плитка",
    genitive: "чистки брусчатки",
    description: "Мойка под давлением, удаление мха, высолов и масляных пятен с брусчатки, тротуарной плитки и уличных покрытий.",
    icon: Layers,
    includes: ["мойка под высоким давлением", "удаление мха, лишайника и высолов", "обработка масляных пятен", "нанесение защитной пропитки"],
    priceFrom: "от 60 руб/м2",
    factors: ["площадь", "тип покрытия", "степень загрязнённости", "наличие мха и высолов", "защитная пропитка"]
  },
  {
    slug: "obespilivanie-ferm",
    title: "Обеспыливание ферм и коммуникаций",
    shortTitle: "Обеспыливание",
    genitive: "обеспыливания ферм и коммуникаций",
    description: "Промышленное обеспыливание металлоконструкций, ферм, воздуховодов и коммуникаций на высоте — без остановки производства.",
    icon: Wind,
    includes: ["фермы и металлоконструкции", "воздуховоды и вентиляционные системы", "кабельные лотки и коммуникации", "высотные работы до 30 м"],
    priceFrom: "от 180 руб/м2",
    factors: ["высота работ", "площадь конструкций", "тип загрязнений", "доступность зон", "требования ТБ"]
  },
  {
    slug: "moyka-okon",
    title: "Мойка окон и балконов",
    shortTitle: "Мойка окон",
    genitive: "мойки окон и балконов",
    description: "Профессиональная мойка окон, витражей, балконов и лоджий — телескопические системы, механизированная мойка или промальп.",
    icon: Layers,
    includes: ["мойка стеклопакетов снаружи и внутри", "очистка рам и подоконников", "балконы и лоджии", "витражи и входные группы"],
    priceFrom: "от 50 руб/м2",
    factors: ["этажность", "количество окон", "тип рам", "степень загрязнённости", "метод мойки"]
  },
  {
    slug: "klining-transporta",
    title: "Клининг транспорта",
    shortTitle: "Транспорт",
    genitive: "клининга транспорта",
    description: "Профессиональная уборка автобусов, поездов, самолётов, яхт и катеров — салонов, служебных зон и технических помещений.",
    icon: Bus,
    includes: ["пассажирский салон и кресла", "служебные и технические зоны", "санузлы и галлеи", "химчистка обивки и ковровых покрытий"],
    priceFrom: "расчёт по единице транспорта",
    factors: ["тип и класс транспорта", "количество единиц", "степень загрязнённости", "окно для уборки", "периодичность"]
  },
  {
    slug: "klining-neftebaz",
    title: "Клининг нефтебаз и АЗС",
    shortTitle: "Нефтебазы и АЗС",
    genitive: "клининга нефтебаз и АЗС",
    description: "Очистка территорий АЗС, нефтебаз и промышленных площадок от нефтепродуктов с соблюдением требований пожарной безопасности.",
    icon: Fuel,
    includes: ["очистка заправочных островков", "удаление нефтепродуктов с покрытий", "мойка резервуарных площадок", "уборка операторских и технических помещений"],
    priceFrom: "расчёт после осмотра",
    factors: ["тип объекта", "площадь загрязнения", "тип нефтепродуктов", "требования пожарной безопасности", "периодичность"]
  },
  {
    slug: "klining-transportnoy-infrastruktury",
    title: "Клининг аэропортов, вокзалов и метро",
    shortTitle: "Транспортная инфраструктура",
    genitive: "клининга транспортной инфраструктуры",
    description: "Уборка аэропортов, железнодорожных вокзалов, автостанций и объектов метро — круглосуточно, без остановки пассажиропотока.",
    icon: Plane,
    includes: ["залы ожидания и терминалы", "перроны и платформы", "санузлы и служебные помещения", "эскалаторы, лифты и переходы"],
    priceFrom: "расчёт по объекту",
    factors: ["пассажиропоток", "площадь и этажность", "режим работы", "требования безопасности", "количество смен"]
  },
  {
    slug: "uborka-detskih-uchrezhdeniy",
    title: "Уборка детских садов и школ",
    shortTitle: "Детские учреждения",
    genitive: "уборки детских учреждений",
    description: "Клининг детских садов, школ и образовательных центров с использованием гипоаллергенной химии, сертифицированной для детских учреждений.",
    icon: School,
    includes: ["классы и игровые комнаты", "коридоры и рекреации", "столовые и кухни", "санузлы и раздевалки"],
    priceFrom: "от 55 руб/м2",
    factors: ["площадь и количество кабинетов", "требования СанПиН", "гипоаллергенная химия", "периодичность", "наличие пищеблока"]
  },
  {
    slug: "uborka-posle-meropriyatiy",
    title: "Уборка после мероприятий",
    shortTitle: "После мероприятий",
    genitive: "уборки после мероприятий",
    description: "Экспресс-уборка после корпоративов, конференций, выставок и концертов — выезд сразу после окончания, сдача площадки в срок.",
    icon: CalendarDays,
    includes: ["уборка залов и сцены", "вывоз мусора и посуды", "санузлы и фойе", "прилегающая территория"],
    priceFrom: "от 45 руб/м2",
    factors: ["площадь и тип мероприятия", "объём мусора", "срок сдачи площадки", "количество персонала", "ночная работа"]
  },
  {
    slug: "uborka-gosuchrezhdeniy",
    title: "Уборка госучреждений",
    shortTitle: "Госучреждения",
    genitive: "уборки госучреждений",
    description: "Клининг административных зданий, судов, МФЦ, налоговых и других госструктур — полный пакет документов, работа с НДС и тендерами.",
    icon: Landmark,
    includes: ["кабинеты и приёмные", "залы ожидания и коридоры", "санузлы и технические помещения", "входные группы и прилегающая территория"],
    priceFrom: "от 50 руб/м2",
    factors: ["площадь и этажность", "режим доступа", "тендерные требования", "пакет документов", "работа с НДС"]
  }
];

export const services: Service[] = baseServices.map((service) => ({
  ...service,
  ...makeServiceVisuals(service)
}));

export const extraServices = [
  {
    slug: "sanitarnaya-obrabotka",
    title: "Санитарная обработка",
    description: "Конфиденциальное восстановление помещения после биологического загрязнения и несчастного случая."
  },
  {
    slug: "pishchevye-proizvodstva",
    title: "Пищевые производства",
    description: "Клининг зон пищевого производства с учетом HACCP, GMP и СанПиН."
  },
  {
    slug: "autsorsing-personala",
    title: "Аутсорсинг персонала",
    description: "Подбор, вывод и замена уборочного персонала под регламент объекта."
  }
];

export const segments = [
  { title: "Офисы и БЦ", icon: Building2 },
  { title: "Торговые сети и ТЦ", icon: ShoppingBag },
  { title: "Склады и фулфилменты", icon: Warehouse },
  { title: "Производства и заводы", icon: Factory },
  { title: "Медицинские центры", icon: ShieldCheck },
  { title: "ЖК, МКД и паркинги", icon: MapPin },
  { title: "После ремонта, пожара, затопления и ЧП", icon: BadgeCheck },
  { title: "Рестораны, кафе, столовые", icon: UtensilsCrossed }
];

export type CaseStudy = {
  slug: string;
  company: string;
  title: string;
  metric: string;
  result: string;
  serviceSlug: string;
  citySlug: string;
  /** Коротко: задача / сложности / решение — для страницы кейса */
  task?: string;
  challenge?: string;
  solution?: string;
  quote?: string;
};

export const cases: CaseStudy[] = [
  {
    slug: "yandex-market-sortcenter",
    company: "Яндекс.Маркет",
    title: "Ежедневная уборка сортировочного центра",
    metric: "36 000 м2",
    result: "15 клинеров работают по графику без остановки операционных процессов.",
    serviceSlug: "uborka-skladov",
    citySlug: "ekaterinburg",
    task: "Поддерживать чистоту сортировочного центра без остановки потока заказов.",
    challenge: "Круглосуточная работа склада, строгие окна для уборки между сменами.",
    solution: "Закреплённые бригады по графику, чек-листы по зонам, резерв на срочный выезд.",
    quote: "График не срывается даже в пиковые дни — это было ключевым критерием тендера."
  },
  {
    slug: "zolla-set",
    company: "Zolla",
    title: "Уборка сети магазинов",
    metric: "1 350 уборок/мес",
    result: "160 клинеров и 52 мобильные бригады в нескольких федеральных округах.",
    serviceSlug: "uborka-ofisov",
    citySlug: "chelyabinsk",
    task: "Единый стандарт уборки в торговых точках в разных городах.",
    challenge: "Разный формат магазинов и расписание работы торговых залов.",
    solution: "Единый регламент сети, мобильные бригады и контроль качества по чек-листам.",
    quote: "Нам нужна была предсказуемость — получили её по цифрам и отчётности."
  },
  {
    slug: "mts-offices",
    company: "МТС",
    title: "Офисы и прилегающая территория",
    metric: "15 400 м2",
    result: "70 клинеров, приемка по графику и закрывающие документы.",
    serviceSlug: "uborka-ofisov",
    citySlug: "ekaterinburg",
    task: "Регулярная уборка офисных блоков и прилегающей территории.",
    challenge: "Высокая проходимость, требования к безопасности и документообороту.",
    solution: "Закреплённые команды, акты и ЭДО, служебные записки для доступа на объект.",
    quote: "Документы всегда в срок — для нас это так же важно, как качество уборки."
  },
  {
    slug: "biznes-park-tyumen",
    company: "Бизнес-парк",
    title: "Офисный блок и общие зоны БЦ",
    metric: "9 200 м2",
    result: "График до открытия и после 18:00 без помех арендаторам; акты и обходы по чек-листу.",
    serviceSlug: "uborka-ofisov",
    citySlug: "tyumen",
    task: "Поддерживать единый вид этажей, переговорных и МОП при высокой заполняемости.",
    challenge: "Разный режим арендаторов и ограничения по шуму в рабочее время.",
    solution: "Утренний и вечерний слоты, закреплённые бригады по этажам, расходники по регламенту.",
    quote: "АХО перестало тратить время на разбор жалоб по чистоте общих зон."
  }
];

/** Рубрики и статьи блога (заголовки и описания — черновики для вёрстки) */
export type BlogPostMeta = {
  slug: string;
  title: string;
  rubric: string;
  excerpt: string;
  date: string;
  author: string;
};

export const blogPosts: BlogPostMeta[] = [
  {
    slug: "kak-vybrat-kliningovogo-podryadchika-dlya-biznesa",
    rubric: "Закупки",
    title: "Как выбрать клинингового подрядчика для бизнеса",
    excerpt: "Чек-лист для АХО и закупок: договор, регламент, резерв персонала и акты.",
    date: "2026-04-12",
    author: "Команда Mister FAPC"
  },
  {
    slug: "sla-v-klininge-prostymi-slovami",
    rubric: "Стандарты",
    title: "SLA в клининге простыми словами",
    excerpt: "Что фиксируем в приложении к договору: время реакции, приёмка и ответственность.",
    date: "2026-04-28",
    author: "Команда Mister FAPC"
  },
  {
    slug: "dokumenty-dlya-tendera-na-klining",
    rubric: "Тендеры",
    title: "Документы для тендера на клининг: минимальный пакет",
    excerpt: "44-ФЗ / 223-ФЗ: что приложить к заявке и как не потерять баллы по формальным признакам.",
    date: "2026-05-03",
    author: "Команда Mister FAPC"
  }
];

/** FAQ с категориями для страницы /faq/ */
export type FaqCategoryId = "dogovor" | "uslugi" | "personal" | "kachestvo" | "tseny";

export type FaqItemCategorized = {
  question: string;
  answer: string;
  category: FaqCategoryId;
};

export const faqsCategorized: FaqItemCategorized[] = [
  {
    category: "tseny",
    question: "Можно ли получить расчет без выезда?",
    answer:
      "Предварительный диапазон дадим по площади, типу объекта и задаче. Точную смету фиксируем после бесплатного осмотра, чтобы не закладывать скрытые доплаты."
  },
  {
    category: "dogovor",
    question: "Работаете с юридическими лицами и ЭДО?",
    answer:
      "Да. Готовим договор, КП, смету, акты и при необходимости работаем через ЭДО. Формат НДС или без НДС согласуется перед договором."
  },
  {
    category: "personal",
    question: "Что происходит, если клинер не вышел?",
    answer:
      "За объектом закреплены бригадир и менеджер. При невыходе подключается кадровый резерв или мобильная бригада, чтобы график не сорвался."
  },
  {
    category: "uslugi",
    question: "Можно ли работать ночью или в выходные?",
    answer: "Да. Для объектов с плотным рабочим графиком ставим ночные, выходные или праздничные смены."
  },
  {
    category: "dogovor",
    question: "Как проходит оплата?",
    answer:
      "В типовом договоре возможна оплата после приёмки работ по акту. Условия и отсрочка согласуются до подписания и отражаются в договоре."
  },
  {
    category: "kachestvo",
    question: "Как принимается уборка?",
    answer:
      "По чек-листу объекта и визуальному контролю. Замечания фиксируются и закрываются в согласованные сроки; повторная приёмка — по необходимости."
  },
  {
    category: "kachestvo",
    question: "Есть ли страхование?",
    answer:
      "Ответственность подрядчика может быть застрахована; условия указываются в договоре и приложениях. Запросите актуальную редакцию у менеджера."
  },
  {
    category: "uslugi",
    question: "Работаете ли по СанПиН и на медобъектах?",
    answer:
      "Да, состав работ и химия подбираются под класс помещения и требования регуляторики. Регламент согласуем до старта."
  },
  {
    category: "personal",
    question: "Можно ли заменить сотрудника по запросу?",
    answer:
      "Да. При систематических замечаниях или несоответствии регламенту инициируем замену через кадровый резерв."
  },
  {
    category: "tseny",
    question: "Почему в смете разные ставки за м²?",
    answer:
      "Ставка зависит от типа покрытий, загрязнённости, графика, высоты работ, расходников и требований к отчётности. После осмотра даём единую понятную смету."
  },
  {
    category: "dogovor",
    question: "Можно ли расторгнуть договор?",
    answer:
      "Условия расторжения и уведомления прописываются в договоре. Обсудите с менеджером нужный формат — долгосрочный или проектный."
  },
  {
    category: "kachestvo",
    question: "Кто контролирует качество на объекте?",
    answer:
      "Бригадир на смене, закреплённый менеджер клиента и отдел контроля качества при плановых и внеплановых аудитах."
  }
];

export const advantages = [
  "Закрепляем бригадира, менеджера и руководителя за объектом.",
  "Подбираем химию после клинтеста под поверхность, загрязнения и бюджет.",
  "Готовим смету, КП, договор, акты и тендерную документацию.",
  "Работаем с НДС и без, через ЭДО и оплату после приемки.",
  "Быстро заменяем сотрудников при невыходе, болезни или отпуске.",
  "Выходим на разовые и срочные объекты мобильными бригадами."
];

export const risks = [
  { title: "Срыв графика уборки", desc: "Закреплённая бригада и кадровый резерв — выход в срок даже при болезни сотрудника" },
  { title: "Жалобы сотрудников и арендаторов", desc: "Чек-листы по каждой зоне и фотоотчёт после каждой смены" },
  { title: "Скрытые доплаты в смете", desc: "Фиксированная цена в договоре — никаких «по факту» и неожиданных счетов" },
  { title: "Отсутствие отчётности и актов", desc: "Договор, КП, акты, ЭДО — полный пакет документов для бухгалтерии" },
  { title: "Неподходящая химия для поверхностей", desc: "Клинтест материалов перед стартом, паспорта безопасности на все средства" },
  { title: "Проблемы перед проверкой или открытием", desc: "Срочный выезд в день обращения, работаем ночью и в выходные" },
  { title: "Порча имущества и отделки", desc: "Страховка на весь период работ, компенсация в рамках договора" },
  { title: "Текучка персонала подрядчика", desc: "Постоянный состав команды — не разовые исполнители, а закреплённые сотрудники" }
];

/** Короткий список для превью (главная, хабы) — первые пункты из полного FAQ */
export const faqs = faqsCategorized.slice(0, 4).map(({ question, answer }) => ({ question, answer }));

export const processSteps = [
  {
    title: "Звонок или заявка",
    desc: "Позвоните, напишите или оставьте форму — уточним задачу и запишем на выезд"
  },
  {
    title: "Бесплатный выезд с командой",
    desc: "Менеджер приезжает на объект, проводит клинтест и подбирает химию под ваши поверхности"
  },
  {
    title: "Цена сразу на месте",
    desc: "После осмотра называем финальную стоимость — без «уточним позже» и скрытых доплат"
  },
  {
    title: "Договор, смета и КП",
    desc: "Фиксируем объём и цену. За вами закрепляется персональный менеджер"
  },
  {
    title: "Старт и обкатка команды",
    desc: "Выходим на объект. При долгосрочном сотрудничестве подбираем и закрепляем постоянный состав"
  },
  {
    title: "Приёмка без замечаний",
    desc: "Уборщики присутствуют при сдаче — любые недочёты устраняем сразу, подписываем акты"
  }
];

export const reviews = [
  {
    name: "Алексей Воронов",
    role: "Директор по АХО, ТЦ «Гринвич»",
    text: "Работаем с Mister FAPC уже третий год. Команда стабильная, замечания по чек-листу закрываются в тот же день. Ни разу не подвели перед проверкой.",
    rating: 5
  },
  {
    name: "Марина Соколова",
    role: "Управляющий, складской комплекс",
    text: "Переходили с другого подрядчика — разница заметна сразу. Чёткий договор, фиксированная цена, менеджер на связи. Рекомендую для крупных площадей.",
    rating: 5
  },
  {
    name: "Дмитрий Кравцов",
    role: "Технический директор, производство",
    text: "Клинтест перед стартом — это то, чего раньше никто не делал. Химию подобрали под наши поверхности, никакого вреда оборудованию.",
    rating: 5
  }
];

export const reviewPlatforms = [
  { name: "Яндекс.Карты", rating: "4.9", url: "https://yandex.ru/profile/144385794281?lang=ru" },
  { name: "ВК", rating: "4.9", url: "https://vk.com/reviews-114828304" },
  { name: "2GIS", rating: "4.9", url: "https://2gis.ru/ekaterinburg/geo/70000001060043194" }
];

export function getCity(slug: string) {
  return cities.find((city) => city.slug === slug);
}

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export const IconUsers = UsersRound;
export const IconTruck = Truck;
