import PrismaService from '@services/prisma';
import { Prisma, User } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async getAll(builderResult = {}): Promise<User[]> {
    return this.prisma.user.findMany({ ...builderResult });
  }

  async getById(uid: string): Promise<User> {
    const user = await this.prisma.user.findFirst({ where: { uid } });
    if (!user) throw new NotFoundException('No user found with this ID');
    return user;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) throw new NotFoundException('No user found with this email');
    return user;
  }

  async updateById(uid: string, data: Prisma.UserUpdateInput): Promise<User> {
    await this.getById(uid);
    return this.prisma.user.update({ where: { uid }, data });
  }

  async deleteById(uid: string): Promise<User> {
    await this.getById(uid);
    return this.prisma.user.delete({ where: { uid } });
  }
}

export default UserRepository;
