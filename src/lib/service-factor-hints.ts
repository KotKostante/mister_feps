/** Краткая колонка «как влияет на смету» для таблицы факторов на странице услуги */

export function hintForServiceFactor(factor: string): string {
  const f = factor.toLowerCase();
  if (f.includes("площад")) return "База расчёта, состав бригады и время на объекте";
  if (f.includes("график") || f.includes("частот")) return "Число выездов и окна доступа в смете";
  if (f.includes("санузл")) return "Доп. время и расходники на зону";
  if (f.includes("расход") || f.includes("хими")) return "Закладка в КП или закупка клиента";
  if (f.includes("отчёт") || f.includes("документ")) return "Учёт в регламенте и стоимости сопровождения";
  if (f.includes("доступ") || f.includes("пропуск")) return "Логистика и согласования в цене";
  if (f.includes("загрязн")) return "Объём ручных работ и химии";
  if (f.includes("срочн")) return "Мобилизация бригады и внеплановый выезд";
  if (f.includes("высот")) return "Оборудование и допуски";
  if (f.includes("ноч")) return "Надбавка за ночные слоты";
  if (f.includes("пассажир")) return "Интервалы без остановки потока";
  if (f.includes("пожар") || f.includes("безопас")) return "Категория работ и контроль на площадке";
  return "Учитываем при расчёте до подписания договора";
}
