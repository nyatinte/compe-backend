import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCompetitionInput,
  UpdateCompetitionInput,
  User,
} from 'src/types/graphql';

@Injectable()
export class CompetitionService {
  constructor(private prisma: PrismaService) {}
  create(createCompetitionInput: CreateCompetitionInput, ctx: User) {
    return this.prisma.competition.create({
      data: {
        ...createCompetitionInput,
        owner: {
          connect: {
            id: ctx.id,
          },
        },
        users: {
          connect: [{ id: ctx.id }],
        },
      },
      include: {
        users: true,
        owner: true,
      },
    });
  }

  findAll() {
    return this.prisma.competition.findMany({
      include: {
        users: true,
        owner: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.competition.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateCompetitionInput: UpdateCompetitionInput) {
    return this.prisma.competition.update({
      where: {
        id,
      },
      data: {
        ...updateCompetitionInput,
      },
    });
  }

  remove(id: number) {
    return this.prisma.competition.delete({
      where: {
        id,
      },
    });
  }
}
