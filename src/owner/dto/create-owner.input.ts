import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOwnerInput {
  @Field(() => String, { description: '名前' })
  name: string;

  @Field(() => [Int], { description: '犬のID', nullable: true })
  dogIds: number[];
}
