import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DogService } from './dog.service';
import { Dog } from './entities/dog.entity';
import { CreateDogInput } from './dto/create-dog.input';
import { UpdateDogInput } from './dto/update-dog.input';

@Resolver(() => Dog)
export class DogResolver {
  constructor(private readonly dogService: DogService) {}

  @Mutation(() => Dog)
  createDog(@Args('createDogInput') createDogInput: CreateDogInput) {
    return this.dogService.create(createDogInput);
  }

  @Query(() => [Dog], { name: 'dogs' })
  findAll() {
    return this.dogService.findAll();
  }

  @Query(() => Dog, { name: 'dog' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.dogService.findOne(id);
  }

  @Mutation(() => Dog)
  updateDog(@Args('updateDogInput') updateDogInput: UpdateDogInput) {
    return this.dogService.update(updateDogInput.id, updateDogInput);
  }

  @Mutation(() => Dog)
  removeDog(@Args('id', { type: () => Int }) id: number) {
    return this.dogService.remove(id);
  }
}
