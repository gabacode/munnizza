import { useCalendar } from "../../hooks/useCalendar";

export const App = () => {
  const { getTodayCollection, getTrashColor } = useCalendar();
  const { today, collection } = getTodayCollection();

  const toCollect =
    collection.length > 0 ? collection.join(" e ") : "nessuna raccolta oggi";
  const bgColor = collection.map((trashType) => getTrashColor(trashType));

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: bgColor[0] }}>
        <h1>Oggi è {today}:</h1>
        <h2>Si conferisce {toCollect}</h2>
      </header>
    </div>
  );
};
