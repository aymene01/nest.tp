import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/services/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(uuid: string) {
    return this.prisma.user.findUnique({ where: { uuid } });
  }

  findUnique(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({ where });
  }

  update(uuid: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { uuid },
      data: updateUserDto,
    });
  }

  remove(uuid: string) {
    return this.prisma.user.delete({ where: { uuid } });
  }
}
