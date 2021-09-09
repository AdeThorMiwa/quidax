import { Module } from '@nestjs/common';
import BookController from '@book/controller';
import BookService from '@book/service';
import PrismaService from '@services/prisma';
import BookRepository from '@book/repository';
import UserService from '@user/service';
import UserRepository from '@user/repository';
import { PUBLICATION_SERVICE } from '@constants/services';
import { ClientProxyFactory } from '@nestjs/microservices';
import { getServiceFactoryOptions } from '@utils/service';
import { Services } from '@enum/services';

@Module({
  imports: [],
  controllers: [BookController],
  providers: [
    BookService,
    BookRepository,
    UserRepository,
    UserService,
    PrismaService,
    {
      provide: PUBLICATION_SERVICE,
      useFactory: () =>
        ClientProxyFactory.create(
          getServiceFactoryOptions(Services.PUBLICATION),
        ),
    },
  ],
})
export default class BookModule {}
