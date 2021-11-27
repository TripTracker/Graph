import { Query, Resolver, Arg, Ctx, Mutation } from 'type-graphql'
import { LoginData, LoginResult, RefreshData, User } from '../schema/user-schema';
import { ApolloContext } from '../server/apollo-context';

@Resolver((of) => User)
export class UserResolver {
  @Query((returns) => User, { nullable: true })
  public async user(@Ctx() context: ApolloContext): Promise<User> {
     return await context.dataSources.userClient.getUser();
  }

  @Mutation((returns) => LoginResult, { nullable: true })
  public async login(@Arg("data") data: LoginData, @Ctx() context: ApolloContext): Promise<LoginResult> {
     return await context.dataSources.userClient.login(data);
  }

  @Mutation((returns) => LoginResult, { nullable: true })
  public async refresh(@Arg("data") data: RefreshData, @Ctx() context: ApolloContext): Promise<LoginResult> {
     return await context.dataSources.userClient.refresh(data);
  }
}
