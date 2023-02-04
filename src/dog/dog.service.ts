import { Injectable } from '@nestjs/common';
import { CreateDogInput } from './dto/create-dog.input';
import { UpdateDogInput } from './dto/update-dog.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DogService {
  constructor(private prisma: PrismaService) {}
  create({ name, ownerId }: CreateDogInput) {
    return this.prisma.dog.create({
      data: {
        name,
        ownerId,
      },
    });
  }

  findAll() {
    return this.prisma.dog.findMany();
  }

  findOne(id: number) {
    return this.prisma.dog.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, { name, ownerId }: UpdateDogInput) {
    return this.prisma.dog.update({
      where: {
        id,
      },
      data: {
        name,
        ownerId,
      },
    });
  }

  remove(id: number) {
    return this.prisma.dog.delete({
      where: {
        id,
      },
    });
  }
}
