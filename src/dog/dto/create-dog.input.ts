import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateDogInput {
  @Field(() => String, { description: '名前' })
  name: string;

  @Field(() => Int, { description: '飼い主のID', nullable: true })
  ownerId?: number;
}
