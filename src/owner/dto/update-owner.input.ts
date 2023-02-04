import { CreateOwnerInput } from './create-owner.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOwnerInput extends PartialType(CreateOwnerInput) {
  @Field(() => Int)
  id: number;

  @Field(() => [Int], { description: '犬のID', nullable: true })
  dogIds?: number[];
}
