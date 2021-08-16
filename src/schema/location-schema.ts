import { Field, ObjectType } from 'type-graphql'


@ObjectType()
export class Location {
  @Field({nullable: true})
  label: string

  @Field({nullable: true})
  name: string

  @Field()
  longitude: number;

  @Field()
  latitude: number;

  @Field({nullable: true})
  country: string;

  @Field({nullable: true})
  continent: string;

  @Field({nullable: true})
  region: string;

  @Field({nullable: true})
  regionCode: string;
}
