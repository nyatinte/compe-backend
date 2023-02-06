import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateCompetitionInput, UpdateCompetitionInput, User } from 'src/types/graphql'

@Injectable()
export class CompetitionService {
  constructor(private prisma: PrismaService) {}
  create(createCompetitionInput: CreateCompetitionInput, user: User) {
    return this.prisma.competition.create({
      data: {
        ...createCompetitionInput,
        owner: {
          connect: {
            id: user.id,
          },
        },
        participants: {
          connect: [
            {
              id: user.id,
            },
          ],
        },
      },
      include: {
        participants: true,
        owner: true,
        submits: true,
      },
    })
  }

  findAll() {
    return this.prisma.competition.findMany({
      include: {
        participants: true,
        owner: true,
        submits: true,
      },
    })
  }

  findOne(id: number) {
    return this.prisma.competition.findUnique({
      where: {
        id,
      },
      include: {
        participants: true,
        owner: true,
        submits: true,
      },
    })
  }

  update(id: number, updateCompetitionInput: UpdateCompetitionInput) {
    return this.prisma.competition.update({
      where: {
        id,
      },
      data: {
        ...updateCompetitionInput,
      },
      include: {
        participants: true,
        owner: true,
        submits: true,
      },
    })
  }

  async remove(id: number, user: User) {
    const competition = await this.prisma.competition.findUnique({
      where: {
        id,
      },
    })
    if (competition.ownerId !== user.id) {
      throw new Error('オーナー以外は削除できません')
    }
    return this.prisma.competition.delete({
      where: {
        id,
      },
    })
  }

  addParticipant(id: number, userId: string) {
    return this.prisma.competition.update({
      where: {
        id,
      },
      data: {
        participants: {
          connect: [
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        participants: true,
        owner: true,
        submits: true,
      },
    })
  }
}
