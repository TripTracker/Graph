import { Field, ObjectType, InputType, Query } from 'type-graphql'

@ObjectType()
export class Trip {
  @Field()
  id: string

  @Field({ nullable: true })
  description: string;

  @Field()
  year: number;

  @Field(type => [Stop])
  stops: Stop[];

  @Field(type => [String], { nullable: true }) 
  imageKeys: string[];
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
  @Field()
  year: number;

  @Field({ nullable: true })
  description: string;

  @Field(type => [StopInput])
  stops: StopInput[];
}

@InputType()
export class UpdateTripInput {
  @Field()
  id: string

  @Field()
  year: number;

  @Field({ nullable: true })
  description: string;

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