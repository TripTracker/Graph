import { Query, Resolver, Arg, Ctx } from 'type-graphql'
import { ApolloContext } from '../server/apollo-context';

@Resolver((of) => String)
export class ContentResolver {

  @Query((returns) => [String], { nullable: true })
  public async imageKeys(@Arg("tripId") tripId: string, @Ctx() context: ApolloContext): Promise<string[]> {
    return await context.dataSources.contentClient.getTripImageKeys(tripId);
  }

//   @Query((returns) => [Trip])
//   public async trips(
//     @Arg("skip") skip: number, 
//     @Arg("take") take: number, 
//     @Ctx() context: ApolloContext): Promise<Trip[]> {
//       return await context.dataSources.tripApiClient.fetchTrips(skip, take);
//   }

//   @Mutation(returns => Trip)
//   public async addTrip(@Arg("trip") trip: CreateTripInput, @Ctx() context: ApolloContext) {
//     return await context.dataSources.tripApiClient.addTrip(trip);
//   }

//   @Mutation(returns => Trip)
//   public async updateTrip(@Arg("trip") trip: UpdateTripInput, @Ctx() context: ApolloContext) {
//     return await context.dataSources.tripApiClient.updateTrip(trip);
//   }
}