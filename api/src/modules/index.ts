import { Module } from '@nestjs/common';
import AuthModule from '@auth/module';
import UserModule from '@user/module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import PublicationModule from '@publication/module';
import BookModule from '@book/module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PublicationModule,
    BookModule,
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
        sortSchema: true,
        subscriptions: {
          'graphql-ws': true,
          'subscriptions-transport-ws': true,
        },
        path: '/gql',
      }),
    }),
  ],
})
export default class Modules {}
