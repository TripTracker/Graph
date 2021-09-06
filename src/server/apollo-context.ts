import { ExpressContext } from "apollo-server-express";
import { LocationClient } from "../data-sources/location-client";
import { TripClient } from "../data-sources/trip-client";
import { UserClient } from "../data-sources/user-client";

export interface ApolloContext extends ExpressContext {
  dataSources: {
    locationApiClient: LocationClient;
    tripApiClient: TripClient
    userClient: UserClient
  };
}
