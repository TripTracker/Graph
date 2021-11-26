import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field()
  email: string

  @Field({ nullable: true })
  picture: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;
}

@ObjectType()
export class LoginResult {
  @Field()
  access_token: string

  @Field()
  expires_in: number;

  @Field()
  token_type: string

  @Field()
  scope: string
}

@InputType()
export class LoginData {
  @Field()
  client_id: string

  @Field()
  client_secret: string;

  @Field()
  grant_type: string

  @Field()
  scope: string;

  @Field()
  provider: string;

  @Field()
  token: string;
}
