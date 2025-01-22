export interface ILocation {
  locationID: number;
  name: string;
}

export interface IEnvironment {
  environmentID: number;
  name: string;
}

export interface IServer {
  serverID: number;
  name: string;
  locationID: number;
  environmentID: number;
}

export interface LocationsStore {
  isLoaded: boolean;
  locations: ILocation[];
  environments: IEnvironment[];
  servers: IServer[];
  fetch: () => Promise<void>;
}

export interface ILocationItem extends IFormState {
  title: string;
}

export interface IFormState {
  id: string;
  location: string;
  environment: string;
  servers: string[];
  hint: string;
}
