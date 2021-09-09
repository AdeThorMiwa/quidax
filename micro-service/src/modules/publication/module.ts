import { Module } from '@nestjs/common';
import PublicationController from '@publication/controller';
import PublicationService from '@publication/service';
import PrismaService from '@services/prisma';
import PublicationRepository from '@publication/repository';
import UserService from '@user/service';
import UserRepository from '@modules/user/repository';

@Module({
  imports: [],
  controllers: [PublicationController],
  providers: [
    PublicationService,
    PublicationRepository,
    UserRepository,
    UserService,
    PrismaService,
  ],
})
export default class PublicationModule {}
