import { Query, Resolver, Arg } from 'type-graphql'
import { Location } from '../schema/location-schema'
import { LocationClient } from '../clients/location-client';

@Resolver((of) => Location)
export class LocationResolver {

  private locationClient : LocationClient = new LocationClient();

  @Query((returns) => [Location], { nullable: true })
  public async locations(@Arg("query") query: string): Promise<Location[]> {
     return await this.locationClient.search(query);
  }
}