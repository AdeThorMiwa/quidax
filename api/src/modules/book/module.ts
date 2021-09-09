import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import BookController from '@book/controller';
import { getServiceFactoryOptions } from '@utils/service';
import { Services } from '@enum/services';
import BookResolver from '@book/resolver';
import { BOOK_SERVICE } from '@constants/services';

@Module({
  imports: [],
  controllers: [BookController],
  providers: [
    {
      provide: BOOK_SERVICE,
      useFactory: () =>
        ClientProxyFactory.create(getServiceFactoryOptions(Services.BOOK)),
    },
    BookResolver,
  ],
})
export default class BookModule {}
