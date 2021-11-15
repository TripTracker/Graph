import { Query, Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { ApolloContext } from '../server/apollo-context';
import { FileUpload, GraphQLUpload } from 'graphql-upload';


@Resolver((of) => String)
export class ContentResolver {

  @Query((returns) => [String], { nullable: true })
  public async imageKeys(@Arg("tripId") tripId: string, @Ctx() context: ApolloContext): Promise<string[]> {
    return await context.dataSources.contentClient.getTripImageKeys(tripId);
  }

  @Mutation(returns => Boolean)
  public async addTripImage(
    @Arg("tripId") tripId: string, 
    @Arg("file", () => GraphQLUpload) { createReadStream }: FileUpload, 
    @Ctx() context: ApolloContext) {


    // Invoking the `createReadStream` will return a Readable Stream.
    // See https://nodejs.org/api/stream.html#stream_readable_streams
    const stream = createReadStream();
    await context.dataSources.contentClient.uploadImage(tripId, stream);

    return true;
  }
}