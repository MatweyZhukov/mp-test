import { v4 as uuid } from "uuid";
import { useLocationsStore } from "./useLocationsStore";
import { ILocationItem } from "../types";
import { Form } from "antd";

export const useLocationForm = (
  locationsList: ILocationItem[],
  setLocationsList: React.Dispatch<React.SetStateAction<ILocationItem[]>>,
) => {
  const { locations, environments } = useLocationsStore();
  const [form] = Form.useForm();

  const onAddNewLocation = () => {
    form.validateFields().then((values) => {
      const newLocation: ILocationItem = {
        ...values,
        id: uuid(),
        title: `Тестовая локация ${locationsList.length + 1}`,
      };
      setLocationsList((prev) => [...prev, newLocation]);
      form.resetFields();
    });
  };

  const handleConvertAndLog = () => {
    const result = locationsList.map((location) => {
      const locationData = locations.find(
        (loc) => loc.name === location.location,
      );
      const environmentData = environments.find(
        (env) => env.name === location.environment,
      );

      if (locationData && environmentData) {
        return {
          locationID: locationData.locationID,
          environmentID: environmentData.environmentID,
          hint: location.hint || "",
        };
      }
    });

    console.log(result);
  };

  return {
    form,
    onAddNewLocation,
    handleConvertAndLog,
  };
};
