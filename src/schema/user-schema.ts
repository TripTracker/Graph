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