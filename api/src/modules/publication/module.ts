import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import PublicationController from '@publication/controller';
import { getServiceFactoryOptions } from '@utils/service';
import { Services } from '@enum/services';
import PublicationResolver from '@publication/resolver';
import { PUBLICATION_SERVICE } from '@constants/services';

@Module({
  imports: [],
  controllers: [PublicationController],
  providers: [
    {
      provide: PUBLICATION_SERVICE,
      useFactory: () =>
        ClientProxyFactory.create(
          getServiceFactoryOptions(Services.PUBLICATION),
        ),
    },
    PublicationResolver,
  ],
})
export default class PublicationModule {}
