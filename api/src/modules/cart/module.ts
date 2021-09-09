import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import CartController from '@cart/controller';
import { getServiceFactoryOptions } from '@utils/service';
import { Services } from '@enum/services';
import CartResolver from '@cart/resolver';
import { CART_SERVICE } from '@constants/services';

@Module({
  imports: [],
  controllers: [CartController],
  providers: [
    {
      provide: CART_SERVICE,
      useFactory: () =>
        ClientProxyFactory.create(getServiceFactoryOptions(Services.CART)),
    },
    CartResolver,
  ],
})
export default class CartModule {}
