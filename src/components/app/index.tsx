import { useCalendar } from "../../hooks/useCalendar";

export const App = () => {
  const { getTodayCollection } = useCalendar();
  const { todayFull, collection } = getTodayCollection();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Oggi è {todayFull}:</h1>
        <h2>
          Si conferisce{" "}
          {collection.length > 0
            ? collection.join(" e ")
            : "nessuna raccolta oggi"}
        </h2>
      </header>
    </div>
  );
};
