import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { CompetitionService } from 'src/competition/competition.service'

@Module({
  providers: [UserResolver, UserService, CompetitionService],
})
export class UserModule {}
