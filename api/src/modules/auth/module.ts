import { Module } from '@nestjs/common';
import AuthController from '@auth/controller';
import { USER_SERVICE } from '@constants/services';
import { getServiceFactoryOptions } from '@utils/service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { Services } from '@enum/services';
import UserResolver from '@user/resolver';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: USER_SERVICE,
      useFactory: () =>
        ClientProxyFactory.create(getServiceFactoryOptions(Services.USER)),
    },
    UserResolver,
  ],
})
export default class AuthModule {}
