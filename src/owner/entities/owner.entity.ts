import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Dog } from 'src/dog/entities/dog.entity';

@ObjectType()
export class Owner {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field(() => String, { description: '名前' })
  name: string;

  @Field(() => [Dog], { description: '犬' })
  dogs: Dog[];
}
