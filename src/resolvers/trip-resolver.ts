import { Query, Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import { Trip, CreateTripInput, UpdateTripInput } from '../schema/trip-schema'
import { Context } from '../data-sources/context';

@Resolver((of) => Trip)
export class TripResolver {

  @Query((returns) => Trip, { nullable: true })
  public async trip(@Arg("tripId") tripId: string, @Ctx() context: Context): Promise<Trip> {
    return await context.dataSources.tripApiClient.fetchTrip(tripId);
  }

  @Query((returns) => [Trip])
  public async trips(@Arg("userId" ) userId: string, @Ctx() context: Context): Promise<Trip[]> {
    return await context.dataSources.tripApiClient.fetchTrips(userId);
  }

  @Mutation(returns => Trip)
  public async addTrip(@Arg("trip") trip: CreateTripInput, @Ctx() context: Context) {
    return await context.dataSources.tripApiClient.addTrip(trip);
  }

  @Mutation(returns => Trip)
  public async updateTrip(@Arg("trip") trip: UpdateTripInput, @Ctx() context: Context) {
    return await context.dataSources.tripApiClient.updateTrip(trip);
  }
}