import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ILocationItem } from "../types";

interface IUseLocationCardParams {
  setLocationsList: Dispatch<SetStateAction<ILocationItem[]>>;
  id: string;
}

export const useLocationCard = (params: IUseLocationCardParams) => {
  const onChangeHintValue = (e: ChangeEvent<HTMLInputElement>) => {
    params.setLocationsList((prev) =>
      prev.map((loc) => {
        if (loc.id === params.id) {
          return {
            ...loc,
            hint: e.target.value,
          };
        }
        return loc;
      }),
    );
  };

  const onDeleteLocation = () => {
    params.setLocationsList((prev) =>
      prev.filter((loc) => loc.id !== params.id),
    );
  };

  const handleChange = (field: string, value: string) => {
    params.setLocationsList((prevLocations) => {
      return prevLocations.map((location) => {
        if (location.id === params.id) {
          return { ...location, [field]: value };
        }
        return location;
      });
    });
  };

  return {
    onDeleteLocation,
    onChangeHintValue,
    handleChange,
  };
};
