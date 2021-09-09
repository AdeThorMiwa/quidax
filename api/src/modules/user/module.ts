import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import UserController from '@user/controller';
import { getServiceFactoryOptions } from '@utils/service';
import { Services } from '@enum/services';
import UserResolver from '@user/resolver';
import { USER_SERVICE } from '@constants/services';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: USER_SERVICE,
      useFactory: () =>
        ClientProxyFactory.create(getServiceFactoryOptions(Services.USER)),
    },
    UserResolver,
  ],
})
export default class UserModule {}
