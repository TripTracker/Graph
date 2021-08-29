import { LocationClient } from "./location-client";
import { TripClient } from "./trip-client";

export interface Context {
  dataSources: {
    locationApiClient: LocationClient;
    tripApiClient: TripClient
  };
}
