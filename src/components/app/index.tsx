// App.tsx
import { useEffect, useState } from "react";
import { useCalendar } from "../../hooks/useCalendar";
import { addDays, subDays } from "date-fns";
import { TrashType } from "../../types";
import { Button } from "./partials/Button";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

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

  useEffect(() => {
    const handleKeyPress = (e: { key: string }) => {
      if (e.key === "ArrowLeft") {
        goBack();
      } else if (e.key === "ArrowRight") {
        goForward();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="App" style={bgStyle}>
      <div className="content">
        <h1>Oggi è {today}:</h1>
        <h2>Si conferisce {toCollect}</h2>
      </div>
      <div className="d-flex justify-content-center">
        <div className="buttons container-fluid">
          <FaChevronLeft
            className="pointer"
            size={32}
            color="white"
            onClick={goBack}
          />
          <FaChevronRight
            className="pointer"
            size={32}
            color="white"
            onClick={goForward}
          />
        </div>
      </div>
    </div>
  );
};
