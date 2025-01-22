import { FC, Dispatch, SetStateAction } from "react";
import { Button, Form, Input, Select } from "antd";
import { ILocationItem } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faSeedling,
  faServer,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { useLocationForm } from "../../hooks/useLocationForm";
import { useLocationsStore } from "../../hooks/useLocationsStore";
import styles from "./TestLocationForm.module.css";

const { Option } = Select;

interface ITestLocationFormProps {
  locationsList: ILocationItem[];
  setLocationsList: Dispatch<SetStateAction<ILocationItem[]>>;
}

export const TestLocationForm: FC<ITestLocationFormProps> = ({
  locationsList,
  setLocationsList,
}) => {
  const { form, onAddNewLocation, handleConvertAndLog } = useLocationForm(
    locationsList,
    setLocationsList,
  );

  const { environments, locations, servers } = useLocationsStore();

  return (
    <Form className={styles.submitForm} onFinish={onAddNewLocation} form={form}>
      <h1 className={styles.submitFormTitle}>Создайте тестовую локацию</h1>
      <Form.Item
        name="location"
        style={{ marginBottom: 0 }}
        rules={[{ required: true, message: "Выбор локации обязателен!" }]}
        label={
          <span>
            <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: 5 }} />
            Локация
          </span>
        }
      >
        <Select placeholder="Выберите тестовую локацию" allowClear>
          {locations.map(({ locationID, name }) => (
            <Option key={locationID} value={name}>
              {name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="environment"
        style={{ marginBottom: 0 }}
        rules={[{ required: true, message: "Выбор среды обязателен!" }]}
        label={
          <span>
            <FontAwesomeIcon icon={faSeedling} style={{ marginRight: 5 }} />
            Среда
          </span>
        }
      >
        <Select placeholder="Выберите тестовую среду" allowClear>
          {environments.map(({ environmentID, name }) => (
            <Option key={environmentID} value={name}>
              {name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="servers"
        style={{ marginBottom: 0 }}
        rules={[{ required: true, message: "Выбор серверов обязателен!" }]}
        label={
          <span>
            <FontAwesomeIcon icon={faServer} style={{ marginRight: 5 }} />
            Серверы
          </span>
        }
      >
        <Select
          placeholder="Выберите тестовые сервера"
          mode="multiple"
          allowClear
        >
          {servers.map(({ name, serverID }) => (
            <Option key={serverID} value={name}>
              {name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        style={{ marginBottom: 0 }}
        name="hint"
        label={
          <span>
            <FontAwesomeIcon icon={faQuestion} style={{ marginRight: 5 }} />
            Подсказка
          </span>
        }
      >
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Добавить тестовую локацию
      </Button>
      <Button onClick={handleConvertAndLog}>Вывести результат в консоль</Button>
    </Form>
  );
};
