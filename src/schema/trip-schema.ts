import { Field, ObjectType, InputType } from 'type-graphql'

@ObjectType()
export class Trip {
  @Field()
  id: number

  @Field()
  userId: string;

  @Field({ nullable: true })
  date: string;

  @Field(type => [Stop])
  stops: Stop[];
}

@ObjectType()
export class Stop {

  @Field()
  description: string;

  @Field()
  latitude: number;

  @Field()
  longitude: number;
}

// @InputType()
// export class TodoInput implements Partial<Todo> {
//   @Field()
//   title: string

//   @Field()
//   description: string
// }