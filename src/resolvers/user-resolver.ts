import { Query, Resolver, Arg, Ctx } from 'type-graphql'
import { User } from '../schema/user-schema';
import { ApolloContext } from '../server/apollo-context';

@Resolver((of) => User)
export class UserResolver {
  @Query((returns) => User, { nullable: true })
  public async user(@Ctx() context: ApolloContext): Promise<User> {
     return await context.dataSources.userClient.getUser();
  }
}