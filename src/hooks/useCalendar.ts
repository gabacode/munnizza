import { format } from "date-fns";
import { it } from "date-fns/locale";
import { DayOfWeek, TrashType } from "../types";

const trashColorMap: Record<TrashType, string> = {
  [TrashType.Organico]: "#301616",
  [TrashType.Plastica]: "#ffa409",
  [TrashType.Lattine]: "#ffa409",
  [TrashType.Carta]: "#002773",
  [TrashType.Vetro]: "#00661e",
  [TrashType.Indifferenziata]: "#1d2a35",
  [TrashType.Niente]: "#000",
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

  const getTrashColor = (trashType: TrashType) => trashColorMap[trashType];

  const getCollectionByDate = (date: Date) => {
    let today = format(date, "cccc", { locale: it });
    today = today.charAt(0).toUpperCase() + today.slice(1);
    const dayKey = format(date, "eee").toLowerCase() as DayOfWeek;
    const collection = dayKey ? calendar[dayKey] : [];

    return { today, collection };
  };

  return { calendar, getCollectionByDate, getTrashColor };
};
