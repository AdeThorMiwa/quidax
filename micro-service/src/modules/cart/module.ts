import { Module } from '@nestjs/common';
import CartController from '@cart/controller';
import CartService from '@cart/service';
import PrismaService from '@services/prisma';
import CartRepository from '@cart/repository';
import UserService from '@user/service';
import UserRepository from '@user/repository';
import { BOOK_SERVICE } from '@constants/services';
import { Services } from '@enum/services';
import { ClientProxyFactory } from '@nestjs/microservices';
import { getServiceFactoryOptions } from '@utils/service';

@Module({
  imports: [],
  controllers: [CartController],
  providers: [
    CartService,
    CartRepository,
    UserRepository,
    UserService,
    PrismaService,
    {
      provide: BOOK_SERVICE,
      useFactory: () =>
        ClientProxyFactory.create(getServiceFactoryOptions(Services.BOOK)),
    },
  ],
})
export default class CartModule {}
