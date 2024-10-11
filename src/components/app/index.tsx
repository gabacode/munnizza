// App.tsx
import { useState } from "react";
import { useCalendar } from "../../hooks/useCalendar";
import { addDays, subDays } from "date-fns";
import { TrashType } from "../../types";
import { Button } from "./partials/Button";

export const App = () => {
  const { getCollectionByDate, getTrashColor } = useCalendar();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const { today, collection } = getCollectionByDate(currentDate);

  const toCollect =
    collection.length > 0 ? collection.join(" e ") : "nessuna raccolta oggi";

  const bgColor = collection.map((trashType: TrashType) =>
    getTrashColor(trashType)
  );

  const bgStyle = {
    background:
      bgColor.length === 1
        ? bgColor[0]
        : `linear-gradient(to bottom, ${bgColor.join(", ")})`,
  };

  const goBack = () => {
    setCurrentDate((prevDate) => subDays(prevDate, 1));
  };

  const goForward = () => {
    setCurrentDate((prevDate) => addDays(prevDate, 1));
  };

  return (
    <div className="App" style={bgStyle}>
      <header className="App-header">
        <h1>Oggi è {today}:</h1>
        <h2>Si conferisce {toCollect}</h2>
      </header>
      <footer>
        <div className="App-footer">
          <Button onClick={goBack}>← Indietro</Button>
          <Button onClick={goForward}>Avanti →</Button>
        </div>
      </footer>
    </div>
  );
};
