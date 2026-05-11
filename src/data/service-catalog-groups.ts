/** Группы услуг на странице /uslugi/ — якоря и разбиение длинного каталога */

export type ServiceCatalogSection = {
  id: string;
  title: string;
  description: string;
  slugs: string[];
};

export const serviceCatalogSections: ServiceCatalogSection[] = [
  {
    id: "kommercia",
    title: "Коммерческие объекты и ЖК",
    description: "Офисы, склады, производства, генеральная и после ремонта, торговля, промо, ЖК.",
    slugs: [
      "uborka-ofisov",
      "uborka-proizvodstva",
      "uborka-skladov",
      "generalnaya-uborka",
      "uborka-posle-remonta",
      "uborka-torgovyh-setey",
      "uborka-promoborudovaniya",
      "uborka-zhk"
    ]
  },
  {
    id: "horeca-social",
    title: "HoReCa, медицина, спорт, парковки",
    description: "Рестораны, отели, медцентры, фулфилменты, спорт, зоны отдыха, парковки, фасады.",
    slugs: [
      "uborka-restoranov-kafe",
      "uborka-oteley",
      "uborka-medcentrov",
      "uborka-fulfilmentov",
      "uborka-sportivnyh-obyektov",
      "uborka-saun-basseynov",
      "uborka-parkingov",
      "uborka-fasadov-okon"
    ]
  },
  {
    id: "spec-him",
    title: "ЧП, химчистка, полы и окна",
    description: "После пожара и затопления, химчистка покрытий, чистка полов и брусчатки, обеспыливание, мойка окон.",
    slugs: [
      "uborka-posle-pozhara",
      "uborka-posle-potopa",
      "himchistka-kinoteatrov",
      "himchistka-myagkoy-mebeli",
      "himchistka-kovrolina",
      "himchistka-shtor",
      "chistka-pola",
      "chistka-bruschatki",
      "obespilivanie-ferm",
      "moyka-okon"
    ]
  },
  {
    id: "transport-gos",
    title: "Транспорт, образование, гос и события",
    description: "Транспорт и нефтебазы, инфраструктура, школы и сады, мероприятия, госсектор.",
    slugs: [
      "klining-transporta",
      "klining-neftebaz",
      "klining-transportnoy-infrastruktury",
      "uborka-detskih-uchrezhdeniy",
      "uborka-posle-meropriyatiy",
      "uborka-gosuchrezhdeniy"
    ]
  }
];
