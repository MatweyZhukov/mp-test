import { useEffect, useState } from "react";
import { TestLocationForm } from "./components/TestLocationForm/TestLocationForm";
import { useLocationsStore } from "./hooks/useLocationsStore";
import { TestLocationCard } from "./components/TestLocationCard/TestLocationCard";
import { ILocationItem } from "./types";
import { Spinner } from "./components/Spinner/Spinner";

export default function App() {
  const [locationsList, setLocationsList] = useState<ILocationItem[]>(
    JSON.parse(localStorage.getItem("locationsList") || "[]") || [],
  );

  const { fetch, isLoaded } = useLocationsStore();

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    localStorage.setItem("locationsList", JSON.stringify(locationsList));
  }, [locationsList]);

  if (!isLoaded) {
    return <Spinner />;
  }

  return (
    <div className="App">
      <TestLocationForm
        locationsList={locationsList}
        setLocationsList={setLocationsList}
      />
      <ul className="locationsList">
        {locationsList.map((location) => (
          <TestLocationCard
            key={location.id}
            location={location}
            setLocationsList={setLocationsList}
          />
        ))}
      </ul>
    </div>
  );
}
