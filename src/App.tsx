import { useState } from "react";
import { Location, useLocationsStore } from "./store/useLocationsStore";

export default function App() {
  return (
    <div className="App">
      <TestLocationsList />
    </div>
  );
}

const TestLocationsList = () => {
  const [locationsList, setLocationsList] = useState<Partial<Location>[]>([{}]);
  return (
    <>
      {locationsList.map((_location, index) => (
        <TestLocationForm key={`location-${index}`} />
      ))}
      <button
        type="button"
        onClick={() => {
          setLocationsList((locationsList) => [...locationsList, {}]);
        }}
      >
        Добавить тестовую локацию
      </button>
      <button
        onClick={() => {
          console.log(locationsList);
        }}
      >
        Вывести результат в консоль
      </button>
    </>
  );
};

const TestLocationForm = () => {
  const store = useLocationsStore();
  if (!store.isLoaded) {
    return <div>Данные не загружены</div>;
  }
  return <div>TODO</div>;
};
