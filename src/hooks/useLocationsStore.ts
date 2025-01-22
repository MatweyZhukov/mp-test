import { create } from "zustand";
import { sleep } from "../utils/sleep";
import { LocationsStore } from "../types";

export const useLocationsStore = create<LocationsStore>((set) => {
  const fetch = async () => {
    await sleep(3000);
    const { default: data } = await import("../store/data.json");
    set({
      ...data,
      isLoaded: true,
    });
  };

  return {
    isLoaded: false,
    locations: [],
    environments: [],
    servers: [],
    fetch,
  };
});
