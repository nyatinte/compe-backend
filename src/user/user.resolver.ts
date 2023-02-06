import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql'
import { UserService } from './user.service'
import { CreateUserInput, UpdateUserInput, User } from 'src/types/graphql'
import { UseGuards } from '@nestjs/common'
import { NextAuthGuard } from 'src/utils/NextAuthGuard'

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput)
  }

  @Mutation('createUserById')
  createById(@Args('id') id: string, @Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createById(id, createUserInput)
  }

  @Query('users')
  @UseGuards(NextAuthGuard)
  findAll() {
    return this.userService.findAll()
  }

  @Query('user')
  @UseGuards(NextAuthGuard)
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id)
  }

  @Mutation('updateUser')
  @UseGuards(NextAuthGuard)
  update(@Args('id') id: string, @Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(id, updateUserInput)
  }

  @Mutation('removeUser')
  @UseGuards(NextAuthGuard)
  remove(@Args('id') id: string) {
    return this.userService.remove(id)
  }

  @ResolveField('OK', () => Boolean)
  async OK(@Parent() user: User) {
    const { name, email } = user
    return Boolean(name && email)
  }
}
