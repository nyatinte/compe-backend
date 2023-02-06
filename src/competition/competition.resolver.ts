import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  GqlContextType,
  ResolveField,
} from '@nestjs/graphql';
import { CompetitionService } from './competition.service';
import {
  CreateCompetitionInput,
  UpdateCompetitionInput,
  User,
} from 'src/types/graphql';

@Resolver('Competition')
export class CompetitionResolver {
  constructor(private readonly competitionService: CompetitionService) {}

  @Mutation('createCompetition')
  create(
    @Args('createCompetitionInput')
    createCompetitionInput: CreateCompetitionInput,
    @Context() ctx: User,
  ) {
    return this.competitionService.create(createCompetitionInput, ctx);
  }

  @Query('competition')
  findAll() {
    return this.competitionService.findAll();
  }

  @Query('competition')
  findOne(@Args('id') id: number) {
    return this.competitionService.findOne(id);
  }

  @Mutation('updateCompetition')
  update(
    @Args('id') id: number,
    @Args('updateCompetitionInput')
    updateCompetitionInput: UpdateCompetitionInput,
  ) {
    return this.competitionService.update(id, updateCompetitionInput);
  }

  @Mutation('removeCompetition')
  remove(@Args('id') id: number) {
    return this.competitionService.remove(id);
  }

  @ResolveField('isOpen', () => Boolean)
  async isOpen(@Args('id') id: number) {
    const competition = await this.competitionService.findOne(id);
    const { startDate, endDate } = competition;
    const now = new Date();
    return startDate <= now && now <= endDate;
  }
}
