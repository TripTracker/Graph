import { Query, Resolver, Arg, Ctx } from 'type-graphql'
import { LoginResult, User } from '../schema/user-schema';
import { ApolloContext } from '../server/apollo-context';

@Resolver((of) => User)
export class UserResolver {
  @Query((returns) => User, { nullable: true })
  public async user(@Ctx() context: ApolloContext): Promise<User> {
     return await context.dataSources.userClient.getUser();
  }

  @Query((returns) => LoginResult, { nullable: true })
  public async login(@Arg("googleToken") googleToken: string, @Ctx() context: ApolloContext): Promise<LoginResult> {
     return await context.dataSources.userClient.login(googleToken);
  }
}
