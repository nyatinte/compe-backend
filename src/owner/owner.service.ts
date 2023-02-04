import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OwnerService {
  constructor(private prisma: PrismaService) {}

  create({ name }: CreateOwnerInput) {
    return this.prisma.owner.create({
      data: {
        name,
      },
      include: {
        dogs: true,
      },
    });
  }

  findAll() {
    return this.prisma.owner.findMany({
      include: {
        dogs: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.owner.findUnique({
      where: {
        id,
      },
      include: {
        dogs: true,
      },
    });
  }

  update(id: number, { name, dogIds }: UpdateOwnerInput) {
    return this.prisma.owner.update({
      where: {
        id,
      },
      data: {
        name,
        dogs: {
          connect: dogIds?.map((dogId) => ({ id: dogId })),
        },
      },
      include: {
        dogs: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.owner.delete({
      where: {
        id,
      },
    });
  }
}
