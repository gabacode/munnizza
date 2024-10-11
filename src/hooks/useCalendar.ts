import { format } from "date-fns";
import { it } from "date-fns/locale";
import { DayOfWeek, TrashType } from "../types";

const trashColorMap: Record<TrashType, string> = {
  [TrashType.Organico]: "#4caf50",
  [TrashType.Plastica]: "#2196f3",
  [TrashType.Lattine]: "#f44336",
  [TrashType.Carta]: "#ff9800",
  [TrashType.Vetro]: "#9c27b0",
  [TrashType.Indifferenziata]: "#607d8b",
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

  const getTodayCollection = () => {
    const today = format(new Date(), "cccc", { locale: it });
    const dayKey = format(new Date(), "eee").toLowerCase() as DayOfWeek;
    const collection = dayKey ? calendar[dayKey] : [];

    return { today, collection };
  };

  return { calendar, getTodayCollection, getTrashColor };
};
