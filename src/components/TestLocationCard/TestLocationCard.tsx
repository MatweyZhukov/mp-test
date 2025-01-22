import { Dispatch, FC, SetStateAction } from "react";
import { ILocationItem } from "../../types";
import { Input, Select } from "antd";
import styles from "./TestLocationCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faSeedling,
  faServer,
  faQuestion,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useLocationsStore } from "../../hooks/useLocationsStore";
import { useLocationCard } from "../../hooks/useLocationCard";

const { Option } = Select;

interface ITestLocationCardProps {
  location: ILocationItem;
  setLocationsList: Dispatch<SetStateAction<ILocationItem[]>>;
}

export const TestLocationCard: FC<ITestLocationCardProps> = ({
  location,
  setLocationsList,
}) => {
  const { locations, environments } = useLocationsStore();

  const { onChangeHintValue, onDeleteLocation, handleChange } = useLocationCard(
    {
      id: location.id,
      setLocationsList: setLocationsList,
    },
  );

  return (
    <li className={styles.locationsListItem}>
      <h2>{location.title}</h2>
      <label className={styles.locationsListItemLabel}>
        <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: 5 }} />{" "}
        Локация:{" "}
        <Select
          style={{ width: "100%" }}
          defaultValue={location.location}
          placeholder="Выберите тестовую локацию"
          onChange={(value) => handleChange("location", value)}
        >
          {locations.map(({ locationID, name }) => (
            <Option key={locationID} value={name}>
              {name}
            </Option>
          ))}
        </Select>
      </label>
      <label className={styles.locationsListItemLabel}>
        <FontAwesomeIcon icon={faSeedling} style={{ marginRight: 5 }} />
        Среда:{" "}
        <Select
          style={{ width: "100%" }}
          defaultValue={location.environment}
          placeholder="Выберите тестовую среду"
          onChange={(value) => handleChange("environment", value)}
        >
          {environments.map(({ environmentID, name }) => (
            <Option key={environmentID} value={name}>
              {name}
            </Option>
          ))}
        </Select>
      </label>
      <label className={styles.locationsListItemLabel}>
        <FontAwesomeIcon icon={faServer} style={{ marginRight: 5 }} />
        Серверы: {location.servers.join(", ")}
      </label>
      <label className={styles.locationsListItemLabel}>
        <FontAwesomeIcon icon={faQuestion} style={{ marginRight: 5 }} />
        Подсказка:
        <Input value={location.hint} onChange={onChangeHintValue} />
      </label>
      <button onClick={onDeleteLocation} className={styles.trashButton}>
        <FontAwesomeIcon color="red" icon={faTrash} />
      </button>
    </li>
  );
};
