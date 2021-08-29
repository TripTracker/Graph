import { Query, Resolver, Arg, Ctx } from 'type-graphql'
import { Location } from '../schema/location-schema'
import { Context } from '../data-sources/context';

@Resolver((of) => Location)
export class LocationResolver {

  @Query((returns) => [Location], { nullable: true })
  public async locations(@Arg("query") query: string, @Ctx() context: Context): Promise<Location[]> {
     return await context.dataSources.locationApiClient.search(query);
  }
}