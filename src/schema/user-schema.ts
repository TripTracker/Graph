import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field()
  email: string

  @Field({ nullable: true })
  picture: string;

  @Field({ nullable: true })
  name: string;
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