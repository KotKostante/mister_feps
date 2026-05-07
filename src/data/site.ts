import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Building2,
  ClipboardCheck,
  Factory,
  FileCheck2,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Truck,
  UsersRound,
  Warehouse
} from "lucide-react";

export type City = {
  slug: string;
  name: string;
  prepositional: string;
  genitive: string;
  address: string;
  phone: string;
  area: string;
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
};

export const brand = {
  name: "Mister FAPC",
  legalName: "ИП Зубкова",
  email: "info@mister-fapc.com",
  mainPhone: "+7 (343) 357-91-21",
  domain: "https://mister-fapc.ru"
};

export const trustStats = [
  { value: "12 лет", label: "на рынке клининга" },
  { value: "97%", label: "клиентов обращаются повторно" },
  { value: "420", label: "сотрудников в команде" },
  { value: "1 250 000 м2", label: "площадей в работе" }
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
    note: "TODO: подтвердить актуальный адрес: Чайковского 56 или Чайковского 11 офис 505."
  },
  {
    slug: "perm",
    name: "Пермь",
    prepositional: "Перми",
    genitive: "Перми",
    address: "Куйбышева 37",
    phone: "+7 (342) 255-46-67",
    area: "Пермь и Пермский край"
  },
  {
    slug: "chelyabinsk",
    name: "Челябинск",
    prepositional: "Челябинске",
    genitive: "Челябинска",
    address: "Елькина 61А",
    phone: "+7 (351) 225-61-59",
    area: "Челябинск и область"
  },
  {
    slug: "tyumen",
    name: "Тюмень",
    prepositional: "Тюмени",
    genitive: "Тюмени",
    address: "Одесская 48а",
    phone: "+7 (3452) 69-23-68",
    area: "Тюмень и область"
  },
  {
    slug: "novosibirsk",
    name: "Новосибирск",
    prepositional: "Новосибирске",
    genitive: "Новосибирска",
    address: "Красный проспект 30",
    phone: "+7 (383) 242-72-89",
    area: "Новосибирск и область"
  },
  {
    slug: "nizhny-tagil",
    name: "Нижний Тагил",
    prepositional: "Нижнем Тагиле",
    genitive: "Нижнего Тагила",
    address: "Черноисточинское ш. 65",
    phone: "+7 (3435) 37-08-28",
    area: "Нижний Тагил и область"
  },
  {
    slug: "lipetsk",
    name: "Липецк",
    prepositional: "Липецке",
    genitive: "Липецка",
    address: "Ферросплавная 2а",
    phone: "+7 (4742) 54-50-27",
    area: "Липецк и область"
  },
  {
    slug: "irkutsk",
    name: "Иркутск",
    prepositional: "Иркутске",
    genitive: "Иркутска",
    address: "Байкальская 236/1",
    phone: "+7 (3952) 78-84-79",
    area: "Иркутск и область"
  }
];

export const primaryCitySlugs = ["ekaterinburg", "perm", "chelyabinsk"];

export const services: Service[] = [
  {
    slug: "uborka-ofisov",
    title: "Уборка офисов",
    shortTitle: "Офисы",
    genitive: "уборки офисов",
    description: "Регулярная и разовая уборка офисов, бизнес-центров и административных помещений по чек-листу и графику.",
    icon: Building2,
    includes: ["рабочие зоны и переговорные", "санузлы и кухни", "полы, стеклянные поверхности, мебель", "расходники и контроль замечаний"],
    priceFrom: "от 46 руб/м2",
    factors: ["площадь", "график", "количество санузлов", "расходные материалы", "требования к отчетности"]
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
  }
];

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
  { title: "После ремонта, пожара, затопления и ЧП", icon: BadgeCheck }
];

export const cases = [
  {
    company: "Яндекс.Маркет",
    title: "Ежедневная уборка сортировочного центра",
    metric: "36 000 м2",
    result: "15 клинеров работают по графику без остановки операционных процессов.",
    serviceSlug: "uborka-skladov",
    citySlug: "ekaterinburg"
  },
  {
    company: "Zolla",
    title: "Уборка сети магазинов",
    metric: "1 350 уборок/мес",
    result: "160 клинеров и 52 мобильные бригады в нескольких федеральных округах.",
    serviceSlug: "uborka-ofisov",
    citySlug: "chelyabinsk"
  },
  {
    company: "МТС",
    title: "Офисы и прилегающая территория",
    metric: "15 400 м2",
    result: "70 клинеров, приемка по графику и закрывающие документы.",
    serviceSlug: "uborka-ofisov",
    citySlug: "ekaterinburg"
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
  "срыв графика уборки",
  "жалобы сотрудников и арендаторов",
  "скрытые доплаты в смете",
  "отсутствие отчетности и актов",
  "неподходящая химия для поверхностей",
  "проблемы перед проверкой или открытием"
];

export const faqs = [
  {
    question: "Можно ли получить расчет без выезда?",
    answer: "Предварительный диапазон дадим по площади, типу объекта и задаче. Точную смету фиксируем после бесплатного осмотра, чтобы не закладывать скрытые доплаты."
  },
  {
    question: "Работаете с юридическими лицами и ЭДО?",
    answer: "Да. Готовим договор, КП, смету, акты и при необходимости работаем через ЭДО. Формат НДС или без НДС согласуется перед договором."
  },
  {
    question: "Что происходит, если клинер не вышел?",
    answer: "За объектом закреплены бригадир и менеджер. При невыходе подключается кадровый резерв или мобильная бригада, чтобы график не сорвался."
  },
  {
    question: "Можно ли работать ночью или в выходные?",
    answer: "Да. Для объектов с плотным рабочим графиком ставим ночные, выходные или праздничные смены."
  }
];

export const processSteps = [
  "Заявка и уточнение задачи",
  "Бесплатный осмотр объекта",
  "Клинтест и подбор химии",
  "Смета, КП и договор",
  "Выход команды и контроль",
  "Приемка, акты и закрытие замечаний"
];

export function getCity(slug: string) {
  return cities.find((city) => city.slug === slug);
}

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export const IconUsers = UsersRound;
export const IconTruck = Truck;
