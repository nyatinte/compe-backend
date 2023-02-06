import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserInput, UpdateUserInput } from 'src/types/graphql'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  create(input: CreateUserInput) {
    return this.prisma.user.create({
      data: {
        ...input,
      },
    })
  }

  createById(id: string, input: CreateUserInput) {
    return this.prisma.user.create({
      data: {
        id,
        ...input,
      },
    })
  }

  findAll() {
    return this.prisma.user.findMany()
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  update(id: string, input: UpdateUserInput) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...input,
      },
    })
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
