import { Field, ObjectType, InputType } from 'type-graphql'

@ObjectType()
export class Trip {
  @Field()
  id: string

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

@InputType()
export class CreateTripInput {
  @Field({ nullable: true })
  date: string;

  @Field(type => [StopInput])
  stops: StopInput[];
}

@InputType()
export class UpdateTripInput {
  @Field()
  id: string

  @Field({ nullable: true })
  date: string;

  @Field(type => [StopInput])
  stops: StopInput[];
}

@InputType()
export class StopInput {
  @Field()
  description: string;

  @Field()
  latitude: number;

  @Field()
  longitude: number;
}