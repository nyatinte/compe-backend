import { CreateDogInput } from './create-dog.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDogInput extends PartialType(CreateDogInput) {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field(() => String, { description: '名前', nullable: true })
  name?: string;

  @Field(() => Number, { description: '飼い主のID', nullable: true })
  ownerId?: number;
}
