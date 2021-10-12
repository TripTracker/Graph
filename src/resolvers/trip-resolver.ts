import { Query, Resolver, Mutation, Arg, Ctx, FieldResolver, Root } from 'type-graphql'
import { ContentClient } from '../data-sources/content-client';
import { Trip, CreateTripInput, UpdateTripInput } from '../schema/trip-schema'
import { ApolloContext } from '../server/apollo-context';

@Resolver((of) => Trip)
export class TripResolver {

  constructor(
    private contentClient: ContentClient
  ){}

  @Query((returns) => Trip, { nullable: true })
  public async trip(@Arg("tripId") tripId: string, @Ctx() context: ApolloContext): Promise<Trip> {
    return await context.dataSources.tripApiClient.fetchTrip(tripId);
  }

  @Query((returns) => [Trip])
  public async trips(
    @Arg("skip") skip: number, 
    @Arg("take") take: number, 
    @Ctx() context: ApolloContext): Promise<Trip[]> {
      return await context.dataSources.tripApiClient.fetchTrips(skip, take);
  }

  @Mutation(returns => Trip)
  public async addTrip(@Arg("trip") trip: CreateTripInput, @Ctx() context: ApolloContext) {
    return await context.dataSources.tripApiClient.addTrip(trip);
  }

  @Mutation(returns => Trip)
  public async updateTrip(@Arg("trip") trip: UpdateTripInput, @Ctx() context: ApolloContext) {
    return await context.dataSources.tripApiClient.updateTrip(trip);
  }

  @FieldResolver()
  public async imageKeys(@Root() trip: Trip,  @Ctx() context: ApolloContext): Promise<string[]> {
    return await context.dataSources.contentClient.getTripImageKeys(trip.id);
  }
}