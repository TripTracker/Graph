import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import { Trip, Stop, CreateTripInput, UpdateTripInput } from '../schema/trip-schema'
import { TripClient } from '../clients/trip-client';

@Resolver((of) => Trip)
export class TripResolver {

  private tripClient : TripClient = new TripClient();

  @Query((returns) => Trip, { nullable: true })
  public async trip(@Arg("tripId") tripId: string): Promise<Trip> {
    return await this.tripClient.fetchTrip(tripId);
  }

  @Query((returns) => [Trip])
  public async trips(@Arg("userId") userId: string): Promise<Trip[]> {
    return await this.tripClient.fetchTrips(userId);
  }

  @Mutation(returns => Trip)
  public async addTrip(@Arg("trip") trip: CreateTripInput) {
    return await this.tripClient.addTrip(trip);
  }

  @Mutation(returns => Trip)
  public async updateTrip(@Arg("trip") trip: UpdateTripInput) {
    return await this.tripClient.updateTrip(trip);
  }
}