import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Dog {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field(() => String, { description: '名前' })
  name: string;

  @Field(() => Int, { description: '飼い主のID', nullable: true })
  ownerId?: number;
}
