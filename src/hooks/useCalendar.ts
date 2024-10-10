import { format } from "date-fns";
import { it } from "date-fns/locale";

export enum TrashType {
  Organico = "Organico",
  Plastica = "Plastica",
  Lattine = "Lattine",
  Carta = "Carta",
  Vetro = "Vetro",
  Indifferenziata = "Indifferenziata",
  Niente = "Niente",
}

export type DayOfWeek = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

const dayMap: Record<string, DayOfWeek> = {
  lun: "mon",
  mar: "tue",
  mer: "wed",
  gio: "thu",
  ven: "fri",
  sab: "sat",
  dom: "sun",
};

export const useCalendar = () => {
  const calendar: Record<DayOfWeek, TrashType[]> = {
    mon: [TrashType.Organico],
    tue: [TrashType.Plastica, TrashType.Lattine],
    wed: [TrashType.Carta],
    thu: [TrashType.Organico, TrashType.Vetro],
    fri: [TrashType.Indifferenziata],
    sat: [TrashType.Organico],
    sun: [TrashType.Niente],
  };

  const getTodayCollection = () => {
    const todayAbbrev = format(new Date(), "eee", { locale: it }).toLowerCase();
    const todayFull = format(new Date(), "cccc", { locale: it });

    const dayKey = dayMap[todayAbbrev];

    const collection = dayKey ? calendar[dayKey] : [];

    return { todayFull, collection };
  };

  return { calendar, getTodayCollection };
};
