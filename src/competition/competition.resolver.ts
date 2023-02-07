import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql'
import { CompetitionService } from './competition.service'
import {
  Competition,
  CreateCompetitionInput,
  UpdateCompetitionInput,
  User,
} from 'src/types/graphql'
import { UseGuards } from '@nestjs/common'
import { NextAuthGuard } from 'src/utils/NextAuthGuard'
import { CtxUser } from 'src/user/User'

@Resolver('Competition')
export class CompetitionResolver {
  constructor(private readonly competitionService: CompetitionService) {}

  @Mutation('createCompetition')
  @UseGuards(NextAuthGuard)
  create(
    @Args('createCompetitionInput')
    createCompetitionInput: CreateCompetitionInput,
    @CtxUser() user: User,
  ) {
    return this.competitionService.create(createCompetitionInput, user)
  }

  @Query('competitions')
  @UseGuards(NextAuthGuard)
  findAll() {
    return this.competitionService.findAll()
  }

  @Query('competition')
  findOne(@Args('id') id: string, @CtxUser() user: User) {
    return this.competitionService.findOne(id, user)
  }

  @Mutation('updateCompetition')
  update(
    @Args('id') id: string,
    @Args('updateCompetitionInput')
    updateCompetitionInput: UpdateCompetitionInput,
  ) {
    return this.competitionService.update(id, updateCompetitionInput)
  }

  @Mutation('removeCompetition')
  @UseGuards(NextAuthGuard)
  remove(@Args('id') id: string, @CtxUser() user: User) {
    return this.competitionService.remove(id, user)
  }

  @Mutation('addParticipant')
  @UseGuards(NextAuthGuard)
  addParticipant(@Args('id') id: string, @Args('userId') userId: string) {
    return this.competitionService.addParticipant(id, userId)
  }

  @ResolveField('isOpen', () => Boolean)
  async isOpen(@Parent() competition: Competition) {
    const { startDate, endDate } = competition
    const now = new Date()
    return startDate <= now && now <= endDate
  }
}
