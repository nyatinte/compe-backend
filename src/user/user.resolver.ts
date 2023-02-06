import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput, UpdateUserInput, User } from 'src/types/graphql';
import { Source } from 'graphql';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation('createUserById')
  createById(
    @Args('id') id: string,
    @Args('createUserInput') createUserInput: CreateUserInput,
  ) {
    return this.userService.createById(id, createUserInput);
  }

  @Query('users')
  findAll() {
    return this.userService.findAll();
  }

  @Query('user')
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Mutation('updateUser')
  update(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation('removeUser')
  remove(@Args('id') id: string) {
    return this.userService.remove(id);
  }

  @ResolveField('OK', () => Boolean)
  async OK(@Parent() user: User) {
    const { name, email } = user;
    return Boolean(name && email);
  }
}
