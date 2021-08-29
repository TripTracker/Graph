import { Query, Resolver, Arg, Ctx } from 'type-graphql'
import { Location } from '../schema/location-schema'
import { ApolloContext } from '../server/apollo-context';

@Resolver((of) => Location)
export class LocationResolver {

  @Query((returns) => [Location], { nullable: true })
  public async locations(@Arg("query") query: string, @Ctx() context: ApolloContext): Promise<Location[]> {
     return await context.dataSources.locationApiClient.search(query);
  }
}