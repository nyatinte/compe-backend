import { CreateCompetitionInput } from './create-competition.input'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateCompetitionInput extends PartialType(CreateCompetitionInput) {
  id: number
}
