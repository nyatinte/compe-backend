import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput, UpdateUserInput } from 'src/types/graphql';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  create({ name, email }: CreateUserInput) {
    return this.prisma.user.create({
      data: {
        name,
        email,
      },
    });
  }

  createById(id: string, { name, email }: CreateUserInput) {
    return this.prisma.user.create({
      data: {
        id,
        name,
        email,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, { email, name }: UpdateUserInput) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        name,
      },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
